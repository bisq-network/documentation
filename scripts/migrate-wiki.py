#!/usr/bin/env python3
"""Rebuild the 209 historical source articles with parsed, sanitized local output.
Run with ../migration/venv/bin/python scripts/migrate-wiki.py from site/.
"""

from __future__ import annotations

import copy
import hashlib
import html
import json
import re
import subprocess
import unicodedata
from collections import Counter
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit

import bleach
import mwparserfromhell as mw
from bs4 import BeautifulSoup, NavigableString
from mwparserfromhell import nodes as N

ROOT = Path(__file__).resolve().parents[2]
MIG = ROOT / "migration"
SITE = ROOT / "site"
PANDOC = MIG / "bin/pandoc"
TOKEN = "BISQMIGTOKEN"
RAW = [
    json.loads(x) for x in (ROOT / "recovery/raw-pages.jsonl").read_text(encoding="utf-8").splitlines()
]
META = json.loads((MIG / "articles.json").read_text(encoding="utf-8"))["items"]
BY_TITLE = {x["title"]: x for x in META}
MEDIA = json.loads((ROOT / "image-recovery/recovered-manifest.json").read_text(encoding="utf-8"))[
    "items"
]
MEDIA = {x["canonical_filename"]: x for x in MEDIA}
MAPPING = json.loads((SITE / "public/media/wiki/mapping.json").read_text(encoding="utf-8"))["files"]
ASSETS = {x["sha256"]: x["file"] for x in MAPPING}
LITERAL_TAGS = {"code", "pre", "nowiki", "syntaxhighlight", "source"}
CONTAINER_TAGS = {
    "div",
    "span",
    "br",
    "big",
    "small",
    "b",
    "i",
    "strong",
    "em",
    "ol",
    "ul",
    "li",
    "dl",
    "dt",
    "dd",
    "table",
    "tr",
    "th",
    "td",
    "caption",
    "thead",
    "tbody",
    "tfoot",
    "blockquote",
    "p",
    "a",
    "u",
    "s",
    "sup",
    "sub",
    "hr",
}
ALLOWED = CONTAINER_TAGS | {
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "pre",
    "code",
    "figure",
    "figcaption",
    "img",
    "aside",
    "details",
    "summary",
    "nav",
}
ATTRS = {
    "*": ["id", "class", "title", "role", "lang", "aria-label", "aria-describedby"],
    "a": ["href", "rel"],
    "img": ["src", "alt", "width", "height", "loading", "decoding"],
    "td": ["colspan", "rowspan"],
    "th": ["colspan", "rowspan", "scope"],
    "ol": ["start", "reversed"],
}
CLEANER = bleach.Cleaner(
    tags=ALLOWED,
    attributes=ATTRS,
    protocols={"https", "http", "mailto"},
    strip=False,
    strip_comments=True,
)


def esc(s):
    return html.escape(str(s), quote=True)


def slug(s):
    return (
        re.sub(
            "[^a-z0-9]+",
            "-",
            unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower(),
        ).strip("-")
        or "section"
    )


def canon(s):
    s = unquote(s).replace("_", " ").strip()
    return s[:1].upper() + s[1:]


def filename(s):
    return canon(s).replace(" ", "_")


def plain(code):
    return html.unescape(
        mw.parse(str(code)).strip_code(normalize=True, collapse=True)
    ).strip()


def child_offset(raw, value, base, start=0):
    found = raw.find(str(value), start)
    return base + (found if found >= 0 else 0)


def children(node, base):
    raw = str(node)
    if isinstance(node, N.Tag):
        tag = str(node.tag).lower()
        if tag not in LITERAL_TAGS and tag != "gallery" and node.contents is not None:
            yield node.contents, child_offset(raw, node.contents, base)
    elif isinstance(node, N.Template):
        start = len(str(node.name)) + 2
        for param in node.params:
            pos = raw.find(str(param), start)
            pos = start if pos < 0 else pos
            valuepos = str(param).find(str(param.value))
            yield param.value, base + pos + max(valuepos, 0)
            start = pos + len(str(param))
    elif isinstance(node, N.Wikilink) and node.text is not None:
        yield node.text, child_offset(raw, node.text, base, len(str(node.title)) + 2)
    elif isinstance(node, N.ExternalLink) and node.title is not None:
        yield node.title, child_offset(raw, node.title, base, len(str(node.url)))


def walk(code, base=0):
    cursor = 0
    for node in code.nodes:
        yield node, base + cursor
        for child, offset in children(node, base + cursor):
            yield from walk(child, offset)
        cursor += len(str(node))


def build_headings(row, meta):
    code = mw.parse(row["wikitext"])
    id_counts = Counter()
    explicit = []
    id_by_offset = {}
    for node, off in walk(code):
        if isinstance(node, N.Tag) and node.has("id"):
            original = str(node.get("id").value)
            id_counts[original] += 1
            value = (
                original
                if id_counts[original] == 1
                else original + "-source-" + str(id_counts[original])
            )
            explicit.append(value)
            id_by_offset[str(off)] = value
    used = set(explicit)
    headers = []
    for node, off in walk(code):
        if isinstance(node, N.Heading):
            headers.append((node.title, node.level, off, None))
        elif isinstance(node, N.Tag) and re.fullmatch("h[1-6]", str(node.tag).lower()):
            headers.append(
                (
                    node.contents or mw.parse(""),
                    int(str(node.tag)[1]),
                    off,
                    id_by_offset.get(str(off)),
                )
            )
    minimum = min((level for _, level, _, _ in headers), default=1)
    oldcounts = Counter()
    out = []
    for title, level, off, explicit_id in headers:
        text = plain(title)
        old = text.replace(" ", "_")
        oldcounts[old] += 1
        legacy = old + ("_" + str(oldcounts[old]) if oldcounts[old] > 1 else "")
        ident = slug(text)
        count = 1
        candidate = ident
        while candidate in used:
            count += 1
            candidate = ident + "-" + str(count)
        used.add(candidate)
        out.append(
            {
                "text": text,
                "anchor": candidate,
                "legacy_id": legacy,
                "level": level,
                "html_level": min(6, level - minimum + 2),
                "source_offset": off,
                "explicit_source_id": explicit_id,
            }
        )
    meta["headings"] = out
    meta["explicit_anchors"] = explicit
    meta["source_id_by_offset"] = id_by_offset
    meta["source_language"] = "es" if row["title"] == "Payment methods/es" else "en"
    meta["source_language_provenance"] = (
        "Existing source language edition; no translation generated"
    )
    return code


CODES = {}
for row, meta in zip(RAW, META):
    assert row["title"] == meta["title"]
    CODES[row["title"]] = build_headings(row, meta)


class Article:
    def __init__(self, row, meta):
        self.row, self.meta = row, meta
        self.tokens = {}
        self.gaps = []
        self.images = []
        self.codes = []
        self.templates = []
        self.ids = set(meta["explicit_anchors"]) | {
            h["anchor"] for h in meta["headings"]
        }
        self.header_by_offset = {h["source_offset"]: h for h in meta["headings"]}
        self.fragments = []

    def gap(self, kind, offset, source, **details):
        self.gaps.append(
            {"kind": kind, "source_offset": offset, "source": str(source), **details}
        )

    def ident(self, prefix):
        n = 1
        while f"{prefix}-{n}" in self.ids:
            n += 1
        value = f"{prefix}-{n}"
        self.ids.add(value)
        return value

    def token(self, markup, block=False):
        key = TOKEN + str(len(self.tokens)) + "END"
        self.tokens[key] = markup
        return "\n\n" + key + "\n\n" if block else key

    def render(self, prepared, inline=False, allow_failure=False):
        result = subprocess.run(
            [str(PANDOC), "--from=mediawiki", "--to=html5", "--wrap=none"],
            input=prepared,
            text=True,
            encoding="utf-8",
            capture_output=True,
        )
        if result.returncode:
            (MIG / "pandoc-failure.mediawiki").write_text(prepared, encoding="utf-8")
            (MIG / "pandoc-failure.json").write_text(
                json.dumps(
                    {
                        "title": self.row["title"],
                        "stderr": result.stderr,
                        "code": result.returncode,
                    },
                    indent=2,
                ),
                encoding="utf-8",
            )
            if allow_failure:
                self.gap(
                    "malformed_table_layout_rendered_as_contents",
                    0,
                    prepared,
                    diagnostic=result.stderr,
                )
                return None
            raise RuntimeError(result.stderr)
        if result.stderr:
            self.gap("pandoc_diagnostic", 0, result.stderr)
        soup = BeautifulSoup(result.stdout, "html.parser")
        pattern = re.compile(TOKEN + r"\d+END")
        for _ in range(12):
            found = list(soup.find_all(string=pattern))
            if not found:
                break
            for text in found:
                value = str(text)
                parent = text.parent
                if (
                    parent.name == "p"
                    and value.strip() in self.tokens
                    and parent.get_text().strip() == value.strip()
                ):
                    fragment = BeautifulSoup(self.tokens[value.strip()], "html.parser")
                    parent.replace_with(*list(fragment.contents))
                else:
                    pieces = []
                    cursor = 0
                    for match in pattern.finditer(value):
                        if match.start() > cursor:
                            pieces.append(
                                NavigableString(value[cursor : match.start()])
                            )
                        pieces.extend(
                            list(
                                BeautifulSoup(
                                    self.tokens[match.group()], "html.parser"
                                ).contents
                            )
                        )
                        cursor = match.end()
                    if cursor < len(value):
                        pieces.append(NavigableString(value[cursor:]))
                    text.replace_with(*pieces)
        if TOKEN in str(soup):
            raise ValueError("Unexpanded migration token")
        if (
            inline
            and len(soup.contents) == 1
            and getattr(soup.contents[0], "name", None) == "p"
        ):
            soup.contents[0].unwrap()
        return str(soup)

    def inline(self, code, base=0):
        if not str(code):
            return ""
        if all(isinstance(n, (N.Text, N.HTMLEntity)) for n in code.nodes):
            return esc(
                "".join(
                    n.normalize() if isinstance(n, N.HTMLEntity) else str(n)
                    for n in code.nodes
                )
            )
        return self.render(self.prepare(code, base), inline=True)

    def literal(self, code):
        result = []
        for n in code.nodes:
            if isinstance(n, N.Tag) and str(n.tag).lower() == "nowiki":
                result.append(str(n.contents or ""))
            elif isinstance(n, N.Tag) and str(n.tag).lower() == "br":
                result.append("\n")
            elif isinstance(n, N.HTMLEntity):
                result.append(n.normalize())
            else:
                result.append(str(n))
        return html.unescape("".join(result))

    def link(self, target, label, offset):
        target = unquote(target).replace("_", " ").strip()
        title, sep, fragment = target.partition("#")
        dest = self.meta if not title else BY_TITLE.get(canon(title))
        if not dest and title:
            alternatives = [
                m
                for t, m in BY_TITLE.items()
                if t.casefold() == canon(title).casefold()
            ]
            if len(alternatives) == 1:
                dest = alternatives[0]
                self.gap(
                    "unique_casefold_link_resolution",
                    offset,
                    target,
                    target_route=dest["route"],
                )
            elif len(alternatives) > 1:
                self.gap("ambiguous_casefold_link_target", offset, target)
        if not dest:
            self.gap("unrecovered_internal_target", offset, target)
            return f'<span class="wiki-link-gap">{label} <small>[unrecovered article: {esc(title)}]</small></span>'
        href = "../" + dest["slug"] + "/"
        if sep:

            def normalize_fragment(value):
                value = unquote(value)
                value = re.sub(
                    r"(?:\.[0-9A-Fa-f]{2})+",
                    lambda match: bytes(
                        int(part, 16) for part in match.group()[1:].split(".")
                    ).decode("utf-8", errors="replace"),
                    value,
                )
                return value.replace(" ", "_")

            candidate = normalize_fragment(fragment)
            anchors = {normalize_fragment(a): a for a in dest["explicit_anchors"]}
            for h in dest["headings"]:
                for key in [h["anchor"], h["legacy_id"], h["text"].replace(" ", "_")]:
                    anchors.setdefault(normalize_fragment(key), h["anchor"])
            anchor = anchors.get(candidate)
            repair = candidate != unquote(fragment).replace(" ", "_")
            if not anchor:
                unique = {
                    value
                    for key, value in anchors.items()
                    if key.casefold() == candidate.casefold()
                }
                if len(unique) == 1:
                    anchor = next(iter(unique))
                    repair = True
            if not anchor and "#" in candidate:
                prefix, _, tail = candidate.partition("#")
                if canon(prefix) == dest["title"]:
                    unique = {
                        value
                        for key, value in anchors.items()
                        if key.casefold() == tail.casefold()
                    }
                    if len(unique) == 1:
                        anchor = next(iter(unique))
                        repair = True
            if anchor and repair:
                self.gap(
                    "legacy_fragment_normalization_repair",
                    offset,
                    target,
                    target_route=dest["route"],
                    target_anchor=anchor,
                )
            if not anchor:
                self.gap(
                    "unresolved_fragment", offset, target, target_route=dest["route"]
                )
                return f'<a href="{esc(href)}">{label}</a> <small class="wiki-link-gap">[section not recovered: {esc(fragment)}]</small>'
            href += "#" + quote(anchor, safe="-._~")
            self.fragments.append(
                {
                    "target_route": dest["route"],
                    "target_anchor": anchor,
                    "source_offset": offset,
                }
            )
        return f'<a href="{esc(href)}">{label}</a>'

    def external(self, url, label, offset):
        url = html.unescape(str(url)).strip()
        if "|" in url:
            original_url = url
            url, labelpart = url.split("|", 1)
            self.gap("malformed_external_link_normalized", offset, original_url)
            if label == esc(original_url):
                label = esc(labelpart)
            else:
                label = esc(labelpart) + (" " + label if label else "")
        parsed = urlsplit(url)
        if parsed.hostname in {
            "bisq.wiki",
            "www.bisq.wiki",
        } and not parsed.path.startswith("/index.php"):
            target = unquote(parsed.path.lstrip("/")) + (
                "#" + parsed.fragment if parsed.fragment else ""
            )
            if canon(target.split("#", 1)[0]) in BY_TITLE:
                return self.link(target, label, offset)
        if parsed.scheme.lower() not in {"http", "https", "mailto"}:
            self.gap("unsupported_link_scheme", offset, url)
            return f'<span class="wiki-link-gap">{label} <code>{esc(url)}</code></span>'
        return f'<a href="{esc(url)}" rel="noopener noreferrer">{label}</a>'

    def image(self, name, caption, offset, raw, gallery=False, options=None):
        can = filename(name)
        item = MEDIA.get(can)
        ident = self.ident("source-image")
        context = self.row["wikitext"][max(0, offset - 70) : offset + len(raw) + 70]
        record = {
            "wiki_filename": name,
            "canonical_filename": can,
            "source_offset": offset,
            "source_line": self.row["wikitext"].count("\n", 0, offset) + 1,
            "source_context": context,
            "raw_reference": raw,
            "gallery": gallery,
            "element_id": ident,
        }
        label = plain(caption) or name
        if not item or not item.get("local_path"):
            self.gap("unrecovered_image", offset, raw, canonical_filename=can)
            record["disposition"] = "explicit_missing_image_placeholder"
            self.images.append(record)
            return f'<figure class="wiki-image-gap" id="{ident}"><p><strong>Image not recovered: {esc(name)}</strong></p>{("<figcaption>"+self.inline(caption,offset)+"</figcaption>") if str(caption) else ""}<p>The original file is unavailable in this local recovery.</p></figure>'
        asset = ASSETS[item["sha256"]]
        path = SITE / "public" / asset
        assert (
            path.exists()
            and hashlib.sha256(path.read_bytes()).hexdigest() == item["sha256"]
        )
        href = "../../" + asset
        kind = (
            "Historical thumbnail; original resolution not recovered"
            if item["status"] == "partial"
            else "Historical full-size recovered source"
        )
        if item.get("source_kind") == "original_source_attachment":
            kind = "Historical source attachment; wiki filename mapping inferred"
        record.update(
            {
                "disposition": "inline_recovered_image",
                "status": item["status"],
                "asset_path": asset,
                "sha256": item["sha256"],
                "source_kind": item.get("source_kind"),
                "width": item["width"],
                "height": item["height"],
            }
        )
        self.images.append(record)
        cap = self.inline(caption, offset) if str(caption) else esc(name)
        return f'<figure class="wiki-source-image" id="{ident}"><a href="{esc(href)}"><img src="{esc(href)}" alt="{esc(label)}" width="{item["width"]}" height="{item["height"]}" loading="lazy" decoding="async"></a><figcaption>{cap}<br><small>{esc(kind)}. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>'

    def image_options(self, text):
        parts = [""]
        for n in text.nodes:
            if isinstance(n, N.Text):
                chunks = str(n).split("|")
                parts[-1] += chunks[0]
                for s in chunks[1:]:
                    parts.append(s)
            else:
                parts[-1] += str(n)
        options = []
        captions = []
        for p in parts:
            if (
                p.strip().lower()
                in {
                    "thumb",
                    "thumbnail",
                    "frame",
                    "framed",
                    "frameless",
                    "border",
                    "left",
                    "right",
                    "center",
                    "none",
                    "baseline",
                    "sub",
                    "super",
                    "top",
                    "text-top",
                    "middle",
                    "bottom",
                    "text-bottom",
                }
                or re.fullmatch(r"\d+(?:x\d+)?px", p.strip())
                or p.strip().startswith(("alt=", "link=", "class=", "upright"))
            ):
                options.append(p)
            else:
                captions.append(p)
        return mw.parse("|".join(captions)), options

    def prepare(self, code, base=0):
        out = []
        cursor = 0
        for n in code.nodes:
            off = base + cursor
            raw = str(n)
            cursor += len(raw)
            if isinstance(n, N.Text):
                text = raw
                for magic in ["__TOC__", "__NOTOC__", "__FORCETOC__"]:
                    text = text.replace(magic, "")
                if "{{" in text or "}}" in text:
                    self.gap("malformed_template_markup", off, text)
                out.append(
                    text.replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("{", "&#123;")
                    .replace("}", "&#125;")
                )
            elif isinstance(n, N.Comment):
                pass  # Exact comments remain in source download.
            elif isinstance(n, N.HTMLEntity):
                out.append(esc(n.normalize()))
            elif isinstance(n, N.Heading):
                h = self.header_by_offset.get(off)
                if not h:
                    h = {"anchor": self.ident("section"), "html_level": 2}
                    self.gap("heading_offset_fallback", off, raw)
                out.append(
                    self.token(
                        f'<h{h["html_level"]} id="{esc(h["anchor"])}">{self.inline(n.title,child_offset(raw,n.title,off))}</h{h["html_level"]}>',
                        True,
                    )
                )
            elif isinstance(n, N.Wikilink):
                title = str(n.title).strip()
                label = (
                    n.text
                    if n.text is not None
                    else mw.parse(str(n.title).replace("_", " "))
                )
                if title.lower().startswith(("file:", "image:")):
                    caption, options = self.image_options(n.text or mw.parse(""))
                    name = title.split(":", 1)[1]
                    out.append(
                        self.token(
                            self.image(name, caption, off, raw, options=options), True
                        )
                    )
                elif title.startswith("Category:"):
                    pass  # Categories are retained in metadata/footer.
                elif (
                    title.lstrip(":").lower().startswith(("file:", "image:", "media:"))
                ):
                    name = title.lstrip(":").split(":", 1)[1]
                    item = MEDIA.get(filename(name))
                    label_html = self.inline(label, off)
                    out.append(
                        self.token(
                            f'<a href="../../{esc(ASSETS[item["sha256"]])}">{label_html}</a>'
                            if item and item.get("local_path")
                            else f'<span class="wiki-image-gap">{label_html} [file not recovered]</span>'
                        )
                    )
                else:
                    out.append(
                        self.token(self.link(title, self.inline(label, off), off))
                    )
            elif isinstance(n, N.ExternalLink):
                out.append(
                    self.token(
                        self.external(
                            n.url,
                            self.inline(n.title, off) if n.title else esc(n.url),
                            off,
                        )
                    )
                )
            elif isinstance(n, N.Template):
                name = str(n.name).strip()
                norm = name.replace("_", " ").lower()
                values = []
                for value, vbase in children(n, off):
                    values.append(self.render(self.prepare(value, vbase)))
                self.templates.append(
                    {
                        "name": name,
                        "source_offset": off,
                        "raw": raw,
                        "inline_arguments_preserved": bool(n.params),
                    }
                )
                if norm in {"admonition warn", "admonition note"}:
                    label = "Warning" if norm.endswith("warn") else "Note"
                    out.append(
                        self.token(
                            f'<aside class="wiki-admonition" role="note"><p><strong>{label}</strong></p>{"".join(values)}</aside>',
                            True,
                        )
                    )
                else:
                    self.gap("unresolved_template", off, raw, name=name)
                    out.append(
                        self.token(
                            f'<span class="wiki-template-gap" role="note"><strong>[Unresolved template: {esc(name)}]</strong> <code>{esc(raw)}</code></span>'
                        )
                    )
            elif isinstance(n, N.Tag):
                tag = str(n.tag).lower()
                if tag in LITERAL_TAGS:
                    text = self.literal(n.contents or mw.parse(""))
                    ident = self.ident("source-code")
                    self.codes.append(
                        {
                            "element_id": ident,
                            "tag": tag,
                            "source_offset": off,
                            "raw": raw,
                            "rendered_literal": text,
                        }
                    )
                    markup = f'<code id="{ident}" class="wiki-source-code">{esc(text)}</code>'
                    block = tag in {"pre", "syntaxhighlight", "source"} or "\n" in text
                    out.append(
                        self.token(
                            "<pre>" + markup + "</pre>" if block else markup, block
                        )
                    )
                elif tag == "gallery":
                    pictures = []
                    start = child_offset(raw, n.contents, off)
                    advance = 0
                    for line in str(n.contents or "").splitlines(keepends=True):
                        stripped = line.strip()
                        lineoff = start + advance + len(line) - len(line.lstrip())
                        advance += len(line)
                        if not stripped:
                            continue
                        name, sep, caption = stripped.partition("|")
                        name = re.sub(r"^(?:File|Image):", "", name, flags=re.I)
                        pictures.append(
                            self.image(name, mw.parse(caption), lineoff, stripped, True)
                        )
                    out.append(
                        self.token(
                            '<div class="wiki-gallery">' + "".join(pictures) + "</div>",
                            True,
                        )
                    )
                elif re.fullmatch("h[1-6]", tag):
                    h = self.header_by_offset[off]
                    alias = (
                        ('<span id="' + esc(h["explicit_source_id"]) + '"></span>')
                        if h.get("explicit_source_id")
                        else ""
                    )
                    out.append(
                        self.token(
                            alias
                            + f'<h{h["html_level"]} id="{esc(h["anchor"])}">{self.inline(n.contents or mw.parse(""),child_offset(raw,n.contents or "",off))}</h{h["html_level"]}>',
                            True,
                        )
                    )
                elif tag == "br":
                    out.append("<br /> ")
                elif tag in {"translate", "noinclude"}:
                    self.gap("source_wrapper_preserved_as_content", off, raw, tag=tag)
                    out.append(
                        self.prepare(
                            n.contents or mw.parse(""),
                            child_offset(raw, n.contents or "", off),
                        )
                    )
                elif tag in CONTAINER_TAGS:
                    new = copy.deepcopy(n)
                    if n.has("id") and str(off) in self.meta["source_id_by_offset"]:
                        new.get("id").value = self.meta["source_id_by_offset"][str(off)]
                    if n.contents is not None:
                        new.contents = self.prepare(
                            n.contents, child_offset(raw, n.contents, off)
                        )
                    if tag == "table":
                        table_html = self.render(str(new), allow_failure=True)
                        if table_html is None:

                            def flatten_table(c):
                                out = []
                                for part in c.nodes:
                                    if isinstance(part, N.Tag) and str(
                                        part.tag
                                    ).lower() in {
                                        "table",
                                        "tr",
                                        "th",
                                        "td",
                                        "caption",
                                        "thead",
                                        "tbody",
                                        "tfoot",
                                    }:
                                        out.append(
                                            "\n"
                                            + flatten_table(
                                                part.contents or mw.parse("")
                                            )
                                            + "\n"
                                        )
                                    else:
                                        out.append(str(part))
                                return "".join(out)

                            table_html = (
                                "<p><strong>Source table layout is malformed; its contents are preserved below.</strong></p>"
                                + self.render(
                                    flatten_table(new.contents or mw.parse(""))
                                )
                            )
                        self.gap("table_source_fallback_available", off, raw)
                        fallback = f'<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{esc(raw)}</code></pre></details>'
                        out.append(self.token(table_html + fallback, True))
                    else:
                        out.append(str(new))
                else:
                    self.gap("unsupported_tag_preserved", off, raw, tag=tag)
                    out.append(
                        self.token(
                            f'<span class="wiki-markup-gap" role="note"><strong>[Unsupported MediaWiki markup: {esc(tag)}]</strong> <code class="wiki-source-markup">{esc(raw)}</code></span>'
                        )
                    )
            else:
                self.gap(
                    "unsupported_node_preserved", off, raw, node_type=type(n).__name__
                )
                out.append(
                    self.token(
                        f'<span class="wiki-markup-gap" role="note"><strong>[Unsupported MediaWiki markup: {esc(tag)}]</strong> <code class="wiki-source-markup">{esc(raw)}</code></span>'
                    )
                )
        return "".join(out)

    def adapt_legacy_portal(self, body):
        if self.row["title"] != "Bisq 1":
            return body
        soup = BeautifulSoup(body, "html.parser")
        for detail in soup.select("details.wiki-table-source"):
            detail.decompose()
        removed = []
        attr = r"(?:id|style|class|cellpadding|cellspacing|width|height|align|valign|border)"
        value = r'(?:"[^"]*"|\'[^\']*\'|[^|\s]+)'
        layout = re.compile(
            r"^(?:\{\||\|)\s*(?:(?:\|\s*)?" + attr + r"\s*=\s*" + value + r"\s*)*\|?$"
        )
        wrappers = re.compile(r'^</?(?:div|noinclude)(?:\s+id="[^"]*")?\s*>$')
        for text in list(soup.find_all(string=True)):
            if text.find_parent(["code", "pre"]):
                continue
            lines = str(text).splitlines(keepends=True)
            kept = []
            for line in lines:
                stripped = line.strip()
                if stripped and (
                    layout.fullmatch(stripped)
                    or wrappers.fullmatch(stripped)
                    or stripped in {"|-", "|}", "__NOEDITSECTION__"}
                ):
                    removed.append(stripped)
                else:
                    kept.append(line)
            if "".join(kept) != str(text):
                text.replace_with(NavigableString("".join(kept)))
        for p in list(soup.select("p")):
            if (
                p.get_text(strip=True)
                == "Source table layout is malformed; its contents are preserved below."
            ):
                p.decompose()
            elif not p.get_text(strip=True) and not p.find(["img", "a"]):
                p.decompose()
        for tag in list(soup.select("table,thead,tbody,tfoot,tr,th,td")):
            tag.unwrap()
        note = '<aside role="note"><p>Legacy portal layout adapted into sequential sections and lists. Missing introduction and reasons templates remain explicitly unresolved; no replacement prose has been invented.</p></aside>'
        raw = (
            '<details class="wiki-layout-source"><summary>Original legacy portal layout source</summary><pre><code>'
            + esc(self.row["wikitext"])
            + "</code></pre></details>"
        )
        self.gap(
            "legacy_portal_layout_adapted",
            0,
            "Bisq 1 layout-only tables",
            removed_layout_lines=removed,
            original_source_preserved=True,
        )
        return note + str(soup) + raw

    def convert(self):
        body = self.render(self.prepare(CODES[self.row["title"]]))
        body = CLEANER.clean(body)
        body = self.adapt_legacy_portal(body)
        soup = BeautifulSoup(body, "html.parser")
        ids = [x["id"] for x in soup.select("[id]")]
        if len(ids) != len(set(ids)):
            raise ValueError("Duplicate HTML IDs: " + self.row["title"])
        for im in soup.select("img[src]"):
            assert im["src"].startswith("../../media/wiki/"), im["src"]
        toc = ""
        if self.meta["headings"]:
            entries = "".join(
                f'<li><a href="#{esc(h["anchor"])}">{esc(h["text"])}</a></li>'
                for h in self.meta["headings"]
            )
            toc = (
                '<nav class="wiki-source-toc" aria-label="Article sections"><details'
                + (" open" if len(self.meta["headings"]) <= 10 else "")
                + "><summary>On this page</summary><ul>"
                + entries
                + "</ul></details></nav>"
            )
        banner = '<aside class="wiki-recovery-status" role="note"><p><strong>Recovered historical wiki article.</strong> This source text has not been verified as current product guidance. Missing templates and images are marked in place. <a href="../../">Reviewed guides</a> are available separately.</p></aside>'
        # Keep raw HTML in one physical Markdown line. Numeric LF entities retain
        # exact pre/code newlines in the DOM without re-entering Markdown parsing.
        body = body.replace("\n", "&#10;")
        r = self.row
        m = self.meta
        contributor = r["available_attribution"].get(
            "username", r["available_attribution"].get("ip", "Not supplied")
        )
        provenance = f'<details class="wiki-source-provenance"><summary>Source, revision and attribution</summary><p>Source revision <a href="{esc(r["original_revision_url"])}">{esc(r["revision_id"])}</a>, dated {esc(r["revision_timestamp"])}. Snapshot last successful ingest: 2026-10-18. Exported revision contributor: {esc(contributor)}; full author history and licensing remain unresolved.</p><p><a href="../../wiki-source/{m["slug"]}.wiki.txt" download>Download exact snapshot wikitext</a> · <a href="../../wiki-source/{m["slug"]}.json">Source metadata</a></p><p>SHA-256: <code>{r["wikitext_sha256"]}</code>. Ingest-added product classification comments are not original author metadata.</p></details>'
        categories = (
            '<p class="wiki-source-categories"><strong>Source categories:</strong> '
            + esc(", ".join(m["categories"]))
            + "</p>"
            if m["categories"]
            else ""
        )
        front = (
            "---\n"
            + "title: "
            + json.dumps(r["title"], ensure_ascii=False)
            + "\nslug: "
            + json.dumps("wiki/" + m["slug"])
            + "\ndescription: "
            + json.dumps(
                "Historical recovered Bisq Wiki article; source revision "
                + r["revision_id"]
            )
            + "\ntableOfContents: false\n---\n\n"
        )
        content = (
            front
            + banner
            + "\n\n"
            + provenance
            + "\n\n"
            + toc
            + "\n\n"
            + f'<div class="wiki-recovered-article" lang="{m["source_language"]}">'
            + body
            + "</div>\n\n"
            + categories
            + "\n"
        )
        output = SITE / "src/content/docs/wiki" / (m["slug"] + ".md")
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(content, encoding="utf-8")
        source = SITE / "public/wiki-source"
        source.mkdir(parents=True, exist_ok=True)
        data = r["wikitext"].encode()
        assert hashlib.sha256(data).hexdigest() == r["wikitext_sha256"]
        (source / (m["slug"] + ".wiki.txt")).write_bytes(data)
        meta = {
            k: r[k]
            for k in [
                "title",
                "page_id",
                "revision_id",
                "revision_timestamp",
                "available_attribution",
                "original_url",
                "original_revision_url",
                "wikitext_sha256",
            ]
        }
        meta.update(
            {
                "snapshot_last_successful_ingest_utc": "2026-10-18T01:01:19.853537Z",
                "source_route": m["route"],
                "source_language": m["source_language"],
                "license_status": "Unresolved; no republication approval",
                "attribution_limit": "Only exported latest revision contributor, not full history",
                "classification_comment_provenance": m["product_hint_provenance"],
            }
        )
        (source / (m["slug"] + ".json")).write_text(
            json.dumps(meta, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )
        m.update(
            {
                "status": "converted_historical_source_with_explicit_gaps",
                "image_occurrences": self.images,
                "code_occurrences": self.codes,
                "template_gap_count": sum(
                    g["kind"] == "unresolved_template" for g in self.gaps
                ),
                "link_gap_count": sum(
                    g["kind"] in ["unresolved_fragment", "unrecovered_internal_target"]
                    for g in self.gaps
                ),
                "output_sha256": hashlib.sha256(content.encode()).hexdigest(),
            }
        )
        return {
            "title": r["title"],
            "page_id": r["page_id"],
            "route": m["route"],
            "source_sha256": r["wikitext_sha256"],
            "output_sha256": m["output_sha256"],
            "headings": m["headings"],
            "explicit_anchors": m["explicit_anchors"],
            "images": self.images,
            "codes": self.codes,
            "templates": self.templates,
            "gaps": self.gaps,
            "resolved_fragment_links": self.fragments,
            "rendered_html": body,
        }


def main():
    assert len(RAW) == len(META) == 209 and all(TOKEN not in r["wikitext"] for r in RAW)
    results = []
    for i, (row, meta) in enumerate(zip(RAW, META), 1):
        result = Article(row, meta).convert()
        results.append(result)
        evidence = MIG / "pages"
        evidence.mkdir(exist_ok=True)
        (evidence / (meta["slug"] + ".json")).write_text(
            json.dumps(
                {k: v for k, v in result.items() if k != "rendered_html"},
                indent=2,
                ensure_ascii=False,
            )
            + "\n",
            encoding="utf-8",
        )
        html_dir = MIG / "rendered-html"
        html_dir.mkdir(exist_ok=True)
        (html_dir / (meta["slug"] + ".html")).write_text(result["rendered_html"], encoding="utf-8")
        if i % 25 == 0:
            print(f"Converted {i}/209 articles", flush=True)
    for name in ["articles.json", "title-route-map.json"]:
        (MIG / name).write_text(
            json.dumps(
                {"schema_version": 1, "count": len(META), "items": META},
                indent=2,
                ensure_ascii=False,
            )
            + "\n",
            encoding="utf-8",
        )
    occurrences = [
        dict(page_id=r["page_id"], title=r["title"], route=r["route"], **image)
        for r in results
        for image in r["images"]
    ]
    (MIG / "image-occurrences.json").write_text(
        json.dumps(
            {"schema_version": 1, "count": len(occurrences), "items": occurrences},
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )
    report = {
        "article_count": len(results),
        "image_occurrences": len(occurrences),
        "unique_image_filenames": len({i["canonical_filename"] for i in occurrences}),
        "inline_recovered_image_occurrences": sum(
            i["disposition"] == "inline_recovered_image" for i in occurrences
        ),
        "missing_image_placeholders": sum(
            i["disposition"] == "explicit_missing_image_placeholder"
            for i in occurrences
        ),
        "headings": sum(len(r["headings"]) for r in results),
        "code_or_literal_occurrences": sum(len(r["codes"]) for r in results),
        "gap_counts": dict(Counter(g["kind"] for r in results for g in r["gaps"])),
        "all_source_hashes_verified": True,
        "all_local_images_hash_verified": True,
        "pandoc_version": subprocess.check_output(
            [str(PANDOC), "--version"], text=True, encoding="utf-8"
        ).splitlines()[0],
        "parser_version": mw.__version__,
        "scope": "Historical source conversion; reviewed guides unchanged; no publication or current-product validation",
    }
    (MIG / "conversion-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()

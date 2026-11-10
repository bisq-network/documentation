#!/usr/bin/env python3
"""Regenerate derived template HTML from archived wikitext using the existing converter.

Run from the repository root with the converter environment described in
INTAKE.md (PANDOC selects the binary). Normal npm builds consume and verify the
derived JSON; they do not need Python or Pandoc.
"""
import copy
import hashlib
import html
import json
import os
import re
import sys
from pathlib import Path

import mwparserfromhell as mw
from bs4 import BeautifulSoup

if sys.argv[1:]:
    sys.exit('derive-template-renderings.py takes no arguments: it reads its inputs from the repository '
             '(the earlier --recovery-root is no longer needed). Run it from the repository root; PANDOC selects pandoc.')
site = Path.cwd().resolve()
converter = (site / 'scripts/migrate-wiki.py').read_text(encoding='utf-8')
ns = {'__name__': 'template_converter', '__file__': str(site / 'scripts/migrate-wiki.py')}
exec(compile(converter, 'scripts/migrate-wiki.py', 'exec'), ns)
ns['check_pandoc'](os.environ.get('PANDOC', 'pandoc'))
ns['load']()  # the snapshot inputs, read from the repository
# Resolve recorded fragment-free redirect chains against the current snapshot.
redirects = json.loads((site / 'migration/archive-redirects-20261014.json').read_text(encoding='utf-8'))['items']
for _ in range(len(redirects)):
    changed = False
    for record in redirects:
        if record['is_pure_redirect'] and not record['target_fragment'] and record['target_title'] in ns['BY_TITLE'] and record['source_title'] not in ns['BY_TITLE']:
            ns['BY_TITLE'][record['source_title']] = ns['BY_TITLE'][record['target_title']]
            changed = True
    if not changed:
        break
for asset in json.loads((site / 'recovery-evidence/template-media.json').read_text(encoding='utf-8'))['items']:
    ns['MEDIA'][asset['canonical_filename']] = dict(asset, local_path=True, status='original')
    ns['ASSETS'][asset['sha256']] = asset['asset_path'].lstrip('/')

def digest(s):
    """Return the SHA-256 of a UTF-8 source or rendering."""
    return hashlib.sha256(s.encode()).hexdigest()
def norm(s):
    """Normalize template spelling for matching recovered definitions."""
    return s.replace('_', ' ').strip().lower()
metadata = json.loads((site / 'migration/archive-templates-20261014.json').read_text(encoding='utf-8'))
lookup = {norm(item['template_normalized_name']): item for item in metadata['items']}
pattern = re.compile(r'<span class="wiki-template-gap" role="note"><strong>\[Unresolved template: ([^<]+)\]</strong> <code>(.*?)</code></span>', re.S)
invocations = {}
for file in sorted((site / 'src/content/docs/wiki').glob('*.md')):
    for match in pattern.finditer(file.read_text(encoding='utf-8')):
        name, invocation = html.unescape(match.group(1)), html.unescape(match.group(2))
        invocations.setdefault(invocation, {'name': name, 'articles': []})['articles'].append(file.stem)
assert sum(len(v['articles']) for v in invocations.values()) == 71
out=[]
for invocation, data in invocations.items():
    item=lookup[norm(data['name'])]
    raw=(site / ('public' + item['source_download'])).read_text(encoding='utf-8')
    assert digest(raw) == item['wikitext_sha256']
    call=mw.parse(invocation).filter_templates(recursive=False)
    assert len(call)==1
    params={str(p.name).strip():str(p.value) for p in call[0].params}
    expanded=raw
    for key in sorted(params): expanded=expanded.replace('{{{' + key + '}}}', params[key])
    if re.search(r'\{\{\{\d+', expanded): raise ValueError(f'unbound parameter: {invocation}')
    parsed=mw.parse(expanded)
    for tag in list(parsed.filter_tags(recursive=True)):
        if str(tag.tag).lower()=='noinclude': parsed.remove(tag, recursive=True)
    expanded=str(parsed)
    scalar=norm(data['name']) in {'maxbisqeasytrade','maxtradesizealtcoin','maxtradesizebisq1','maxtradesizeunsigned','mintradesizetobesigned'}
    if scalar:
        assert not mw.parse(expanded).filter(recursive=True, forcetype=mw.nodes.Template)
        rendered=html.escape(expanded.strip())
    else:
        row={'title':'Historical template: '+data['name'], 'wikitext':expanded}
        meta={'explicit_anchors':[], 'headings':[], 'source_id_by_offset':{}}
        article=ns['Article'](row,meta)
        offset=0;number=0
        for node in mw.parse(expanded).nodes:
            if isinstance(node,mw.nodes.Heading):
                number+=1; article.header_by_offset[offset]={'anchor':f'tpl-{item["page_id"]}-{number}', 'html_level':min(6,node.level)}
            offset+=len(str(node))
        rendered=article.render(article.prepare(mw.parse(expanded)))
        # IDs generated for code/images are metadata, so namespace them to avoid
        # colliding with IDs in the receiving article.
        rendered=re.sub(r'\bid="(source-(?:code|image)-\d+)"',lambda m:f'id="tpl-{item["page_id"]}-{m.group(1)}"',rendered)
        rendered=rendered.replace('class="wiki-source-image"','class="template-historical-image"')
        # Pandoc emits non-breaking spaces for indented MediaWiki code. They
        # break copied shell commands; the source contains ordinary spaces.
        assert '\u00a0' not in expanded
        rendered=rendered.replace('\u00a0', ' ')
        soup=BeautifulSoup(rendered, 'html.parser')
        for nested in list(soup.select('code code')):
            nested.unwrap()
        for tag in soup.select('[style]'):
            del tag['style']
        if norm(data['name']) == 'arbitrationcompensationtable':
            warning=next(x for x in json.loads((site / 'recovery-evidence/template-media.json').read_text(encoding='utf-8'))['items'] if x['canonical_filename']=='Admonition-icon-warning.png')
            aside=soup.select_one('aside.wiki-admonition')
            assert aside
            icon=soup.new_tag('img', src='../../'+warning['asset_path'].lstrip('/'), alt='', width='17', height='15')
            heading=aside.find("p", recursive=False)
            assert heading
            heading.append(icon)
        rendered=str(soup)
        rendered=rendered.replace('[unrecovered article:', '[unresolved link:')
        if article.gaps:
            # Link gaps stay visible; unexpected rendering problems must not be hidden.
            allowed={'unrecovered_internal_target'}
            bad=[g for g in article.gaps if g['kind'] not in allowed]
            if bad: raise ValueError(f'{invocation}: unexpected converter gaps: {bad}')
    out.append({'invocation':invocation,'name':data['name'],'source_download':item['source_download'],'definition_sha256':item['wikitext_sha256'],'expanded_wikitext_sha256':digest(expanded),'rendered_sha256':digest(rendered),'html':rendered,'scalar':scalar,'inline':scalar or norm(data['name']) == 'wallet date explainer','articles':data['articles']})
(site/'migration/template-renderings-20261014.json').write_text(json.dumps({'schema_version':1,'capture_date':'2026-10-14','generator':'scripts/derive-template-renderings.py','occurrences':71,'items':out},ensure_ascii=False,indent=2)+'\n', encoding='utf-8')
print(f'Generated {len(out)} unique renderings for 71 occurrences')

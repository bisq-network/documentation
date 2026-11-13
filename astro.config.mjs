import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { collectGuides, sections } from "./scripts/lib/documentation.mjs";
import { wikiMarkdown } from "./src/markdown/wiki-markdown.mjs";
import navigation from "./src/data/navigation.json" with { type: "json" };

// Set these only when the final GitHub Pages destination is known.
const site = process.env.DOCS_SITE || undefined;
const base = process.env.DOCS_BASE || "/";
const guides = collectGuides();
// Display-only sidebar changes from src/data/navigation.json: language versions after the first
// leave the list (each page links them), and near-duplicate pages fold into one group.
const slugOf = (route) => route.replace(/^\/wiki\/|\/$/g, "");
const switchOnly = new Set(navigation.languageVersions.flatMap((group) => group.pages.slice(1).map((page) => page.slug)));
const sidebarItems = (articles) => articles.flatMap((article) => {
  const slug = slugOf(article.route);
  if (switchOnly.has(slug)) return [];
  const fold = navigation.folded.find((group) => group.slugs.includes(slug));
  if (!fold) return [{ label: article.title, link: article.route }];
  if (fold.slugs[0] !== slug) return [];
  const pages = fold.slugs.map((item) => articles.find((other) => slugOf(other.route) === item) ?? guides.find((guide) => guide.slug === item));
  return [{ label: fold.label, badge: { text: fold.badge, variant: "default" }, collapsed: true, items: pages.map((page) => ({ label: page.title, link: page.route })) }];
});
// GitHub sets GITHUB_REPOSITORY in Actions, so the header link follows a repository transfer.
const repository = process.env.DOCS_REPOSITORY || process.env.GITHUB_REPOSITORY || "bisq-network/documentation";

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      // src/pages/404.astro is the 404 page; stop Starlight registering a second /404 route.
      disable404Route: true,
      title: "Documentation",
      favicon: "/favicon.ico",
      logo: { src: "./src/assets/bisq-logo.svg", alt: "Bisq" },
      customCss: ["./src/styles/custom.css"],
      routeMiddleware: "./src/route-data.ts",
      components: {
        Banner: "./src/components/PreviewBanner.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Search: "./src/components/Search.astro",
        MarkdownContent: "./src/components/SourceHistory.astro",
        TableOfContents: "./src/components/TableOfContents.astro",
        MobileTableOfContents: "./src/components/MobileTableOfContents.astro",
        SocialIcons: "./src/components/SocialIcons.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
      },
      social: [{ icon: "github", label: "GitHub", href: `https://github.com/${repository}` }],
      sidebar: [
        { label: "Overview", link: "/" },
        ...sections.map((section) => ({
          label: section.label,
          collapsed: section.directory !== "start",
          items: section.subgroups
            ? section.subgroups.map((subgroup) => ({
              label: subgroup.label,
              collapsed: false,
              items: sidebarItems(subgroup.articles),
            }))
            : sidebarItems(guides.filter((guide) => guide.directory === section.directory)
              .sort((a, b) => a.navigationOrder - b.navigationOrder)),
        })).filter((section) => section.items.length),
        { label: "Browse all documentation", link: "/browse/" },
        { label: "Review status", link: "/review/" },
      ],
    }),
    // After Starlight, so these rules see its heading wrappers (src/markdown/wiki-markdown.mjs).
    wikiMarkdown(),
  ],
});

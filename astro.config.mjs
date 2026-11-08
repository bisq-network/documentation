import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { collectGuides, sections } from "./scripts/lib/documentation.mjs";

// Set these only when the final GitHub Pages destination is known.
const site = process.env.DOCS_SITE || undefined;
const base = process.env.DOCS_BASE || "/";
const guides = collectGuides();

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: "Documentation",
      favicon: "/favicon.ico",
      logo: { src: "./src/assets/bisq-logo.svg", alt: "Bisq" },
      customCss: ["./src/styles/custom.css"],
      routeMiddleware: "./src/route-data.ts",
      components: {
        Banner: "./src/components/PreviewBanner.astro",
        MarkdownContent: "./src/components/SourceHistory.astro",
      },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/hiciefte/bisq-docs" }],
      sidebar: [
        { label: "Overview", link: "/" },
        ...sections.map((section) => ({
          label: section.label,
          collapsed: section.directory !== "start",
          items: section.subgroups
            ? section.subgroups.map((subgroup) => ({
              label: subgroup.label,
              collapsed: false,
              items: subgroup.articles.map((article) => ({ label: article.title, link: article.route })),
            }))
            : guides.filter((guide) => guide.directory === section.directory)
              .sort((a, b) => a.navigationOrder - b.navigationOrder)
              .map((guide) => ({ label: guide.title, link: guide.route })),
        })).filter((section) => section.items.length),
        { label: "Browse all documentation", link: "/browse/" },
        { label: "Review status", link: "/review/" },
      ],
    }),
  ],
});

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// Set these only when the final GitHub Pages destination is known.
const site = process.env.DOCS_SITE || undefined;
const base = process.env.DOCS_BASE || "/";

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
        MarkdownContent: "./src/components/RelatedGuideContent.astro",
      },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/hiciefte/bisq-docs" }],
      sidebar: [
        { label: "Start here", items: [
          { label: "Overview", link: "/" },
          { label: "Choose Bisq 1 or Bisq 2", link: "/start/choose-bisq/" },
        ] },
        { label: "Bisq 2", items: [
          { label: "Install and verify", link: "/bisq-2/install-and-verify/" },
          { label: "Make your first trade", link: "/bisq-2/first-trade/" },
          { label: "Bisq Easy safety", link: "/bisq-2/bisq-easy-safety/" },
          { label: "Backup and recovery", link: "/bisq-2/backup-and-recovery/" },
          { label: "Get help", link: "/bisq-2/get-help/" },
        ] },
        { label: "Bisq 1", items: [
          { label: "Install and verify", link: "/bisq-1/install-and-verify/" },
          { label: "Set up a payment account", link: "/bisq-1/payment-accounts/" },
          { label: "Make your first trade", link: "/bisq-1/first-trade/" },
          { label: "Backup and recovery", link: "/bisq-1/backup-and-recovery/" },
          { label: "Disputes and help", link: "/bisq-1/dispute-help/" },
        ] },
        { label: "DAO", items: [{ label: "Overview", link: "/dao/overview/" }] },
        { label: "Contributing", items: [{ label: "Getting started", link: "/contribute/getting-started/" }] },
        { label: "Historical wiki", collapsed: true, items: [
          { label: "Browse by subject", link: "/browse/" },
          { label: "All 209 articles", link: "/browse/all/" },
          { label: "Bisq 2", link: "/browse/bisq-2/" },
          { label: "Bisq 1", link: "/browse/bisq-1/" },
          { label: "DAO", link: "/browse/dao/" },
          { label: "Contributing", link: "/browse/contributing/" },
          { label: "Payment methods", link: "/browse/payment-methods/" },
          { label: "Troubleshooting", link: "/browse/troubleshooting/" },
          { label: "Reference", link: "/browse/reference/" },
          { label: "Recovered media", link: "/recovered-media/" },
        ] },
        { label: "Review status", link: "/review/" },
      ],
    }),
  ],
});

import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

// All original articles are searchable. Index and provenance pages would duplicate their results.
export const onRequest = defineRouteMiddleware(({ locals }) => {
  const { entry } = locals.starlightRoute;
  const id = entry.id.replace(/\.(md|mdx)$/, "");
  if (id.startsWith("browse/") || ["browse", "recovered-media", "recovery-status", "review"].includes(id)) {
    entry.data.pagefind = false;
  }
});

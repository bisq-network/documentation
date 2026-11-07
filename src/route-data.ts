import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

// Search focuses on current guides. Historical material remains available through its title index.
export const onRequest = defineRouteMiddleware(({ locals }) => {
  const { entry } = locals.starlightRoute;
  const id = entry.id.replace(/\.(md|mdx)$/, "");
  if (id.startsWith("wiki/") || id.startsWith("browse/") || ["browse", "recovered-media", "recovery-status", "review"].includes(id)) {
    entry.data.pagefind = false;
  }
});

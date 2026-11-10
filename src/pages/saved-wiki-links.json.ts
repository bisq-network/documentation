import type { APIRoute } from "astro";
import { loadIntegration } from "../../scripts/lib/documentation.mjs";
import { buildSavedWikiLinks } from "../../scripts/lib/saved-wiki-links.mjs";

export const prerender = true;

// Same article metadata and alias builders as [...legacy].astro.
// This static endpoint never receives or processes a user's pasted URL.
export const GET: APIRoute = () => new Response(
    JSON.stringify(buildSavedWikiLinks(loadIntegration())),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
);

import { REGIONS } from "$lib/regions";

export const prerender = true;

export async function GET() {
  return new Response(
    `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${REGIONS.map(
          (region) => `
          <url>
            <loc>https://bikemap.carto.au/${region.id}</loc>
          </url>
          `,
        ).join("")}
      </urlset>

    `.replace(/\s/g, ""), // Remove all whitespace from XML
  );
}

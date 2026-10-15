import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { localizedPath, pagePaths } from '../lib/i18n';
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://grimael.dev');
  const paths = [...Object.values(pagePaths), ...projects.map(p => `projects/${p.slug}`)];
  const entries = paths.map(path => `<url><loc>${new URL(localizedPath(path), origin)}</loc></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

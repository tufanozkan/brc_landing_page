// pages/sitemap.xml.js
// Dynamic sitemap generator for BRC KALIP & 4 EL PLASTİK
// Returns: application/xml response with all public URLs

const BASE_URL = 'https://www.brckalip.com.tr';

function generateSiteMap() {
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/plastic', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/kvkk', priority: '0.3', changefreq: 'yearly' },
    { url: '/gizlilik', priority: '0.3', changefreq: 'yearly' },
  ];

  const today = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export default function SiteMap() {
  // getServerSideProps handles the response; this component is never rendered
}

export function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

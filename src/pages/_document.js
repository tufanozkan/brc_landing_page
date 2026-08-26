import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/logos/logo.jpeg" />
        <link rel="apple-touch-icon" href="/logos/logo.png" />

        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Global meta */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2d3748" />
        <meta name="author" content="BRC KALIP & 4 EL PLASTİK" />
        <meta name="geo.region" content="TR-45" />
        <meta name="geo.placename" content="Manisa, Türkiye" />
        <meta name="geo.position" content="38.6000;27.4167" />
        <meta name="ICBM" content="38.6000, 27.4167" />

        {/* Default OG image (overridden per-page) */}
        <meta property="og:image" content="https://www.brckalip.com.tr/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="BRC KALIP & 4 EL PLASTİK" />

        {/* Default Twitter card type */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

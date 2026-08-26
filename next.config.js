/** @type {import('next').NextConfig} */

// ─── Content Security Policy ──────────────────────────────────────────────
// Sources are explicitly allowlisted per directive.
// unsafe-eval is deliberately EXCLUDED.
// unsafe-inline for script-src: Next.js Pages Router injects hydration scripts
//   inline; removing this requires a nonce-based middleware approach which is
//   a larger refactor. All other directives are strict.
// unsafe-inline for style-src: Framer Motion applies animation styles inline
//   via the CSSOM; a hash-based approach would need per-render recalculation.

const ContentSecurityPolicy = [
  // Fallback for any directive not explicitly set
  "default-src 'self'",

  // JavaScript: own origin + Cloudflare Turnstile widget (optional CAPTCHA)
  // NOTE: unsafe-inline kept for Next.js Pages Router hydration compatibility.
  //       No unsafe-eval — eval() is disallowed.
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",

  // CSS: own origin + Google Fonts stylesheet + Framer Motion inline styles
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

  // Fonts: own origin + Google Fonts files
  "font-src 'self' https://fonts.gstatic.com",

  // Images: own origin + Unsplash hero backgrounds + Google Maps tiles + base64
  "img-src 'self' data: https://images.unsplash.com https://maps.gstatic.com https://*.googleapis.com",

  // Video & audio: only own origin (intro video served from /public/videos/)
  "media-src 'self'",

  // iframes: Google Maps embed + Cloudflare Turnstile challenge frame
  "frame-src https://maps.google.com https://www.google.com https://challenges.cloudflare.com",

  // Fetch / XHR: own API (/api/contact) + Cloudflare Turnstile verify endpoint
  "connect-src 'self' https://challenges.cloudflare.com",

  // Plugins: block Flash, Java applets, etc.
  "object-src 'none'",

  // Prevent base tag hijacking
  "base-uri 'self'",

  // Allow form submissions only to own origin
  "form-action 'self'",

  // Prevent this page from being embedded in foreign frames (clickjacking)
  "frame-ancestors 'none'",

  // Upgrade any accidental http:// sub-resource requests to https://
  process.env.NODE_ENV === 'production' ? "upgrade-insecure-requests" : "",
].filter(Boolean).join('; ');

const securityHeaders = [
  // ── CSP ─────────────────────────────────────────────────────────────────
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },

  // ── Transport Security (HSTS) ────────────────────────────────────────────
  // 2 years, including subdomains, eligible for browser preload lists.
  ...(process.env.NODE_ENV === 'production' ? [{
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  }] : []),

  // ── MIME Sniffing ────────────────────────────────────────────────────────
  // Prevents browsers from guessing content types (e.g. text/plain → script).
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  // ── Clickjacking (legacy support alongside CSP frame-ancestors) ──────────
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },

  // ── Referrer ─────────────────────────────────────────────────────────────
  // Send origin only on same-origin; send origin (no path) on cross-origin HTTPS.
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  // ── Permissions Policy ───────────────────────────────────────────────────
  // Disable browser features this site does not use.
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
      'payment=()',
      'usb=()',
      'bluetooth=()',
      'ambient-light-sensor=()',
      'gyroscope=()',
      'magnetometer=()',
      'accelerometer=()',
    ].join(', '),
  },
];

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.88.230'],

  async headers() {
    return [
      {
        // Apply to every route including API routes and static assets
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;

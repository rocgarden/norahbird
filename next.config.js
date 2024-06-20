/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; font-src 'self' fonts.gstatic.com; img-src 'self' https://*.googletagmanager.com; script-src 'self' strict-dynamic 'unsafe-eval' https: 'unsafe-inline'  unsafe-inline https://*.googletagmanager.com; connect-src 'self' unsafe-eval https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://vercel.live/*; style-src 'self' 'unsafe-inline' fonts.googleapis.com`,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig

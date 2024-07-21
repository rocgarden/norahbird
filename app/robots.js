export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/protected/","/privacy", "signin"],
    },
    sitemap: "https://norahbird.com/sitemap.xml",
  };
}

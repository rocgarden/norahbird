export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/protected/","/privacy"],
    },
    sitemap: "https://norahbird.com/sitemap.xml",
  };
}

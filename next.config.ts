import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Keep links to the old static site working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/posts/post.html", destination: "/writing", permanent: true },
      { source: "/posts/blog1.html", destination: "/writing/welcome", permanent: true },
      { source: "/posts/blog2.html", destination: "/writing/what-even-is-reality", permanent: true },
      { source: "/posts/blog3.html", destination: "/writing/p-vs-np", permanent: true },
      { source: "/about/about.html", destination: "/about", permanent: true },
      { source: "/quotes/quotes.html", destination: "/quotes", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

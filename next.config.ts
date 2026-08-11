import type { NextConfig } from "next";

// GitHub Pages serves this project from /native_score/, but the Capacitor
// native build must keep an empty basePath (it serves `out/` from the root
// of the app bundle). Only the Pages workflow sets GITHUB_PAGES=true.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "native_score";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  trailingSlash: true,
};

export default nextConfig;

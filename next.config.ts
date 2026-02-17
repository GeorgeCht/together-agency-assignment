import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/together-agency-assignment",
  assetPrefix: "/together-agency-assignment/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

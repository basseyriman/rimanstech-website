import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.thum.io",
        pathname: "/get/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/work/alzdetect",
        destination: "/products/alzdetect",
        permanent: true,
      },
      {
        source: "/work/young-ai-explorers",
        destination: "/products/young-ai-explorers",
        permanent: true,
      },
      {
        source: "/work/ai-quest",
        destination: "/products/ai-quest",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

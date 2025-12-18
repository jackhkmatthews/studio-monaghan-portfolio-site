import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["hubgw46h.apicdn.sanity.io", "192.168.1.121"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

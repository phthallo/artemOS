import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com"
      },
      {
        protocol: "https",
        hostname: "hc-cdn.hel1.your-objectstorage.com"
      }
    ]
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'v5.airtableusercontent.com',
      'hc-cdn.hel1.your-objectstorage.com'
    ]
  }
};

export default nextConfig;

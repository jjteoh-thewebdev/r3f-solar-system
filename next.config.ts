import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    position: 'top-left' // prevent conflicts with our custom legend
  }
};

export default nextConfig;

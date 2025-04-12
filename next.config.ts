import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    position: 'bottom-right' // prevent conflicts with our custom legend
  }
};

export default nextConfig;

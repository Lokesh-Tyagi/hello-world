import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: ['./src'],
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Disable development indicators
  devIndicators: false,
};

export default nextConfig;
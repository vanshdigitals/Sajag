import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'firebase',
      '@google/genai',
    ],
  },
  webpack: (config, { isServer }) => {
    // Exclude test files from build
    config.module.rules.push({
      test: /\.(test|spec)\.(ts|tsx)$/,
      use: 'null-loader',
    });
    return config;
  },
};

export default nextConfig;

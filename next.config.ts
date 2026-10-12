import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dermafusion.co.uk",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "dermafusion.co.uk",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5173/api/:path*",
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode for highlighting potential issues
  swcMinify: true, // Enables SWC-based minification for faster builds
  images: {
    domains: ["morth.nic.in"], // Add domains for external images if needed
  },
  async headers() {
    return [
      {
        source: "/:path*", // Apply headers to all routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow CORS for all origins (adjust as needed)
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s1.ticketm.net",
        port: "",
        pathname: "/dam/a/**",
      },
      {
        protocol: "https",
        hostname: "i.ticketweb.com",
        port: "",
        pathname: "/i/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "54.179.185.61",
        port: "1338",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "wpt-global-taiwan-backend.onrender.com",
        pathname: "/uploads/**",
      },
    ],

    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;

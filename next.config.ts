import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
	  {
	    protocol: "https",
	    hostname: "api.wptglobal-asia.com",
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

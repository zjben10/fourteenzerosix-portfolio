import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Lab was renamed to "AI Related Projects and Skills" and moved from
      // /lab to /ai-projects. Keep the old path working.
      {
        source: "/lab",
        destination: "/ai-projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

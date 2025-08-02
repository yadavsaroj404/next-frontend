import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow nextjs to render images from imagekit.io
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "career-naksha.s3.ap-south-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "logos-test-bucket.s3.ap-south-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dashboard.careernaksha.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "connect-assets.prosple.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "image-static.collegedunia.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "newwayuk.com.ng",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

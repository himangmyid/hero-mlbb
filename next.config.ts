import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "img.mobilelegends.com",
      "akmweb.youngjoygame.com",
      "akmwebstatic.yuanzhanapp.com",
      "indoch.s3.ml.moonlian.com", // Tambahkan domain ini
    ],
  },
};

export default nextConfig;

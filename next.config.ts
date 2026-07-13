import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.0.3", "127.0.0.1", "localhost"],
};

export default nextConfig;

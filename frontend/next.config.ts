import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  // other options
}

export default nextConfig

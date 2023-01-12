/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "www.myparla.com", "ocdn.eu"],
  },
}

module.exports = nextConfig

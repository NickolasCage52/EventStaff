/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/EventStaff" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/EventStaff/" : "",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

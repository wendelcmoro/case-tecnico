/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.sa-east-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;

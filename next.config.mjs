/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // Route rename: /services/* -> /pests/*
      { source: '/services', destination: '/pests', permanent: true },
      { source: '/services/:slug', destination: '/pests/:slug', permanent: true },
      // Route rename: /contact -> /get-a-quote
      { source: '/contact', destination: '/get-a-quote', permanent: true },
    ];
  },
};

export default nextConfig;

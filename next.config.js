/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['localhost', 'node-js-final-be.onrender.com'],
  },
}

module.exports = nextConfig
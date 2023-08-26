/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/auth/:parms',
        destination: 'http://localhost:3001/auth/:parms',
      },
    ]
  },
};
// module.exports = nextConfig

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n,
  async redirects() {
    return [
      {
        source: '/estejabah',
        destination: 'https://estejabah.ly',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;

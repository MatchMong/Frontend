/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the monorepo/workspace root for Turbopack to silence the lockfile warning
  turbopack: { root: __dirname },
};

module.exports = nextConfig;

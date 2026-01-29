import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  i18n: {
    // The locales you want to support
    locales: ['en', 'fr'],
    // The default locale to use when no prefix is present
    defaultLocale: 'en',
  },
};

export default nextConfig;

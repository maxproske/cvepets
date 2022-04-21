module.exports = {
  compiler: {
    // SSR and displayName are configured by default
    styledComponents: true,
  },
  swcMinify: true,
  eslint: {
    // Allow project to build even if project has ESLint errors
    ignoreDuringBuilds: true,
  },
}

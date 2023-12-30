module.exports = {
  output: 'standalone',
  compiler: {
    // SSR and displayName are configured by default
    styledComponents: true,
  },
  eslint: {
    // Allow project to build even if project has ESLint errors
    ignoreDuringBuilds: true,
  },
}

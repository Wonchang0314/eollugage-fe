/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['jotai-devtools'],
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  async rewrites() {
    return [
      {
        source: '/API/:path*',
        destination: `${process.env.SERVER_URL}/api/:path*`,
      },
    ]
  },
}

export default nextConfig

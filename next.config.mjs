/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // trailingSlash: true,
  // distDir: "dist",
  basePath: "",
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
        "process.env.INSTAGRAM_KEY": JSON.stringify(process.env.INSTAGRAM_KEY),
      }),
    ];
    return config;
  },
  images: {
    domains: [
      "nextgen.smartgreenovation.com",
      "http://nextgen.dev.smartgreenovation.com",
      "lh3.googleusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

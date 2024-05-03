/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;

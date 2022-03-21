/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    config.module.rules.push({
      test: /\.(ttf|eot|woff|woff2)$/,
      exclude: /node_modules/,
      use: 'url-loader',
    });

    return config;
  },
};

module.exports = nextConfig;

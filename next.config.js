const plugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const path = require('path');
const fs = require('fs');
const ESLintPlugin = require('eslint-webpack-plugin');
const withOffline = require('next-offline');

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const appDirectory = fs.realpathSync(process.cwd());

const nextConfig = {
  webpack(config, { webpack, dev, isServer }) {
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g|ttf|glb|gltf|hdr)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    config.plugins.push(
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        eslintPath: require.resolve('eslint'),
        context: resolveApp('src'),
        cache: true,
        cacheLocation: path.resolve(
          resolveApp('node_modules'),
          '.cache/.eslintcache'
        ),
        // ESLint class options
        cwd: resolveApp('.'),
        resolvePluginsRelativeTo: __dirname,
        baseConfig: {
          extends: [require.resolve('eslint-config-react-app/base')],
          rules: {},
        },
      })
    );

    return config;
  },
};

// manage i18n
if (process.env.EXPORT !== 'true') {
  nextConfig.i18n = {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  };
}

module.exports = plugins(
  [
    [
      withOffline,
      {
        workboxOpts: {
          swDest: process.env.NEXT_EXPORT
            ? 'service-worker.js'
            : 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'offlineCache',
                expiration: {
                  maxEntries: 200,
                },
              },
            },
          ],
        },
        async rewrites() {
          return [
            {
              source: '/service-worker.js',
              destination: '/_next/static/service-worker.js',
            },
          ];
        },
      },
    ],
    withBundleAnalyzer,
  ],
  nextConfig
);

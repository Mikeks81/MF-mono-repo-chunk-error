const paths = require('./paths')
const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { ModuleFederationPlugin } = require('webpack').container
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: false,
    compress: true,
    hot: true,
    port: 3001,
  },

  module: {
    rules: [
      // ... other rules
      {
        test: /\.[js]sx?$/,
        exclude: /node_modules/,
        use: [
          // ... other loaders
          {
            loader: require.resolve('babel-loader'),
            options: {
              // ... other options
              plugins: [
                // ... other plugins
                require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env.development',
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'remote',
      // library: { type: 'var', name: 'app2' },
      filename: 'remoteEntry.js',
      exposes: {
        './App': `${paths.src}/App.js`,
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ].filter(Boolean),
})

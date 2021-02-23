const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  plugins: [new webpack.ProgressPlugin()],

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      include: [path.resolve(__dirname, 'src')],
      exclude: [/node_modules/]
    }]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

}
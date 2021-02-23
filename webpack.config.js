const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/maestro-injection.ts',
  plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()],

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
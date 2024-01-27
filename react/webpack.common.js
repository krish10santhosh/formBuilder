const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const DefinePlugin = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        }
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: 'static'
    }),
    new HtmlWebpackPlugin({
      minify: false,
      template: 'public/index.html',
      inject: true,
      title: 'Octopedia',
      favicon: 'public/favicon.ico',
      appMountId: 'app',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      links: [{ href: '/site.webmanifest', rel: 'manifest' }],
      appMountHtmlSnippet: '<div class="app-spinner"></div>',
      headHtmlSnippet:
        '<style>div.app-spinner{position:fixed;top:50%;left:50%;border:16px solid #f3f3f3;border-top:16px solid #3498db;border-radius:50%;width:120px;height:120px;margin:-60px 0 0 -60px;z-index:1;animation:spin 2s linear infinite;}@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style >',
    }),
  ],
}
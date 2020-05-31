const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const globImporter = require('node-sass-glob-importer')

// global paths
const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        // images / icons
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        // scss
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `${PATHS.src}/js/config/postcss.config.js`} }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                importer: globImporter()
              },
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      minify: false,
      template: `${PATHS.src}/index.html`,
      filename: "./index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/img`,
          to: `${PATHS.assets}img`
        },
        {
          from: `${PATHS.src}/static`,
          to: ''
        },
      ]
    })
  ],

}

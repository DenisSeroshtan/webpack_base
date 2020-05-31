const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const globImporter = require('node-sass-glob-importer')
const PATHS = {
  
}

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, './dist'),
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
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
            options: { sourceMap: true, config: { path: 'src/js/config/postcss.config.js' } }
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
      filename: "[name].css",
    })
  ],

}

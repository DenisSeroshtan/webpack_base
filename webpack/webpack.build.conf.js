const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD settings gonna be here
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  plugins: []
})

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    require('postcss-pxtorem')({
      //default options
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i
    }),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          }
        }
      ]
    })
  ]
}

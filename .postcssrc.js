const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      // 根字体大小
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      // 所有都转为rem大小
      propList: ['*']
    })
  ]
}

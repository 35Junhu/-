const { defineConfig } = require('@vue/cli-service')
const { join } = require('path')
const cpns = join(__dirname, 'src/components')
const views = join(__dirname, 'src/views')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: 'localhost'
    },
    resolve: {
      alias: {
        cpns,
        views
      }
    }
  }
})

const path = require("path");
module.exports = {
  publicPath: './',
  outputDir: 'distribution',

  chainWebpack: config => {
    if (config.mode === 'production') {
      config
          .plugin('uglifyjs-plugin')
          .use('uglifyjs-webpack-plugin', [{
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log']
              }
            }
          }])
    }
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production'

    } else {
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages')
        }
      }
    })
  },
  productionSourceMap: false,

  transpileDependencies: [
    'vuetify'
  ]
}

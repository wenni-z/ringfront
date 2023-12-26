/*
 * @Author: CS
 * @Date: 2020-07-07 15:42:48
 * @LastEditors: cs
 * @LastEditTime: 2020-07-28 09:48:56
 * @Description: Do not edit
 */
const path = require('path')

// eslint-disable-next-line no-unused-vars
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production' ? '/ringfront/' : '/'

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'build',
  lintOnSave: true,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // assetsPublicPath: './',
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    host: '127.0.0.1',
    port: 10911
  }
}
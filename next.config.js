/*
 * @Author: Innei
 * @Date: 2020-04-18 16:00:58
 * @LastEditTime: 2020-09-05 11:27:45
 * @LastEditors: Innei
 * @FilePath: /candy/next.config.js
 * @MIT
 */

const isProd = process.env.NODE_ENV === 'production'
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const env = require('dotenv').config().parsed || {}
const withImages = require('next-images')

const configs = withImages(
  withBundleAnalyzer({
    webpack: (config, options) => {
      return config
    },
    env: {
      PORT: 2323,
      ...env,
    },
    assetPrefix: isProd ? env.ASSETPREFIX || '' : '',

    experimental: {
      granularChunks: true,
      modern: true,
    },
  }),
)

module.exports = configs

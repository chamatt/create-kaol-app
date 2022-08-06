/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
}

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'moti',
  '@motify/core',
  '@motify/components',
  'twrnc',
  'js-cookie',
  'app',
  'api',
  'config',
  'lib',
  'universal',
])

module.exports = withPlugins(
  [withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig
)

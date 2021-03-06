const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack(config) {
    config.plugins.push(new Dotenv({ silent: true }));

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
  },
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    publicPath: process.env.NODE_ENV === 'production'
    ? '/my_portfolio/'
    : '/',
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}


module.exports = {
  head: {
    title: 'Authorization',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cargo transportation' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  router: {
    middleware: 'auth'
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'http://localhost:8000'
  },
  env: {
    SIGN_IN_PATH: '/auth/login/',
    SIGN_UP_PATH: '/auth/registration/',
    SIGN_OUT_PATH: '/auth/logout/',
    VERIFY_EMAIL_PATH: '/auth/registration/verify-email/',
    RESTORE_PASSWORD_PATH: '/auth/password/reset/',
    RESTORE_PASSWORD_CONFIRM_PATH: '/auth/password/reset/confirm/'
  },
  plugins: [
    '~/plugins/vuetify.js'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ff0000' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}


module.exports = {
  head: {
    title: 'transportation',
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
    DEV_API: 'http://localhost:8000',
    PROD_API: 'http://localhost',
    SIGN_IN_PATH: '/',
    SIGN_UP_PATH: '/auth/registration/',
    SIGN_OUT_PATH: '/',
    RESTORE_PASSWORD_PATH: '/'
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
  loading: { color: '#3B8070' },
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

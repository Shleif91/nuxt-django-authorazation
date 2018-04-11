This module uses data and endpoints from [django-rest-auth](http://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html)  

## Build Setup

First need edit nuxt.config.js:
```
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

```

Then use this for work:

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.


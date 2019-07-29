const bodyParser = require('body-parser');
const axios = require('axios');

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'My Blog' || process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff', height: '4px', duration: 5000 },
  loadingIndicator: { color: 'red', name: 'circle' },
  /*
   ** Global CSS
   */
  css: ['~assets/styles/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/core-components.js', '~plugins/date-filter.js'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.BASE_URL || 'https://nuxt-blog-13-07-2019.firebaseio.com',
    credentials: false,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  env: {
    baseUrl:
      process.env.BASE_URL || 'https://nuxt-blog-13-07-2019.firebaseio.com',
    fbAPIKey: 'AIzaSyDvim6CDZPr8VPj4C5pnd3G0bYEIb7PJsk',
  },

  transition: {
    name: 'fade',
    mode: 'out-in',
  },

  serverMiddleware: [bodyParser.json(), '~/api'],

  generate: {
    routes: function() {
      return axios
        .get('https://nuxt-blog-13-07-2019.firebaseio.com/posts.json')
        .then(res => {
          const routes = [];
          for (let key in res.data) {
            routes.push({
              route: `/posts/${key}`,
              payload: { postData: res.data[key] },
            });
          }
          return routes;
        });
    },
  },
};

import VueMdl from 'vue-mdl'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueMdl)
Vue.use(VueRouter)

/* eslint-disable no-new */
var router = new VueRouter({
  history: true,
  root: '/'
})

var NotFound = Vue.extend({
  template: '<h4>404 - Page not found</h4>'
})

import Root from './components/root'
import Home from './components/home'
import About from './components/about'
import Stream from './components/stream'
import StreamHome from './components/stream/home'
import StreamDashboard from './components/stream/dashboard'
import StreamCLR from './components/stream/clr'

router.map({
  '*': {
    component: NotFound
  },

  '/s/:stream/clr': {
    component: StreamCLR,
    name: 'stream-clr'
  },

  '/': {
    component: Root,
    name: 'root',
    exact: true,

    subRoutes: {
      '/': {
        component: Home
      },

      '/about': {
        component: About
      },

      '/s/:stream': {
        component: Stream,
        name: 'stream',

        subRoutes: {
          '/': {
            component: StreamHome,
            name: 'stream-home'
          },
          '/dashboard': {
            component: StreamDashboard,
            name: 'stream-dashboard'
          }
        }
      }
    }
  }
})

router.start(App, '#app')

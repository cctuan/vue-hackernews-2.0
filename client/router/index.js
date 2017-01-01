import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from './../store'

Vue.use(Router)
Vue.use(Meta)

import { createListView } from '../views/CreateListView'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/top/:page(\\d+)?',
      component: createListView('top'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isUserLogin) {
          next()
        } else {
          next({ path : '/new' })
        }
      }
    },
    { path: '/new/:page(\\d+)?', component: createListView('new') },
    { path: '/show/:page(\\d+)?', component: createListView('show') },
    { path: '/ask/:page(\\d+)?', component: createListView('ask') },
    { path: '/job/:page(\\d+)?', component: createListView('job') },
    { path: '/item/:id(\\d+)', component: ItemView },
    { path: '/user/:id', component: UserView },
    { path: '/', redirect: '/top' }
  ]
})

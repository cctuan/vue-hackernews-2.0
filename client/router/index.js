import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from './../store'

Vue.use(Router)
Vue.use(Meta)

import { createListView } from '../views/CreateListView'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'

const routeGuard = (to, from, next) => {
  if (store.getters.isUserLogin) {
    next()
  } else if (store.getters.isUserVisited) {
    next({ path: '/login' })
  } else {
    next({ path: '/landing' })
  }
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/top/:page(\\d+)?',
      component: createListView('top'),
      beforeEnter: routeGuard
    },
    { path: '/new/:page(\\d+)?', component: createListView('new') },
    { path: '/show/:page(\\d+)?', component: createListView('show') },
    { path: '/ask/:page(\\d+)?', component: createListView('ask') },
    { path: '/job/:page(\\d+)?', component: createListView('job') },
    { path: '/item/:id(\\d+)', component: ItemView },
    { path: '/user/:id', component: UserView },
    { path: '/landing' , component: LandingView},
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        store.dispatch('LOGOUT').then(() => {
          next({ path: '/' })
        })
        .catch(() => {
          next(from)
        })
      }
    },
    {
      path: '/login',
      component: LoginView,
      beforeEnter (to, from, next) {
        if (store.getters.isUserLogin) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      redirect: '/top',
      beforeEnter: routeGuard
    }
  ]
})

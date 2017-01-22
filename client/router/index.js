import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import {
  userHasAuthorizedEdit
} from './../store/api'
import store from './../store'

import ROUTES from '../../config/constants/ROUTES'

Vue.use(Router)
Vue.use(Meta)

import { createListView } from '../views/CreateListView'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import MainPostView from '../views/MainPostView.vue'
import PostView from '../views/PostView.vue'
import EditView from '../views/EditView.vue'
import QuickEditView from '../views/QuickEditView.vue'
import DetailEditView from '../views/DetailEditView.vue'
import PreviewEditView from '../views/PreviewEditView.vue'

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
    // NEED INVESTIGATING
    // if edit subpath is also under post path
    // the edit main view will not be replace if /post -> /post/edit/ or
    // /post/edit -> /post/:id
    // so I separate these two view...
    {
      path: '/post/:id',
      component: MainPostView,
      children: [
        {
          path: 'view',
          component: PostView,
          name: ROUTES.POST_VIEW,
          beforeEnter(to, from, next) {
            store.dispatch('SET_HEADER', {
              center: '',
              left: 'arrow_back',
              right: 'menu',
            })
            next()
          },
        },
      ]
    },
    {
      path: '/edit/:id?',
      component: EditView,
      children: [
        {
          path: 'preview',
          name: ROUTES.PREVIEW_EDIT,
          component: PreviewEditView,
          beforeEnter(to, from, next) {
            store.dispatch('SET_HEADER', {
              center: '筆記預覽',
              left: 'arrow_back',
              right: 'more_vert',
            })
            next()
          },
        },
        {
          path: 'detail',
          component: DetailEditView,
          name: ROUTES.DETAIL_EDIT,
          beforeEnter(to, from, next) {
            console.log('__ROUTES.DETAIL_EDIT', to)
            store.dispatch('SET_HEADER', {
              center: '新增筆記',
              left: 'arrow_back',
            })
            next()
          },
        },
        {
          path: '',
          component: QuickEditView,
          name: ROUTES.QUICK_EDIT,
          beforeEnter(to, from, next) {
            store.dispatch('SET_HEADER', {
              center: '新增筆記',
              left: 'arrow_back',
            })
            next()
          },
        }
      ]
    },
    {
      path: '/landing' ,
      component: LandingView
    },
    {
      path: '/main' ,
      component: MainView,
      name: 'list-view',
      beforeEnter(to, from, next) {
        if (store.getters.isUserLogin) {
          store.dispatch('SET_HEADER', {
            center: '我的品酒筆記',
            left: 'menu',
            right: 'create'
          })
          next()
        } else if (store.getters.isUserVisited) {
          next({ path: '/login' })
        } else {
          next({ path: '/landing' })
        }
      },
    },
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
          store.dispatch('SET_HEADER', {
            center: '註冊',
            left: 'arrow_back'
          })
          next()
        }
      }
    },
    {
      path: '/',
      redirect: '/main',
      beforeEnter: routeGuard
    }
  ]
})

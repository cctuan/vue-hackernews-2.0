import Vue from 'vue'
import Vuex from 'vuex'
import {
  fetchItems,
  fetchIdsByType,
  fetchUser,
  userLogout,
  fetchPostList,
  fetchPost,
  savePost,
} from './api'

Vue.use(Vuex)

const createInitialPost = () => {
  return {
    type: null,
    name: null,
    description_s: null,
    rating: null,
    thumb: {
      theme: null,
      original: null,
      url: null
    },
    meta: {
      nose: {
        type: {},
        strong: null
      },
      taste: {
        type: {},
        wine_body: null,
        tannin: null,
        sweetness: null,
        acid: null
      },
      other: {
        price: null,
        year: null,
        description: null,
        matury: null
      },
      color: null,
      clarity: null
    },
    author: null
  }
}

const store = new Vuex.Store({
  state: {
    hasVisited: false,
    // when user try to edit a post , server will give a auth value
    isAuthorized: false,
    isLogin: false,
    user: {},

    post: createInitialPost(),

    posts: {
      query : '',
      total : 0,
      page: 1,
      list: []
    },
    activeType: null,
    itemsPerPage: 20,
    items: {/* [id: number]: Item */},
    users: {/* [id: string]: User */},
    lists: {
      top: [/* number */],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },

  actions: {
    VISIT: ({ commit }) => {
      commit('HAS_VISITED')
    },
    LOGIN: ({ commit }, user) => {
      commit('USER_LOGIN', { user })
    },

    LOGOUT: ({ commit }) => {
      return userLogout()
        .then(() => {
          commit('USER_LOGOUT')
          return Promise.resolve()
        })
    },

    AUTHORIZE_USER : ({ commit }, isAuth) => {
      commit('SET_AUTH', isAuth)
    },

    UPDATE_CURRENT_POST: ({ commit }, post = {}) => {
      commit('SET_POST', post)
    },

    FETCH_LIST_POST: ({commit, dispatch, state}, {query = {}}) => {
      return fetchPostList(query)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            const {result , options, count} = response.data
            return commit('SET_POSTS', {
              list : result,
              page : options.page,
              count : count
            })
          }
        })
    },

    FETCH_POST: ({commit}, id) => {
      return fetchPost(id)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            commit('SET_AUTH', response.data.result.isAuth)
            return commit('SET_POST', response.data.result.post)
          }
        })
    },

    // ensure data for rendering given list type
    FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
      commit('SET_ACTIVE_TYPE', { type })
      return fetchIdsByType(type)
        .then(ids => commit('SET_LIST', { type, ids }))
        .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
    },

    // ensure all active items are fetched
    ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
      return dispatch('FETCH_ITEMS', {
        ids: getters.activeIds
      })
    },

    SAVE_POST: ({commit, state, dispatch}, {}) => {
      return savePost(state.post, state.post._id)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            dispatch('FETCH_LIST_POST', {})
            return commit('SET_POST', response.data.result)
          }
        })
    },

    FETCH_ITEMS: ({ commit, state }, { ids }) => {
      // on the client, the store itself serves as a cache.
      // only fetch items that we do not already have, or has expired (3 minutes)
      const now = Date.now()
      ids = ids.filter(id => {
        const item = state.items[id]
        if (!item) {
          return true
        }
        if (now - item.__lastUpdated > 1000 * 60 * 3) {
          return true
        }
        return false
      })
      if (ids.length) {
        return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
      } else {
        return Promise.resolve()
      }
    },

    FETCH_USER: ({ commit, state }, { id }) => {
      return state.users[id]
        ? Promise.resolve(state.users[id])
        : fetchUser(id).then(user => commit('SET_USER', { user }))
    },

    RESET_POST: ({ commit }) => {
      return commit('RESET_POST')
    }
  },

  mutations: {
    HAS_VISITED: (state) => {
      state.hasVisited = true
    },
    USER_LOGIN: (state, { user }) => {
      state.user = user
      state.isLogin = true
    },

    USER_LOGOUT: (state) => {
      state.user = null
      state.isLogin = false
    },

    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type
    },

    SET_POSTS : (state , { list, page, count }) => {
      state.posts.page = page
      state.posts.total = count
      state.posts.list = list
    },

    SET_AUTH : (state, isAuth) => {
      state.isAuthorized = isAuth
    },

    SET_POST : (state, post) => {
      state.post = Object.assign(state.post, post)
    },

    RESET_POST : (state) => {
      state.post = createInitialPost()
    },

    SET_LIST: (state, { type, ids }) => {
      state.lists[type] = ids
    },

    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    },

    SET_USER: (state, { user }) => {
      Vue.set(state.users, user.id, user)
    }
  },

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds (state) {
      const { activeType, itemsPerPage, lists } = state
      const page = Number(state.route.params.page) || 1
      if (activeType) {
        const start = (page - 1) * itemsPerPage
        const end = page * itemsPerPage
        return lists[activeType].slice(start, end)
      } else {
        return []
      }
    },

    activePost (state) {
      return state.post
    },

    activePosts (state) {
      return state.posts.list
    },

    totalPosts (state) {
      return state.posts.total
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems (state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    },

    isUserVisited (state) {
      return state.hasVisited
    },

    isUserLogin (state) {
      return state.isLogin
    },

    isAuthorized (state) {
      return state.isAuthorized
    },

    activeUserId (state) {
      return state.user._id
    }
  }
})

export default store

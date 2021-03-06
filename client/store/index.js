import Vue from 'vue'
import Vuex from 'vuex'
import deepExtend from 'deep-extend'

import {
  fetchItems,
  fetchIdsByType,
  fetchUser,
  userLogout,
  fetchPostList,
  fetchPost,
  savePost,
  deletePost,
  changeTheme,
  uploadImage,
} from './api'

import STATUS from 'config/constants/STATUS.js'

Vue.use(Vuex)

const createInitialPost = () => {
  return {
    type: null,
    name: null,
    description_s: null,
    rating: null,
    thumb: {
      theme: null,
      original: {},
      current: {}
    },
    meta: {
      nose: {
        type: [],
        strong: null
      },
      taste: {
        type: [],
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
    previewImageUrl: null,
    header: {
      rightClicked: false,
      leftClicked: false,
      left: null,
      center: null,
      right: null,
      overlap: false,
    },
    status: {
      image: '',
      post: '',
      theme: '',
      fetch: ''
    },
    post: createInitialPost(),
    cachePost: createInitialPost(),
    posts: {
      query : '',
      total : 0,
      page: 1,
      list: []
    },
    share_setting: {
      facebook: true,
      line: true
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

    SET_PREVIEW_IMAGE: ({commit}, url) => {
      commit('SET_STATUS', {type: 'theme', status: STATUS.THEME_CHANGING})
      let img = new Image()
      img.onload = () => {
        commit('SET_PREVIEW_IMAGE', url)
        commit('SET_STATUS', {type: 'theme', status: STATUS.THEME_CHANGED})
      }
      img.onerror = () => {
        commit('SET_STATUS', {type: 'theme', status: STATUS.THEME_CHANGE_FAIL})
      }
      img.src = url
    },

    SET_SHARING: ({commit, state}, config) => {
      commit('SET_SHARING', Object.assign({}, state.share_setting, config))
    },

    SET_HEADER: ({commit}, config) => {
      commit('SET_HEADER', config)
    },

    HEADER_LEFT_CLICK: ({commit, state}) => {
      commit('CLICK_HEADER_LEFT')
    },

    HEADER_RIGHT_CLICK: ({commit, state}) => {
      commit('CLICK_HEADER_RIGHT')
    },

    UPLOAD_IMAGE: ({commit, state}, file) => {
      commit('SET_STATUS', {status: STATUS.IMAGE_UPLOADING, type: 'image'})
      return uploadImage(file)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            const { result } = response.data
            commit('SET_STATUS', {status: STATUS.IMAGE_UPLOAD_SUCCESS, type: 'image'})
            return commit('SET_ORIGINAL_URL', result)
          } else {
            commit('SET_STATUS', {status: STATUS.IMAGE_UPLOAD_FAIL, type: 'image'})
          }
        })
        .catch(e => {
          commit('SET_STATUS', {status: STATUS.IMAGE_UPLOAD_FAIL, type: 'image'})
        })
    },

    SELECT_THEME: ({commit, state}, {url, type}) => {
      return changeTheme(url, type)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            const { result } = response.data
            return commit('SET_IMAGE_URL', result)
          }
        })
    },

    LOGOUT: ({ commit }) => {
      return userLogout()
        .then(() => {
          commit('USER_LOGOUT')
          return Promise.resolve()
        })
    },

    SET_CACHED_POST : ({ commit }, post = {}) => {
      commit('SET_CACHED_POST', post)
    },

    AUTHORIZE_USER : ({ commit }, isAuth) => {
      commit('SET_AUTH', isAuth)
    },

    FETCH_LIST_POST: ({commit, dispatch, state}, {query = {}}) => {
      if (process.BROWSER) {
        commit('SET_STATUS', {
          type: 'fetch',
          status: STATUS.FETCHING
        })
      }
      return fetchPostList(query)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            const {result , options, count} = response.data

            commit('SET_STATUS', {
              type: 'fetch',
              status: STATUS.FETCH_SUCCESS
            })
            return commit('SET_POSTS', {
              list : result,
              page : options.page,
              count : count
            })
          } else {
            return commit('SET_STATUS', {
              type: 'fetch',
              status: STATUS.FETCH_FAIL
            })
          }
        })
    },

    FETCH_POST: ({commit, dispatch}, id) => {
      if (process.BROWSER) {
        commit('SET_STATUS', {
          type: 'fetch',
          status: STATUS.FETCHING
        })
      }
      return fetchPost(id)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            return dispatch('RESET_POST').then(() => {
              commit('SET_AUTH', response.data.result.isAuth)
              commit('SET_CACHED_POST', response.data.result.post)
              commit('SET_STATUS', {
                type: 'fetch',
                status: STATUS.FETCH_SUCCESS
              })
              return commit('SET_POST', response.data.result.post)
            })
          }
          commit('SET_STATUS', {
            type: 'fetch',
            status: STATUS.FETCH_FAIL
          })
          throw new Error('cannot fetch post')
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

    REMOVE_POST: ({commit, state, dispatch}, id) => {
      commit('SET_STATUS', {
        type: 'post',
        status: STATUS.POST_DELETING
      })
      return deletePost(id)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            commit('SET_STATUS', {
              type: 'post',
              status: STATUS.POST_DELETED
            })
            return dispatch('FETCH_LIST_POST', {})
          }

          return commit('SET_STATUS', {
            type: 'post',
            status: STATUS.POST_DELETE_FAIL
          })
        })
    },

    SAVE_POST: ({commit, state, dispatch}, {}) => {
      commit('SET_STATUS', {
        type: 'post',
        status: STATUS.POST_SAVING
      })
      return savePost(state.cachePost, state.post._id)
        .then(response => {
          if (response.status === 200 && response.data.status === 200) {
            return dispatch('RESET_POST').then(() => {
              commit('SET_CACHED_POST', response.data.result)
              commit('SET_POST', response.data.result)
              commit('SET_STATUS', {
                type: 'post',
                status: STATUS.POST_SAVED
              })
              return dispatch('FETCH_LIST_POST', {})
            })
          }

          return commit('SET_STATUS', {
            type: 'post',
            status: STATUS.POST_SAVE_FAIL
          })
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
    SET_STATUS: (state, {status, type}) => {
      state.status[type] = status
    },
    HAS_VISITED: (state) => {
      state.hasVisited = true
    },
    USER_LOGIN: (state, { user }) => {
      state.user = user
      state.isLogin = true
    },

    POST_DELETE_SUCCESS: (state) => {

    },

    CLICK_HEADER_LEFT: (state) => {
      state.header.leftClicked = !state.header.leftClicked
    },

    CLICK_HEADER_RIGHT: (state) => {
      state.header.rightClicked = !state.header.rightClicked
    },

    SET_SHARING: (state, {facebook, line}) => {
      state.share_setting.facebook = facebook
      state.share_setting.line = line
    },

    SET_HEADER: (state, {center = '', left = null, right = null, overlap = false}) => {
      state.header.left = left
      state.header.center = center
      state.header.right = right
      state.header.overlap = overlap
    },

    USER_LOGOUT: (state) => {
      state.user = null
      state.isLogin = false
    },

    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type
    },

    SET_PREVIEW_IMAGE: (state, url) => {
      state.previewImageUrl = url
    },

    SET_ORIGINAL_URL : (state, data) => {
      state.cachePost.thumb.original = data
      state.cachePost.thumb.current = data
      state.previewImageUrl = data.secure_url
    },

    SET_IMAGE_URL : (state, url) => {
      state.cachePost.thumb.current = data
      state.previewImageUrl = data.secure_url
    },

    SET_POSTS : (state , { list, page, count }) => {
      state.posts.page = page
      state.posts.total = count
      state.posts.list = list
    },

    SET_AUTH : (state, isAuth) => {
      state.isAuthorized = isAuth
    },

    SET_CACHED_POST : (state, post) => {
      deepExtend(state.cachePost, post)
      if (post.thumb && post.thumb.current && post.thumb.current.secure_url) {
        state.previewImageUrl = post.thumb.current.secure_url
      }
    },

    SET_POST : (state, post) => {
      state.post = post
      if (post.author === state.user._id) {
        state.isAuthorized = true
      }
    },

    RESET_POST : (state) => {
      state.post = createInitialPost()
      state.cachePost = createInitialPost()
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
    currentThemeStatus(state) {
      return state.status.theme
    },
    currentImageStatus(state) {
      return state.status.image
    },
    currentPostStatus(state) {
      return state.status.post
    },
    currentFetchStatus(state) {
      return state.status.fetch
    },
    headerLeftClick (state) {
      return state.header.leftClicked
    },

    headerRightClick (state) {
      return state.header.rightClicked
    },

    activeHeaderOverlap (state) {
      return state.header.overlap
    },

    activeHeaderTitle (state) {
      return state.header.center || ''
    },

    activeHeaderLeft (state) {
      return state.header.left
    },

    activeHeaderRight (state) {
      return state.header.right
    },

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

    currentPreviewImage (state) {
      return state.previewImageUrl
    },

    cachedPost (state) {
      return state.cachePost
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

    activeSharing (state) {
      return state.share_setting
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

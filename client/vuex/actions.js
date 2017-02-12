import deepExtend from 'deep-extend'
import STATUS from 'config/constants/STATUS.js'

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

export default {
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
}

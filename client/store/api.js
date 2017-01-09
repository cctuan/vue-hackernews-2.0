// this is aliased in webpack config based on server/client build
// import api from 'create-api'
import axios from 'axios'
if (typeof window === 'undefined') {
  axios.defaults.baseURL = 'http://localhost:5000'
}

// warm the front page cache every 15 min
// make sure to do this only once across all requests
/**
if (api.onServer && !api.warmCacheStarted) {
  api.warmCacheStarted = true
  warmCache()
}
**/
function warmCache () {
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

function fetch (child) {
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType (type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}

export function watchList (type, cb) {
  let first = true
  const ref = api.child(`${type}stories`)
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}

export function savePost(data, id = null) {
  if (id) {
    return axios.post(`/api/post/${id}`, data)
  } else {
    return axios.post(`/api/post`, data)
  }
}

export function fetchPost(id) {
  return axios.get(`/api/post/${id}`)
}

export function uploadImage(image) {
  const data = new FormData()
  data.append('file', image)
  return axios.post(`/api/image`, data)
}


export function changeTheme(url, type) {
  return axios.post(`/api/upload/theme`, {
    url: url,
    type: type
  })
}

export function fetchPostList(query) {
  const queryArray = Object.keys(query).map(key => {
    let val = query[key]
    return `${key}=${val}`
  })
  return axios.get('/api/posts' +
    (queryArray.length > 0 ? ('?' + queryArray.join('&')) : ''))
}

export function userLogout() {
  return axios.get('/auth/logout')
}

export function userHasAuthorizedEdit({postId}) {
  return axios.post('/api/post/auth', {postId})
    .then(response => {
      if (response.status === 200 && response.data.status === 200) {
        return {
          isAuth: response.data.isAuth,
          post: response.data.post
        }
      } else {
        return false
      }
    })
}

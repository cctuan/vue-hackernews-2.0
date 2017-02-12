
import deepExtend from 'deep-extend'
import STATUS from 'config/constants/STATUS.js'

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

const state = {
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
}

const mutations = {
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
  }
}

export default{
  state,
  mutations
}

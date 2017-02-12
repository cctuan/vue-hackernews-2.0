
export default {
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

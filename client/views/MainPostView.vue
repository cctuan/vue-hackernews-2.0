<template>
  <div class="post-view">
    <linear-progress v-show="isLoading" />
    <keep-alive>
      <router-view :post="post" />
    </keep-alive>
  </div>
</template>

<script>
import LinearProgress from 'components/LinearProgress.vue'
import {
  isValidMongoId
} from '../utility'
import STATUS from 'config/constants/STATUS.js'
const PathRegex = new RegExp('^/post', 'i')

function fetchItem (store) {
  if (isValidMongoId(store.state.route.params.id)) {
    return store.dispatch('FETCH_POST', store.state.route.params.id)
  }

  return store.dispatch('RESET_POST')
}

export default {
  name: 'main-post-view',
  components: {LinearProgress},
  metaInfo() {
    let meta = [
      {property: 'og:url', content: process.URL + '/post/' + this.post._id + '/view'},
      {property: 'og:title', content: this.post.name},
      {property: 'og:description', content: this.post.description_s}
    ]
    if (this.post.thumb && this.post.thumb.current) {
      meta.push({property: 'og:image', content: this.post.thumb.current.secure_url},
        {property: 'og:image:secure_url', content: this.post.thumb.current.secure_url},
        {property: 'og:image:width', content: '600'},
        {property: 'og:image:height', content: '325'}
      )
    }
    return {
      title: this.post.name,
      meta: meta
    }
  },
  computed: {
    test(){
      return 'test'
    },
    isLoading(){
      return this.$store.getters.currentFetchStatus === STATUS.FETCHING
    },
    post () {
      return this.$store.getters.activePost
    },
    route () {
      return this.$store.state.route
    }
  },

  preFetch: fetchItem,
  beforeMount () {
    fetchItem(this.$store)
  },
  watch : {
    // TODO: should save request while switch to save post
    route (newValRoute, oldValRoute) {
      if (!PathRegex.test(newValRoute.path)) {
        return
      }
      if (newValRoute.params.id && newValRoute.params.id === oldValRoute.params.id) {
        return
      }
      if (newValRoute.params.id) {
        fetchItem(this.$store)
      } else {
        this.$store.dispatch('RESET_POST')
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
</style>

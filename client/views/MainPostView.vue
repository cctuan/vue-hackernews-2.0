<template>
  <div class="post-view">
    <keep-alive>
      <router-view :post="post" />
    </keep-alive>
  </div>
</template>

<script>
import {
  isValidMongoId
} from '../utility'

const PathRegex = new RegExp('^/post', 'i')

function fetchItem (store) {
  if (isValidMongoId(store.state.route.params.id)) {
    return store.dispatch('FETCH_POST', store.state.route.params.id)
  }

  return store.dispatch('RESET_POST')
}

export default {
  name: 'main-post-view',
  components: {},
  computed: {
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

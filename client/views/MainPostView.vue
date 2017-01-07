<template>
  <div class="post-view">
    <router-view :post="post"/>
  </div>
</template>

<script>
import {
  isValidMongoId
} from '../utility'
function fetchItem (store) {
  if (isValidMongoId(store.state.route.params.id)) {
    return store.dispatch('FETCH_POST', store.state.route.params.id)
  }
  return Promise.resolve()
}

export default {
  name: 'post-main-view',
  components: {},
  computed: {
    post () {
      return this.$store.getters.activePost
    }
  },

  preFetch: fetchItem,
  beforeMount () {
    fetchItem(this.$store)
  },
  updated() {
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
</style>

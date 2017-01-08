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
    },
    route_params () {
      return this.$store.state.route.params
    }
  },

  preFetch: fetchItem,
  beforeMount () {
    fetchItem(this.$store)
  },
  watch : {
    // TODO: should save request while switch to save post
    route_params (newVal, oldVal) {
      if (newVal.id === oldVal.id) {
        return
      }
      if (newVal.id) {
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

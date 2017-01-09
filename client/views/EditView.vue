
<template>
  <div class="post-view">
    <div class="edit-view">
      <div class="view-inner">
        <router-view :post="post" v-on:change="postUpdate" />
      </div>
    </div>
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
  name: 'edit-main-view',
  components: {},
  computed: {
    post () {
      console.log(this.$store.getters.cachedPost, 'this.$store.getters.cachedPost')
      return this.$store.getters.cachedPost
    },
    route () {
      return this.$store.state.route
    }
  },

  preFetch: fetchItem,
  beforeMount () {
    fetchItem(this.$store)
  },
  methods: {
    postUpdate(newPost) {
      this.$store.dispatch('SET_CACHED_POST', newPost)
    }
  },
  watch : {
    // TODO: should save request while switch to save post
    route (newValRoute, oldValRoute) {
      if (newValRoute.params.id === 'new') {
        this.$store.dispatch('RESET_POST')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.rating-field
  text-align center
.edit-section
  height 100px
.content-inner
  padding 10px
.chip-flat
  width 20%
  float left
  height 20px
  padding 5px 10px
.preview-btn
  width 100%
.drink-type-item
  float left
  padding 0 10px 0 10px
  div
    border-width: 1px;
    border-style: solid;
  .selected
    background-color: rgba(158,158,158,.2)
</style>

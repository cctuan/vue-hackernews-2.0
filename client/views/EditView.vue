
<template>
  <div class="edit-view">
    <div class="view-inner" :name="routeName">
      <keep-alive>
        <router-view :post="post" v-on:change="postUpdate"
          v-on:cancel="showModal=true"/>
      </keep-alive>
      <cancel-edit-dialog :showModal="showModal" v-on:close="showModal = false"/>
    </div>
  </div>
</template>

<script>
import {
  isValidMongoId
} from '../utility'
import ROUTES from 'config/constants/ROUTES'
import CancelEditDialog from 'components/CancelEditDialog.vue'

const PathRegex = new RegExp('^/post', 'i')

function fetchItem (store) {
  if (isValidMongoId(store.state.route.params.id)) {
    return store.dispatch('FETCH_POST', store.state.route.params.id)
  }
  return store.dispatch('RESET_POST')
}

export default {
  name: 'edit-main-view',
  components: {CancelEditDialog},
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    routeName() {
      return this.$store.state.route.name
    },
    post () {
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
      if (!newPost.createdAt || !newPost.updatedAt) {
        newPost.updatedAt = newPost.createdAt = new Date().toISOString()
      }
      this.$store.dispatch('SET_CACHED_POST', newPost)
    }
  },
  watch : {
    '$route'() {
      this.showModal = false
    },
    // TODO: should save request while switch to save post
    route (newValRoute, oldValRoute) {
      if (oldValRoute.name === 'list-view') {
        this.$store.dispatch('RESET_POST')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.edit-view
  width 100%
  height 100%
  flex none
.rating-field
  text-align center
.edit-dialog
  .headline
    color #000000
  .body
    margin-top 15px
    color rgba(0, 0, 0, 0.5)
  .btn-container
    text-align right
    margin-top 24px
    .continue-btn, a
      display inline-block
    .continue-btn, .cancel-btn
      cursor pointer
      padding 10px
    .cancel-btn
      color #7ad0e2
</style>

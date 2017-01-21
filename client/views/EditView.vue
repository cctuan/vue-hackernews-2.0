
<template>
  <div class="post-view" :name="routeName">
    <div class="edit-view">
      <div class="view-inner" :name="routeName">
        <router-view :post="post" v-on:change="postUpdate"
          :name="routeName" v-on:cancel="showModal=true"/>
        <modal v-if="showModal" @close="showModal = false">
          <div slot="body" class="edit-dialog">
            <div class="headline">
              取消編輯
            </div>
            <div class="body">
              您的筆記尚未編輯完成，確定要捨棄此份筆記？
            </div>
            <div class="btn-container">
              <div class="continue-btn" @click="showModal=false">
                繼續編輯
              </div>
              <router-link to="/">
                <div class="cancel-btn">
                  確定捨棄
                </div>
              </router-link>
            </div>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isValidMongoId
} from '../utility'
import ROUTES from '../../config/constants/ROUTES'
import Modal from '../components/Modal.vue'

const PathRegex = new RegExp('^/post', 'i')

function fetchItem (store) {
  if (isValidMongoId(store.state.route.params.id)) {
    return store.dispatch('FETCH_POST', store.state.route.params.id)
  }
  return store.dispatch('RESET_POST')
}

export default {
  name: 'edit-main-view',
  components: {Modal},
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    routeName() {
      console.log('this.$store.state.route.name', this.$store.state.route.name)
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

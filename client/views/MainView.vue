<template>
  <div class="main-view">
    <search-input v-if="hasPost" v-on:change="inputValueChange"></search-input>
    <post-item v-if="hasPost" :post="post" v-for="post in posts"></post-item>
    <div v-if="!hasPost" class="no-post-section">
      <div class="main-page-icon">
        <i class="material-icons">mood</i>
      </div>
      <div class="sub-header">目前還沒有任何筆記喔</div>
      <p class="body">立即撰寫品酒筆記，記錄並分享您每日品酒的細節與點滴</p>
      <button @click="showModal=true" class="common-color main-func-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
        開始新的筆記
      </button>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <div slot="body" class="edit-dialog">
        <div class="header">
          <i class="material-icons">border_color</i>
        </div>
        <div class="sub-header">
          選擇適合您的筆記方式
        </div>
        <p class="body">
          品酒筆記分為完整與快速筆記，完整筆記可記錄酒的外觀，氣味與味覺
        </p>
        <router-link to="/edit">
          <button class="quick-edit common-color main-func-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            快速筆記
          </button>
        </router-link>
        <router-link to="/edit">
          <button class="detail-edit common-color main-func-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            完整筆記
          </button>
        </router-link>
      </div>
    </modal>
  </div>
</template>

<script>

import SearchInput from '../components/SearchInput.vue'
import Modal from '../components/Modal.vue'
import PostItem from '../components/PostItem.vue'
import ROUTES from '../../config/constants/ROUTES'

function fetchItems (store, query = {}) {
  return store.dispatch('FETCH_LIST_POST', query)
}

export default {
  name: 'main-view',
  components: { SearchInput, PostItem, Modal },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    posts () {
      return this.$store.getters.activePosts
    },
    hasPost() {
      return this.$store.getters.totalPosts > 0
    },
    leftHeaderClick() {
      return this.$store.getters.headerLeftClick
    },
    rightHeaderClick() {
      return this.$store.getters.headerRightClick
    }
  },
  preFetch: fetchItems,
  watch: {
    '$route'() {
      this.showModal = false
    },
    rightHeaderClick() {
      if (this.$store.state.route.name !== 'list-view') {
        return
      }
      this.showModal = true
      // this.$router.push({ name: ROUTES.QUICK_EDIT })
    }
  },
  beforeMount () {
    fetchItems(this.$store)
  },
  mounted () {
  },
  updated() {
    this.$el.querySelectorAll('._lazy').forEach(item => {
      let img = document.createElement('img')
      img.onload = () => {
        item.style.backgroundImage = `url(${img.src})`
        item.classList.remove('_lazy')
      }
      img.onerror = () => {
        item.classList.remove('_lazy')
      }
      img.src = item.getAttribute('data-image')
    })
  },
  methods: {
    inputValueChange(newValue) {
      setTimeout(() => {
        let query = {}
        if (newValue) {
          query.q = newValue
        }
        fetchItems(this.$store, {
          query: query
        })
      }, 500)
    }
  }
}
</script>
<style lang="stylus" scoped>
.no-post-section
  text-align center
  padding 0 50px
  .new-edit-btn
    width 100%
    background-color #7dd0e0
  button
    background-color #7ad0e2
    margin-top 30px
.main-page-icon
  i
    font-size 70px
    margin-top 30%
.sub-header
  margin 30px 0 10px

.main-func-button
  height 50px
  padding 15px 50px
  font-family MicrosoftJhengHei
  font-size 16px
  font-weight bold
  font-style normal
  font-stretch normal
  line-height normal
  letter-spacing normal
  text-align center
  color #ffffff
.edit-dialog
  text-align center
  .header
    i
      font-size 40px
  .sub-header
    color black
    margin-top 15px
  .body
    color rgba(0,0,0,0.5)
  button
    width 100%
    &.quick-edit
      background-color #e0e0e0
      margin-bottom 15px
    &.detail-edit
      background-color #7ad0e2
</style>

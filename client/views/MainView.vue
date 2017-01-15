<template>
  <div class="main-view">
    <search-input v-if="hasPost" v-on:change="inputValueChange"></search-input>
    <post-item v-if="hasPost" :post="post" v-for="post in posts"></post-item>
    <div v-if="!hasPost" class="no-post-section">
      <h5>目前還沒有任何筆記喔</h5>
      <p>立即撰寫品酒筆記，記錄並分享您每日品酒的細節與點滴</p>
      <router-link to="/edit">
        <button class="new-edit-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          開始新的筆記
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>

import SearchInput from '../components/SearchInput.vue'
import PostItem from '../components/PostItem.vue'
import ROUTES from '../../config/constants/ROUTES'

function fetchItems (store, query = {}) {
  return store.dispatch('FETCH_LIST_POST', query)
}

export default {
  name: 'main-view',
  components: { SearchInput, PostItem },
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
    rightHeaderClick() {
      if (this.$store.state.route.name !== 'list-view') {
        return
      }
      this.$router.push({ name: ROUTES.QUICK_EDIT })
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
</style>

<template>
  <div class="main-view">
    <search-input v-if="hasPost" v-on:change="inputValueChange"></search-input>
    <post-item v-if="hasPost" :post="post" v-for="post in posts"></post-item>
    <div v-if="!hasPost">
      <h3>目前還沒有任何筆記喔</h3>
      <router-link to="/"><button>開始新的筆記</button></router-link>
    </div>
  </div>
</template>

<script>

import SearchInput from '../components/SearchInput.vue'
import PostItem from '../components/PostItem.vue'

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
      this.$router.push('edit/new')
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
</style>

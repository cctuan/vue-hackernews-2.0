<template>
  <div class="edit-view">
    <div class="view-inner">
      <image-editor :url="post.thumb ? post.thumb.url : ''" v-on:change="imageChange"/>
      <div class="rating-field">
        <p>按一下星星來評分</p>
        <rating-star uid="quick" :items="rating_map" legend="Default star rating:" :value="rating" @change="updateRate"></rating-star>
      </div>
      <div class="content">
        <div class="content-inner">
          <div class="edit-section">
            <div class="edit-title">
              酒種
            </div>
            <div class="chip-list">
              <div class="chip-flat"><p>紅葡萄酒</p></div>
              <div class="chip-flat"><p>紅葡萄酒</p></div>
              <div class="chip-flat"><p>紅葡萄酒</p></div>
              <div class="chip-flat"><p>紅葡萄酒</p></div>
            </div>
          </div>
          <div class="bar"></div>
          <div class="edit-section">
            <div class="edit-title">
              品名
            </div>
            <input class="edit-input" v-model="post.name">
          </div>
          <div class="bar"></div>
          <div class="edit-section">
            <div class="edit-title">
              短評
            </div>
            <input class="edit-input" v-model="post.description_s">
          </div>
          <div class="btn"><button>確認預覽</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RatingStar from '../components/RatingStar.vue'
import ImageEditor from '../components/ImageEditor.vue'

function fetchItem (store) {
  return store.dispatch('FETCH_POST', store.state.route.params.id)
}

export default {
  name: 'edit-view',
  components: {
    RatingStar, ImageEditor
  },
  data() {
    return {
      _post: {},
      rating_map: [
        {
          title: '5 Stars',
          value: 5
        },
        {
          title: '4 Stars',
          value: 4
        },
        {
          title: '3 Stars',
          value: 3
        },
        {
          title: '2 Stars',
          value: 2
        },
        {
          title: '1 Star',
          value: 1
        }
      ]
    }
  },
  computed: {
    rating() {
      return this.post.rating || 3
    },
    isQuickMode() {
      return !!this.$store.state.route.params.id
    },
    post() {
      return this.$store.getters.activePost
    },
  },

  mounted () {
    fetchItem(this.$store)
  },
  watch: {
  },
  methods: {
    imageChange(url) {
      this.post = Object.assign(this.post, {thumb: {url: url}})
    },
    updateRate (val) {
      this.post = Object.assign(this.post, {rating: val})
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
.chip-flat p
  text-align center
  border 2px solid grey
</style>

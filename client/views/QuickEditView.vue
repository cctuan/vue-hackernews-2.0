<template>
  <div>
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
            <div class="drink-type-item" v-for="drink_type in drink_types">
              <div :class="'mdl-button mdl-js-button ' + (post.type === drink_type.val ? 'selected' : '')"
                v-on:click="selectDrinkType(drink_type.val)">
                {{drink_type['en']}}
              </div>
            </div>
          </div>
        </div>
        <div class="bar"></div>
        <div class="edit-section">
          <div class="edit-title">
            品名
          </div>
          <input class="mdl-textfield__input" v-model="post.name">
        </div>
        <div class="bar"></div>
        <div class="edit-section">
          <div class="edit-title">
            短評
          </div>
          <textarea class="mdl-textfield__input" type="text" v-model="post.description_s">
          </textarea>
        </div>
        <div class="btn">
          <router-link :to="previewPath">
            <button class="preview-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">確認預覽</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RatingStar from '../components/RatingStar.vue'
import ImageEditor from '../components/ImageEditor.vue'
import {
  DRINK_TYPE
} from '../../config/constants'
import {
  isValidMongoId
} from '../utility'

export default {
  name: 'quick-edit-view',
  components: {
    RatingStar, ImageEditor
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      drink_types: DRINK_TYPE,
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
      ],
    }
  },
  computed: {
    previewPath() {
      if (this.post._id) {
        return {
          name: 'preview',
          params: {
            id: this.post._id
          }
        }
      } else {
        return {
          name: 'preview'
        }
      }
    },
    rating() {
      return this.post.rating || 3
    },
    leftHeaderClick() {
      return this.$store.getters.headerLeftClick
    },
    rightHeaderClick() {
      return this.$store.getters.headerRightClick
    }
  },
  mounted () {
  },
  watch: {
    leftHeaderClick (newVal) {
      if (this.$store.state.route.name !== 'quick-edit') {
        return
      }
      this.$router.go(-1)
    },
    rightHeaderClick (newVal) {
      console.log('rightHeaderClick', newVal)
    }
  },
  methods: {
    imageChange(url) {
      this.$emit('change', Object.assign(this.post, {
        thumb: {
          url: url,
          original: url
        }
      }))
    },
    updateRate (val) {
      this.$emit('change', Object.assign(this.post, {rating: val}))
    },
    selectDrinkType(val) {
      this.$emit('change', Object.assign(this.post, {type: val}))
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

<template>
  <div>
    <image-editor :url="post.thumb ? post.thumb.url : ''" v-on:change="imageChange"/>
    <div class="rating-field">
      <rating-star uid="quick" :items="rating_map" legend="按一下星星來評分" :value="rating" @change="updateRate"></rating-star>
    </div>
    <div class="content">
      <div class="content-inner">
        <div class="edit-section">
          <div class="edit-title">
            酒種
          </div>
          <div class="chip-list">
            <div class="drink-type-item" v-for="drink_type in drink_types">
              <div :class="'type-item mdl-button mdl-js-button ' + (post.type === drink_type.val ? 'selected' : '')"
                v-on:click="selectDrinkType(drink_type.val)">
                {{drink_type['en']}}
              </div>
            </div>
          </div>
          <div class="clear-both"></div>
        </div>
        <div class="edit-section">
          <div class="edit-title">
            品名
          </div>
          <div class="mdl-textfield">
            <input class="mdl-textfield__input" placeholder="請輸入酒款名稱"
              v-model="post.name" id="brand-name">
            <label class="mdl-textfield__label" for="brand-name"></label>
          </div>
          <div class="edit-title">
            短評
          </div>
          <div class="mdl-textfield">
            <textarea class="mdl-textfield__input"  placeholder="請輸入２０字以內短評"
              v-model="post.description_s" id="description_s" />
            <label class="mdl-textfield__label" for="description_s"></label>
          </div>
        </div>
        <div class="btn-container">
          <a v-on:click="$emit('cancel')">
            <button class="preview-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">取消</button>
          </a>
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
import ROUTES from '../../config/constants/ROUTES'


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
          title: '1 Star',
          value: 1
        },
        {
          title: '2 Stars',
          value: 2
        },
        {
          title: '3 Stars',
          value: 3
        },
        {
          title: '4 Stars',
          value: 4
        },
        {
          title: '5 Stars',
          value: 5
        },
      ],
    }
  },
  computed: {
    previewPath() {
      if (this.post._id) {
        return {
          name: ROUTES.PREVIEW_EDIT,
          params: {
            id: this.post._id
          }
        }
      } else {
        return {
          name: ROUTES.PREVIEW_EDIT
        }
      }
    },
    rating() {
      return this.post.rating || 0
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
      if (this.$store.state.route.name !== ROUTES.QUICK_EDIT) {
        return
      }
      this.$router.go(-1)
    },
    rightHeaderClick (newVal) {
      console.log('rightHeaderClick', newVal)
    }
  },
  methods: {
    imageChange(file) {
      // console.log(url, ' url')
      this.$store.dispatch('UPLOAD_IMAGE', file)
      /**
      this.$emit('change', Object.assign(this.post, {
        thumb: {
          url: url,
          original: url
        }
      }))
      **/
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
.content-inner
  padding 0 16px
.edit-section
  border-top 1px solid rgba(255, 255, 255, 0.12)
  .edit-title
    font-size 14px
    padding 15px 0
  .clear-both
    clear both
    margin-bottom 15px
  .mdl-textfield__input
    border-bottom-color rgba(255, 255, 255, 0.12)
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
.type-item
  color #cbccce
  margin-top 10px
.mdl-textfield
  width 100%
  input, textarea
    border-bottom-color #cbccce
.btn-container
  a
    display inline-block
    width 48%
    button
      font-size 16px
      padding-top 15px
      padding-bottom 15px
      height auto
      line-height normal
      background-color #303943
    &:nth-child(2)
      margin-left 3%
      button
        background-color #7ad0e2
</style>

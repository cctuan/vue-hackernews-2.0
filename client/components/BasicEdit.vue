<template>
  <div class="content">
    <linear-progress v-if="isImageUploading" />
    <image-editor :url="post.thumb.current ? post.thumb.current.secure_url : ''" v-on:change="imageChange"/>
    <div class="rating-field">
      <rating-star uid="quick" :items="rating_map" legend="按一下星星來評分" :value="rating" @change="updateRate"></rating-star>
    </div>
    <div class="content-inner">
      <div class="edit-section">
        <div class="edit-title">
          酒種
        </div>
        <div class="chip-list">
          <div class="chip-item" v-for="drink_type in drink_types">
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
    </div>
  </div>
</template>

<script>
import LinearProgress from './LinearProgress.vue'
import RatingStar from './RatingStar.vue'
import ImageEditor from './ImageEditor.vue'
import DRINK_TYPE from 'config/constants/DRINK_TYPE'
import STATUS from 'config/constants/STATUS.js'

import {
  DRINK_TYPE
} from '../../config/constants'
export default {
  name: 'basic-edit',
  components: {
    LinearProgress, RatingStar, ImageEditor
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
    isImageUploading(){
      return this.$store.getters.currentImageStatus === STATUS.IMAGE_UPLOADING
    },
    rating() {
      return this.post.rating || 0
    },
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    selectDrinkType(val) {
      this.$emit('change', Object.assign(this.post, {type: val}))
    },
    imageChange(file) {
      this.$emit('imageChange', file)
    },
    updateRate (val) {
      this.$emit('change', Object.assign(this.post, {rating: val}))
    },
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
.chip-item
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
</style>

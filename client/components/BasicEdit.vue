<template>
  <div class="content">
    <linear-progress v-if="imageUploading" />
    <image-editor :url="post.thumb.original ? post.thumb.original.secure_url : ''" v-on:change="imageChange"/>
    <div class="rating-field">
      <span class="rating-warning" v-if="warn_rating">{{warn_rating}}</span>
      <rating-star uid="quick" :items="rating_map" legend="按一下星星來評分"
        :value="rating" @change="updateRate"></rating-star>
    </div>
    <div class="content-inner">
      <div class="edit-section">
        <edit-title title="酒種" :warnMsg="warn_type"/>
        <div class="chip-list">
          <div class="chip-item" v-for="drink_type in drink_types">
            <div :class="'type-item mdl-button mdl-js-button ' + (post.type === drink_type.val ? 'selected' : '')"
              v-on:click="selectDrinkType(drink_type.val)">
              {{drink_type['zh']}}
            </div>
          </div>
        </div>
        <div class="clear-both"></div>
      </div>
      <div class="edit-section">
        <edit-title title="品名" :warnMsg="warn_title"/>
        <div class="mdl-textfield">
          <input class="mdl-textfield__input" placeholder="請輸入酒款名稱"
            v-model="post.name" id="brand-name" maxlength="20">
          <label class="mdl-textfield__label" for="brand-name"></label>
        </div>
        <edit-title title="短評" :warnMsg="warn_description_s"/>
        <div class="mdl-textfield">
          <textarea class="mdl-textfield__input"  placeholder="請輸入4０字以內短評"
            v-model="post.description_s" id="description_s" maxlength="40"/>
          <label class="mdl-textfield__label" for="description_s"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinearProgress from './LinearProgress.vue'
import EditTitle from './EditTitle.vue'
import RatingStar from './RatingStar.vue'
import ImageEditor from './ImageEditor.vue'
import DRINK_TYPE from 'config/constants/DRINK_TYPE'
import STATUS from 'config/constants/STATUS.js'
import * as types from 'config/constants/MISSING_FORM_TYPE'

export default {
  name: 'basic-edit',
  components: {
    LinearProgress, RatingStar, ImageEditor, EditTitle
  },
  props: {
    post: {
      default: {},
      type: Object
    },
    imageUploading : {
      default : false,
      type : Boolean
    },
    warnMsg: {
      default : {},
      type : Object
    }
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
    rating() {
      return this.post.rating || 0
    },

    warn_title(){
      return this.warnMsg[types.MISSING_NAME] ?
        '不可空白' : ''
    },
    warn_rating(){
      return this.warnMsg[types.MISSING_RATING] ?
        '請評分' : ''
    },
    warn_description_s(){
      return this.warnMsg[types.MISSING_DES_S] ?
        '不可空白' : ''
    },
    warn_type(){
      return this.warnMsg[types.MISSING_TYPE] ?
        '請選擇' : ''
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
  .rating-warning
    color red
.content-inner
  padding 0 16px
.edit-section
  border-top 1px solid rgba(255, 255, 255, 0.12)
  .edit-title
    color white
    font-size 14px
    padding 15px 0
  .clear-both
    clear both
    margin-bottom 15px
  .mdl-textfield__input
    color grey
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

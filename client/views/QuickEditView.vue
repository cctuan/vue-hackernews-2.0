<template>
  <div>
    <basic-edit :post="post" v-on:change="postChange"
      v-on:imageChange="imageChange" :imageUploading="imageUploading"
      :warn="warn"/>
    <div class="btn-container">
      <a v-on:click="$emit('cancel')">
        <button class="preview-btn mdl-button mdl-js-button">取消</button>
      </a>
      <a v-on:click="goToPreview">
        <button class="preview-btn mdl-button mdl-js-button">確認預覽</button>
      </a>
    </div>
  </div>
</template>

<script>
import BasicEdit from 'components/BasicEdit.vue'
import deepExtend from 'deep-extend'
import DRINK_TYPE from 'config/constants/DRINK_TYPE'
import STATUS from 'config/constants/STATUS.js'

import ROUTES from '../../config/constants/ROUTES'
import {
  quickPostVerify
} from './../plugins/verifier'

export default {
  name: 'quick-edit-view',
  components: {
    BasicEdit
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      warn : {},
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
    imageUploading(){
      return this.$store.getters.currentImageStatus === STATUS.IMAGE_UPLOADING
    },
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
      this.$emit('cancel')
    },
    rightHeaderClick (newVal) {
      if (this.$store.state.route.name !== ROUTES.QUICK_EDIT) {
        return
      }
      this.menuDisplay = !this.menuDisplay
      console.log('rightHeaderClick', newVal)
    }
  },
  methods: {
    goToPreview(){
      const verifiedResult = quickPostVerify(this.post)
      if (verifiedResult.result) {
        this.$router.push(this.previewPath)
      } else {
        this.warn = verifiedResult.type
      }
    },
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
    postChange(val) {
      this.$emit('change', deepExtend(this.post, val))
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
.btn-container
  padding 0 16px
  margin-bottom 15px
  a
    display inline-block
    width 48%
    button
      color white
      width 100%
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

<template>
  <div class="content">
    <div class="content-inner">
      <div class="edit-section">
        <div class="edit-title">
          顏色
        </div>
        <color-chip :post="post" />
      </div>
      <div class="edit-section clarity-section">
        <div class="edit-title">
          澄清度
        </div>
        <div class="circle-list">
          <div :class="'circle-container ' +
            (clarityItem.val === post.meta.clarity ? 'selected' : '')"
            v-for="clarityItem in clarities"
            v-on:click="onClickClarity(clarityItem.val)">
            <div class="circle" :style="'background-color:' + clarityItem.color">
            </div>
            <div class="label">
              {{clarityItem.label}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorChip from './ColorChip.vue'
import CLARITIES from 'config/constants/CLARITY'
import {
  DRINK_TYPE
} from '../../config/constants'
import {
  mergeDeep
} from './../utility'
export default {
  name: 'appearance-edit',
  components: {
    ColorChip
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      clarities: CLARITIES
    }
  },
  computed: {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    onClickColor(val) {
      let _post = Object.create(this.post)
      _post.meta.color = val
      this.$emit('change', _post)
    },
    onClickClarity(val) {
      let _post = Object.create(this.post)
      _post.meta.clarity = val
      this.$emit('change',_post)
    },
    selectDrinkType(val) {
    },
    imageChange(file) {
    },
    updateRate (val) {
    },
  }
}
</script>
<style lang="stylus" scoped>
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
.circle-list
  text-align center
  .circle-container
    cursor pointer
    margin 10px 25px
    width 60px
    display inline-block
    .circle
      position relative
      width 60px
      height 60px
      border-radius 50%
      background-color #b388ff
    .label
      margin-top 15px
      text-align center
      color white
    &.selected
      .label
        color #7ad0e2
      .circle
        &:before
          content ''
          position absolute
          top -7px
          left -7px
          width 70px
          height 70px
          border-radius 50%
          border 2px solid #7ad0e2
.clarity-section
  .circle-container
    .circle
      &:after
        content ''
        position absolute
        top 0
        left 0
        width 60px
        height 30px
        border-radius 60px 60px 0 0
        background-color white
</style>

<template>
  <div class="content">
    <div class="content-inner">
      <div class="edit-section">
        <div class="edit-title">
          顏色
        </div>
        <div class="circle-list">
          <div :class="'circle-container ' +
            (colorItem.val === post.meta.color ? 'selected' : '')"
            v-for="colorItem in colors"
            v-on:click="onClickColor(colorItem.val)">
            <div class="circle" :style="'background-color:' + colorItem.color">
            </div>
            <div class="label">
              {{colorItem.label}}
            </div>
          </div>
        </div>
        <div class="clear-both"></div>
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
import {
  DRINK_TYPE
} from '../../config/constants'
import {
  mergeDeep
} from './../utility'
export default {
  name: 'appearance-edit',
  components: {
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      colors: [
        {color: '#b388ff', label: '粉紅', val: 1},
        {color: '#ff5252', label: '寶石紅', val: 2},
        {color: '#d50000', label: '紅色', val: 3},
        {color: '#b388ff', label: '粉紫', val: 4},
        {color: '#512da8', label: '紫色', val: 5},
        {color: '#311b92', label: '深紫', val: 6},
        {color: '#ff5722', label: '磚紅', val: 7},
        {color: '#7ad0e2', label: '紅褐', val: 8},
        {color: '#4e342e', label: '咖啡', val: 9},
      ],
      clarities: [
        {color: '#cfd8dc', label: '清澈', val: 1},
        {color: '#90a4ae', label: '朦朧', val: 2},
        {color: '#546e7a', label: '混濁', val: 3},
      ]
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

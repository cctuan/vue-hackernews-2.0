<template>
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
    <div class="clear-both"></div>
  </div>
</template>

<script>
import COLORS from './../../config/constants/COLOR'
export default {
  name: 'color-chip',
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
      colors: COLORS
    }
  },
  methods: {
    onClickColor(val) {
      let _post = Object.create(this.post)
      _post.meta.color = val
      this.$emit('change', _post)
    },
  }
}
</script>
<style lang="stylus" scoped>
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
</style>

<template>
  <div :class="[classObject, 'switcher']" v-on:click="onSwitchChange">
    <div class="toggle"></div>
  </div>
</template>

<script>
export default {
  name: 'v-switch',
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    checked: {
      default: true,
      type: Boolean
    }
  },

  mounted () {
  },

  computed: {
    classObject () {
      return {
        on: !!this.checked
      }
    }
  },

  watch: {
    value (val) {
    }
  },

  methods: {
    onSwitchChange(){
      this.$emit('change', !this.checked)
    }
  }
}
</script>

<style lang="stylus" scoped>
.switcher
  position relative
  display inline-block
  color #7ad0e2
  text-shadow 0px 1px 1px rgba(255,255,255,0.8)
  height 16px
  width 35px
  border-radius 7px
  background rgba(255, 255, 255, 0.3)
  cursor pointer
  font-size 14px
  .toggle
    border-radius 50%
    width 20px
    height 20px
    position absolute
    top -2px
    left -2px
    background #f1f1f1
    box-shadow inset 0px 1px 0px 0px rgba(255,255,255,0.5)
    z-index 999
    transition all 0.15s ease-in-out
    color rgba(0, 0, 0, 0.02)
  &.on
    background rgba(122,208,226, 0.5)
    .toggle
      left auto
      right -2px
      background rgba(122,208,226, 1)
</style>

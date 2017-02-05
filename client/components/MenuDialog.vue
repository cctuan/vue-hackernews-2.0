<template>
  <div :class="'menu-dialog ' + (display ? ' is-visible' : '')">
    <div class="menu-container" :style="outlineStyle">
      <ul class="menu-list">
        <template v-for="action in actions">
          <li class="menu-item" v-if="action.disabled" disabled>
            {{action.name}}
          </li>
          <li class="menu-item" v-else v-on:click="onMenuClick(action)">
            {{action.name}}
          </li>
        </template>
        <li class="menu-item" v-on:click="close">
          關閉
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'menu-dialog',
  data () {
    return {
      size: {}
    }
  },
  computed: {
    containerStyle () {
      return Object.assign({}, this.size, this.position)
    },
    outlineStyle () {
      return this.size
    },
    ulStyle() {
      return {
        clip: `rect(0px, ${this.size.width}, ${this.size.height}, 0px)`
      }
    }
  },
  props: {
    actions: {
      type: Array,
      default: () => ([])
    },
    display: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: {
        top: '0px',
        right: '0px'
      }
    }
  },
  mounted () {

  },
  watch: {
    display(val) {
      if (!val) {
        return
      }
      this.$el.focus()
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    onMenuClick (action) {
      this.$emit('select', action)
      this.close()
    }
  }
}
</script>

<style lang="stylus">
.menu-dialog
  position fixed
  right 0
  top 56px
  width 124px
  z-index 999
  display none
  &.is-visible
    display block
  .menu-container
    .menu-list
      list-style none
      position absolute
      top 0
      height auto
      min-width 124px
      padding 8px 0
      margin 0
      padding 0 8px
      background-color white
      .menu-item
        text-align left
        padding 0px 16px
        color black
        cursor pointer
        line-height 48px
        &:hover
          background-color #eee
</style>

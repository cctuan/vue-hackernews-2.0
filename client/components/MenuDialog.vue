<template>
  <div :class="'mdl-menu__container is-upgraded' + (display ? ' is-visible' : '')"
    :style="containerStyle">
    <div class="mdl-menu__outline mdl-menu--top-left" :style="outlineStyle"/>
    <ul class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect"
      data-mdl-for="demo-menu-top-left" :style="ulStyle">
      <template v-for="action in actions">
        <li class="mdl-menu__item" v-if="action.disabled" disabled>
          {{action.name}}
        </li>
        <li class="mdl-menu__item" v-else v-on:click="onMenuClick(action)">
          {{action.name}}
        </li>
      </template>
      <li class="mdl-menu__item" v-on:click="close">
        關閉
      </li>
    </ul>
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
      const ul = this.$el.querySelector('ul')
      const height = ul.getBoundingClientRect().height;
      const width = ul.getBoundingClientRect().width;
      this.size = {
        width: width + 'px',
        height: height + 'px'
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
</style>

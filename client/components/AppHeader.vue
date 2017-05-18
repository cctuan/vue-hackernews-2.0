<template>
  <header class="common-color">
    <div class="mdl-layout__drawer-button" v-if="!!left"
      v-on:click="onLeftClick">
      <icon :name="left" scale="1.5"/>
    </div>
    <div class="mdl-layout__header-row">
      <div class="mdl-layout-spacer">
        <span class="mdl-layout-title">{{title}}</span>
      </div>
      <div v-on:click="onRightClick" class="mdl-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right clickable" v-if="!!right">
        <icon :name="right" scale="1.5"/>
      </div>
    </div>
  </header>
</template>

<script>
import 'vue-awesome/icons/warning'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
  name: 'app-header',
  components : {Icon},
  computed: {
    title() {
      return this.$store.getters.activeHeaderTitle
    },

    left() {//bars
    console.log(this.$store.getters.activeHeaderLeft, 'this.$store.getters.activeHeaderLeft')
      return this.$store.getters.activeHeaderLeft
    },

    right() {//pencil
    console.log(this.$store.getters.activeHeaderRight, 'this.$store.getters.activeHeaderLeft')
      return this.$store.getters.activeHeaderRight
    },

    overlap() {
      return this.$store.getters.activeHeaderOverlap
    }
  },
  methods: {
    onLeftClick() {
      this.$store.dispatch('HEADER_LEFT_CLICK')
    },
    onRightClick() {
      this.$store.dispatch('HEADER_RIGHT_CLICK')
    }
  }
}
</script>

<style lang="stylus" scoped>
header
  position fixed
  top 0
  display flex
  flex-direction column
  flex-wrap nowrap
  justify-content flex-start
  box-sizing border-box
  flex-shrink 0
  width 100%
  margin 0
  padding 0
  border none
  min-height 64px
  z-index 3
  background-color #3f51b5
  color #fff
  box-shadow 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)
  i.icon-button
    color white
.clickable
  cursor pointer
.common-color
  background-color: #7ad0e2
</style>

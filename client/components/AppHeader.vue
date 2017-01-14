<template>
  <header class="mdl-layout__header customized">
    <div class="mdl-layout__drawer-button" v-if="!!left"
      v-on:click="onLeftClick">
      <i class="material-icons back-icon">
        {{left}}
      </i>
    </div>
    <div class="mdl-layout__header-row">
      <div class="mdl-layout-spacer">
        <span class="mdl-layout-title">{{title}}</span>
      </div>
      <div v-on:click="onRightClick" class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right is-upgraded" v-if="!!right">
        <i class="material-icons back-icon">
          {{right}}
        </i>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'app-header',
  computed: {
    title() {
      return this.$store.getters.activeHeaderTitle
    },

    left() {
      return this.$store.getters.activeHeaderLeft
    },

    right() {
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
.customized
  background-color #7dd0e0
</style>

<template>
  <header class="mdl-layout__header">
    <div class="mdl-layout__drawer-button">
      <i class="material-icons back-icon"></i>
    </div>
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Theme Preview</span>
    </div>
  </header>
</template>

<script>

export default {
  name: 'app-header',
}
</script>

<style lang="stylus" scoped>
.back-icon
  background-size 100%
  background-repeat no-repeat
  background-position center
  background-image url(../../public/back.png)
</style>

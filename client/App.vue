<template>
  <div id="app" v-bind:class="{'with-header' : shoudShowHeader}">
    <app-header v-if="shoudShowHeader" />
    <router-view class="view"></router-view>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'app',
  components: { AppHeader },

  computed: {
    shoudShowHeader () {
      return ['/ask', '/main', '/posts', '/post']
        .indexOf(this.$route.path) !== -1
    }
  },
}
</script>
<style lang="stylus">
html
  height 100%
body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  padding-top 0
  color #34495e
  overflow-y scroll
  height 100%

#app
  height 100%

#app.with-header
  margin-top 55px

a
  color #34495e
  text-decoration none

</style>

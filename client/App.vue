<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <app-header v-if="shoudShowHeader" />
    <main class="mdl-layout__content">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </transition>
    </main>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'app',
  components: { AppHeader },
  metaInfo: {
    link: [
    ]
  },
  computed: {
    shoudShowHeader () {
      return ['/ask', '/main', '/posts', '/post']
        .some(path => this.$route.path.indexOf(path) !== -1)
    }
  },
}
</script>
<style lang="css">

</style>

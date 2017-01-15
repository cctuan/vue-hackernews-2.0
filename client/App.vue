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
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, target-densitydpi=medium-dpi'},
    ],
    link: [
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
    ]
  },
  computed: {
    shoudShowHeader () {
      return ['/ask', '/main', '/posts', '/post', '/edit']
        .some(path => this.$route.path.indexOf(path) !== -1)
    }
  },
}
</script>
<style lang="css">
body {
  background-color: #1d242c;
  color: #cbccce;
}

</style>

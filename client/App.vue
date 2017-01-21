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
html, body, #app {
  height: 100%;
}
body {
  background-color: #1d242c;
  color: #cbccce;
}
/* Headline */
.headline {
  font-size: 20px;

}
/* Subheader */
.sub-header {
  font-family: MicrosoftJhengHei;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}

.body {
  font-family: MicrosoftJhengHei;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}

.caption {
  font-family: MicrosoftJhengHei;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: rgba(255, 255, 255, 0.5);
}

.common-color {
  background-color: #7ad0e2
}

.button {
  border-radius: 2px;
  background-color: #7ad0e2;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
}

</style>

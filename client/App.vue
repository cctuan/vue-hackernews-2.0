<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <app-header v-if="shoudShowHeader" />
    <main class="mdl-layout__content">
      <router-view class="view"></router-view>
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
      {property: 'og:site_name', content: '1shot - 一飲'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=Edge'},
    ],
    link: [
      {rel: 'icon', href: '/public/favicon-32x32.png'},
    ],
    style: [
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
<style lang="stylus">
@import "../public/vendor/material-design-lite/material.min.css"
@font-face
  font-family 'Material Icons'
  font-style normal
  font-weight 400
  src url(/public/vendor/material-design-icons/iconfont/MaterialIcons-Regular.eot)
  src local('Material Icons'), local('MaterialIcons-Regular'), url(/public/vendor/material-design-icons/iconfont/MaterialIcons-Regular.woff2) format('woff2'), url(/public/vendor/material-design-icons/iconfont/MaterialIcons-Regular.woff) format('woff'), url(/public/vendor/material-design-icons/iconfont/MaterialIcons-Regular.ttf) format('truetype')

html
body
#app
  height 100%
body
  background-color #1d242c
  color #cbccce
.headline
  font-size 20px
.sub-header
  font-family MicrosoftJhengHei
  font-size 18px
  font-weight normal
  font-style normal
  font-stretch normal
  line-height 1.67
  letter-spacing normal
  text-align center
  color #ffffff
.body
  font-family MicrosoftJhengHei
  font-size 14px
  font-weight normal
  font-style normal
  font-stretch normal
  letter-spacing normal
  text-align center
  color rgba(255, 255, 255, 0.5)
.caption
  font-family MicrosoftJhengHei
  font-size 12px
  font-weight normal
  font-style normal
  font-stretch normal
  line-height normal
  letter-spacing normal
  color rgba(255, 255, 255, 0.5)
.common-color
  background-color #7ad0e2
.button
  border-radius 2px
  background-color #7ad0e2
  box-shadow 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)
  color #ffffff
.material-icons
  font-family 'Material Icons'
  font-weight normal
  font-style normal
  font-size 24px
  display inline-block
  line-height 1
  text-transform none
  letter-spacing normal
  word-wrap normal
  white-space nowrap
  direction ltr
  -webkit-font-smoothing antialiased
  text-rendering optimizeLegibility
  -moz-osx-font-smoothing grayscale
  font-feature-settings 'liga'
</style>

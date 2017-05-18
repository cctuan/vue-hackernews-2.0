<template>
  <div id="app" class="">
    <app-header v-if="shoudShowHeader" />
    <main :class="containerClass" v-infinityScroll="onScrollEnd">
      <router-view class="view" :scrollEnd="scrollEnd"></router-view>
    </main>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'app',
  components: { AppHeader },
  data(){
    return {
      scrollEnd: 0
    }
  },
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
    ],
    script: [
      {src: '/public/scripts/polyfill.js', type: 'text/javascript'}
    ]
  },
  computed: {
    containerClass() {
      return {
        'page-container' : true,
        'with-header' : this.shoudShowHeader
      }
    },
    shoudShowHeader () {
      return ['/ask', '/main', '/posts', '/post', '/edit']
        .some(path => this.$route.path.indexOf(path) !== -1)
    }
  },
  methods: {
    onScrollEnd(){
      this.scrollEnd = Date.now()
    }
  }
}
</script>
<style lang="stylus">
@import "../public/vendor/material-design-lite/material.min.css"
html
body
#app
  position absolute
  width 100%
  height 100%
  left 0
  right 0
main
  z-index 1
.page-container
  display block
  position absolute
  min-height 100%
  height 100%
  width 100%
  &.with-header
    top 64px
body
  background-color #1d242c
  color #cbccce
.header-text
  line-height 48px
  font-size 30px
.sub-header-text
  line-height 40px
  font-size 20px
  padding 15px 0 15px 0
.body-text
  line-height 30px
  font-size 16px
  padding 5px 0 5px 0
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
  font-size 16px
  border-radius 2px
  background-color #7ad0e2
  box-shadow 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)
  color #ffffff
  outline none
  cursor pointer
  border none
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
.link
  color #7ad0e2
.page-view
  display flex
  -webkit-flex-flow row wrap
  flex-flow row wrap
  min-height 100%
  min-width 100%
  height auto
  align-items center
  justify-content center
  .wrapper
    text-align center
    width 80%
    flex none
</style>

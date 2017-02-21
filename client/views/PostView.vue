<template>
  <div class="post-view">
    <div class="page-content">
      <div class="card demo-card-header-pic">
        <div v-lazyimg="post.thumb.current ? post.thumb.current.secure_url : ''" style=""
          valign="bottom" :class="_imageClassObject"></div>
        <post-basic-information :post="post" />
      </div>
      <menu-dialog :actions="menuActions" :display="menuDisplay"
        :position="menuPosition" v-on:close="menuDisplay=false"
        v-on:select="onMenuClick"/>
    </div>
  </div>
</template>

<script>
import MenuDialog from 'components/MenuDialog.vue'
import PostBasicInformation from 'components/PostBasicInformation.vue'
import {
  isValidMongoId
} from '../utility'
import ROUTES from 'config/constants/ROUTES'


const PathRegex = new RegExp('^/post/[0-9a-fA-F]{24}$', 'i')


export default {
  name: 'post-view',
  components: {
    MenuDialog, PostBasicInformation
  },
  data () {
    return {
      menuPosition: {
        top: '0px',
        right: '0px'
      },
      menuDisplay: false,
      lazy: true
    }
  },
  props: {
    post: {}
  },
  computed: {
    menuActions() {
      let menuActions = [{
        name: '首頁',
        type: 'home'
      }]
      if (this.$store.getters.isAuthorized) {
        if (process.BROWSER === true){
          menuActions.push({
            name: '分享至LINE',
            type: 'line-share'
          },{
            name: '分享至FB',
            type: 'fb-share'
          })
        }
        menuActions.push({
          name: '編輯',
          type: 'edit'
        },{
          name: '刪除',
          type: 'delete'
        })
      }
      return menuActions
    },
    _imageClassObject() {
      return {
        'thumb-container': true
      }
    },
    leftHeaderClick() {
      return this.$store.getters.headerLeftClick
    },
    rightHeaderClick() {
      return this.$store.getters.headerRightClick
    }
  },
  updated() {
  },
  mounted() {
  },
  watch: {
    post(newVal, oldVal){
      this.lazy = true
    },
    leftHeaderClick (newVal) {
      console.log(this.$store.state.route, 'post-view')
      if (this.$store.state.route.name !== ROUTES.POST_VIEW) {
        return
      }
      this.$router.go(-1)
    },
    rightHeaderClick (newVal) {
      if (this.$store.state.route.name !== ROUTES.POST_VIEW) {
        return
      }
      this.menuDisplay = !this.menuDisplay
      console.log('rightHeaderClick', newVal)
    }
  },
  methods: {
    onMenuClick(action) {
      switch (action.type) {
        case 'home': {
          this.$router.push({ path: `/` })
          break
        }
        case 'edit': {
          this.$router.push({ path: `/edit/${this.post._id}/detail` })
          break
        }
        case 'delete': {
          this.$store.dispatch('REMOVE_POST', this.post._id).then(() => {
            this.$router.push({ path: `/` })
          }).catch(e => {
          })
        }
        case 'line-share': {
          window.open(`https://lineit.line.me/share/ui?url=
            ${location.origin}/post/${this.post._id}/view/?openExternalBrowser=1`)
          break
        }
        case 'fb-share': {
          const url = `${location.origin}/post/${this.post._id}/view`
          const shareConfig = {
            app_id: process.FACEBOOK_CLIENTID,
            href: url,
            redirect_uri: url
          }
          const shareParam = Object.keys(shareConfig).map(key => {
            return `${key}=${shareConfig[key]}`
          }).join('&')
          window.open(encodeURI(`https://www.facebook.com/dialog/share?${decodeURIComponent(shareParam)}`),
            '_blank', 'toolbar=0,personalbar=0,resizable,scrollbars,status,width=550,height=420,top=' +
              Math.round((screen.height - 450) / 2) + ',left=' +
              Math.round((screen.width - 550) / 2))
          break
        }
      }
    }
  }
}
</script>
<style lang="stylus">
.post-view
  .thumb-container
    padding-bottom 58%
    background-repeat no-repeat
    background-size contain
    background-position center
</style>

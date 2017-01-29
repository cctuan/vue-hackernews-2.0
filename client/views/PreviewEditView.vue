<template>
  <div class="preview-content">
    <div class="mdl-card mdl-shadow--2dp preview-img"
      :style="'background-image:url(' + currentImage + ')'">
    </div>
    <theme-selector :post="post" v-on:change="postUpdate"/>
    <div class="post-form-title">基本資訊</div>
    <post-basic-information :post="post" />
    <div class="post-form-title">分享設定</div>
    <ul class="mdl-list">
      <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          Facebook
        </span>
        <v-switch :checked="$store.getters.activeSharing.facebook"
          v-on:change="onFacebookTrigger"/>
      </li>
      <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          LINE
        </span>
        <v-switch :checked="$store.getters.activeSharing.line"
          v-on:change="onLineTrigger"/>
      </li>
    </ul>
    <div class="btn confirm-send">
      <button v-on:click="onSave" class="preview-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">確認送出</button>
    </div>
    <menu-dialog :actions="menuActions" :display="menuDisplay"
      :position="menuPosition" v-on:close="menuDisplay=false"
      v-on:select="onMenuClick"/>
  </div>
</template>

<script>
import MenuDialog from 'components/MenuDialog.vue'
import RatingStar from 'components/RatingStar.vue'
import PostBasicInformation from 'components/PostBasicInformation.vue'
import ThemeSelector from 'components/ThemeSelector.vue'
import VSwitch from 'components/VSwitch.vue'
import DRINK_TYPE from 'config/constants/DRINK_TYPE'
import ROUTES from 'config/constants/ROUTES'

export default {
  name: 'preview-edit-view',
  components: {
    RatingStar, PostBasicInformation, ThemeSelector, MenuDialog,
    VSwitch
  },
  props: {
    post: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      enable_fb_sharing: true,
      enable_line_sharing: true,
      drink_types: DRINK_TYPE,
      theme_selections : [
        {
          preview: '/public/theme-select.png',
          type: 1
        },
        {
          preview: '/public/theme-select.png',
          type: 2
        },
        {
          preview: '/public/theme-select.png',
          type: 3
        }
      ],
      menuPosition: {
        position: 'fixed',
        top: '56px',
        right: '0px'
      },
      menuDisplay: false,
      menuActions : [{
        name: '首頁',
        type: 'home'
      }],
    }
  },
  computed: {
    currentImage(){
      return this.post.thumb.current ? this.post.thumb.current.secure_url :
        ''
    },
    leftHeaderClick() {
      return this.$store.getters.headerLeftClick
    },
    rightHeaderClick() {
      return this.$store.getters.headerRightClick
    }
  },
  watch: {
    leftHeaderClick (newVal) {
      if (this.$store.state.route.name !== ROUTES.PREVIEW_EDIT) {
        return
      }
      this.$router.go(-1)
    },
    rightHeaderClick (newVal) {
      if (this.$store.state.route.name !== ROUTES.PREVIEW_EDIT) {
        return
      }
      this.menuDisplay = !this.menuDisplay
      console.log('rightHeaderClick', newVal)
    }
  },
  mounted () {
  },
  methods: {
    postUpdate(newPost) {
      if (!newPost.createdAt || !newPost.updatedAt) {
        newPost.updatedAt = newPost.createdAt = new Date().toISOString()
      }
      this.$store.dispatch('SET_CACHED_POST', newPost)
    },
    onSave () {
      this.$store.dispatch('SAVE_POST')
        .then((val) => {
          this.$router.push({ path: `/post/${this.post._id}/view` })
        })
    },
    selectTheme(type) {
      this.$store.dispatch('SELECT_THEME', {
        url: this.post.thumb.original,
        type
      })
    },
    onFacebookTrigger(val){
      this.$store.dispatch('SET_SHARING', {
        facebook: val,
      })
    },
    onLineTrigger(val){
      this.$store.dispatch('SET_SHARING', {
        line: val,
      })
    },
    onMenuClick(action) {
      switch (action.type) {
        case 'home': {
          this.$router.push({ path: `/` })
          break
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.preview-content
  background-color #243241
.rating-field
  text-align center
.preview-img
  width 100%
  height 300px
  background-size contain
  background-repeat no-repeat
  background-position center
.confirm-send
  button
    width 100%
.clear-fix
  clear both
.section-title
  box-sizing border-box
  background-color #1d242c
  color #56585a
  font-size 14px
  font-weight 500
  line-height 24px
  padding-left 20px
  width: 100%;
.mdl-list__item
  color #cbccce
.post-form-title
  font-size 14px
  color rgba(255, 255, 255, 0.5)
  width 100%
  height 20px
  padding 6px 16px
  background-color #11161d
</style>

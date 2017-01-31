<template>
  <div class="preview-content">
    <linear-progress v-if="isLoading" />
    <div class="mdl-card mdl-shadow--2dp preview-img"
      :style="'background-image:url(' + currentImage + ')'">
    </div>
    <theme-selector :post="post"
      v-on:previewChange="previewThemeChange"/>
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
    <processing-dialog :showModal="showProcessingModal" v-on:close="showProcessingModal = false"/>
    <cancel-edit-dialog :showModal="showCancelEditModal" v-on:close="showCancelEditModal = false"/>
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
import STATUS from 'config/constants/STATUS.js'
import LinearProgress from 'components/LinearProgress.vue'
import CancelEditDialog from 'components/CancelEditDialog.vue'
import ProcessingDialog from 'components/ProcessingDialog.vue'
import THEME_CONFIG from 'config/constants/THEME_CONFIG'

export default {
  name: 'preview-edit-view',
  components: {
    RatingStar, PostBasicInformation, ThemeSelector, MenuDialog,
    VSwitch, LinearProgress, CancelEditDialog, ProcessingDialog
  },
  props: {
    post: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      showCancelEditModal: false,
      showProcessingModal: false,
      enable_fb_sharing: true,
      enable_line_sharing: true,
      drink_types: DRINK_TYPE,
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
      return this.$store.getters.currentPreviewImage
    },
    leftHeaderClick() {
      return this.$store.getters.headerLeftClick
    },
    rightHeaderClick() {
      return this.$store.getters.headerRightClick
    },
    isLoading() {
      return this.$store.getters.currentPostStatus === STATUS.POST_SAVING ||
        this.$store.getters.currentThemeStatus === STATUS.THEME_CHANGING
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
    }
  },
  mounted () {
  },
  methods: {
    previewThemeChange({url, type}) {
      if (this.$store.getters.currentThemeStatus === STATUS.THEME_CHANGING) {
        this.showProcessingModal = true
        return
      }
      this.$store.dispatch('SET_PREVIEW_IMAGE', url)
      let _post = Object.assign({}, this.post)
      _post.thumb.theme = {
        type: type
      }
      this.$store.dispatch('SET_CACHED_POST', _post)
    },
    onSave () {
      if (this.isLoading) {
        this.showProcessingModal = true
        return
      }
      this.$store.dispatch('SAVE_POST')
        .then((val) => {
          this.$router.push({ path: `/post/${this.post._id}/view` })
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
          this.showCancelEditModal = true
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
.preview-dialog
  text-align center
  .header
    i
      font-size 40px
  .sub-header
    color black
    margin-top 15px
  button
    width 100%
    &.detail-edit
      background-color #7ad0e2
</style>

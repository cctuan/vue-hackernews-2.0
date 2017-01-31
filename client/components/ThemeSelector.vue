<template>
  <div class="theme-section">
    <div class="edit-title">
      更換照片類型
    </div>
    <span class="reset-button">預設</span>
    <ul class="preview-list">
      <li :class="'theme-item' + (post.thumb.theme ? (post.thumb.theme.type === theme.type ? ' selected' : '') : '')"
        v-on:click="selectTheme(theme.type)"
        v-for="theme in theme_selections"
        :style="`background-image:url(${theme.preview})`">
        <i class="material-icons checked-icon">done</i>
      </li>
    </ul>
    <div class="clear-fix"></div>
  </div>
</template>

<script>
import THEME_CONFIG from 'config/constants/THEME_CONFIG'
import themeTransformer from 'config/themeTransformer'
export default {
  name: 'theme-selector',

  props: {
    post: {
      default: {},
      type: Object
    }
  },
  data () {
    return {
      theme_selections: [
        {
          preview: '/public/theme-select.png',
          type: THEME_CONFIG.THEME1
        },
        {
          preview: '/public/theme-select.png',
          type: THEME_CONFIG.THEME2
        },
        {
          preview: '/public/theme-select.png',
          type: THEME_CONFIG.THEME3
        }
      ]
    }
  },
  computed: {

  },
  mounted () {

  },
  watch: {
  },
  methods: {
    selectTheme(theme) {
      let themeUrl = null
      switch(theme) {
        case THEME_CONFIG.THEME1: {
          themeUrl = themeTransformer.theme1(this.post.thumb.original.public_id +
            '.png', this.post.name, this.post.description_s, this.post.rating)
          break
        }
        case THEME_CONFIG.THEME2: {
          themeUrl = themeTransformer.theme2(this.post.thumb.original.public_id +
            '.png', this.post.name, this.post.description_s, this.post.rating)
          break
        }
      }
      if (themeUrl) {
        this.$emit('previewChange', {
          url: themeUrl,
          type: theme
        })
      }
      //this.$emit('change', _post)
    }
  }
}
</script>

<style lang="stylus" scoped>
.theme-section
  padding 0 16px
  .edit-title
    font-size 14px
    padding 15px 0
  .reset-button
    position absolute
    right 0
    top 0
    margin-right 24px
    color #64a8b7
    cursor pointer
.preview-list
  list-style none
  width 100%
  overflow-x scroll
  white-space nowrap
  padding 0
  margin-top 0
  margin-bottom 15px
.theme-item
  position relative
  background-repeat no-repeat
  background-size contain
  background-position center
  margin-right 10px
  width 33%
  height 100px
  display inline-block
  text-align center
  .checked-icon
    width 20px
    height 20px
    background-color #7ad0e2
    border-radius 50%
    color #1d242c
    font-size 20px
    text-align center
    margin-top 40px
    visibility hidden
  &.selected
    opacity 0.8
    .checked-icon
      visibility visible
.clear-fix
  clear both
</style>

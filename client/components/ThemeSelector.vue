<template>
  <section class="theme-section">
    <h6>
      更換照片類型
    </h6>
    <span class="reset-button">預設</span>
    <ul class="preview-list">
      <li class="theme-item" v-on:click="selectTheme(theme)"
        v-for="theme in theme_selections"
        :style="`background-image:url(${theme.preview})`">
      </li>
    </ul>
    <div class="clear-fix"></div>
  </section>
</template>

<script>

export default {
  name: 'theme-selector',
  data () {
    return {
      theme_selections: [
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
      ]
    }
  },
  props: {
    post: {
      default: {},
      type: Object
    }
  },
  computed: {

  },
  props: {

  },
  mounted () {

  },
  watch: {
  },
  methods: {
    selectTheme(theme) {

    }
  }
}
</script>

<style lang="stylus" scoped>
.theme-section
  h6
    margin 5px 24px
    font-size 14px
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
  margin 0
.theme-item
  background-repeat no-repeat
  background-size cover
  background-position center
  margin-right 10px
  width 33%
  height 100px
  display inline-block  
.clear-fix
  clear both
</style>

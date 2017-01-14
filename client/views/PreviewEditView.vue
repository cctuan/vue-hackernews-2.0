<template>
  <div class="container">
    <div class="mdl-card mdl-shadow--2dp preview-img"
      :style="'background-image:url(' + post.thumb.url + ')'">
    </div>
    <theme-selector :post="post" />
    <post-basic-information :post="post" />
    <div class="section-title">
      分享設定
    </div>
    <ul class="mdl-list">
      <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          Facebook
        </span>
        <span class="mdl-list__item-secondary-action">
          <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-1">
            <input type="checkbox" class="mdl-switch__input" v-model="enable_fb_sharing" />
          </label>
        </span>
      </li>
      <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          LINE
        </span>
        <span class="mdl-list__item-secondary-action">
          <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-1">
            <input type="checkbox" class="mdl-switch__input" v-model="enable_line_sharing" />
          </label>
        </span>
      </li>
    </ul>
    <div class="btn confirm-send">
      <button v-on:click="onSave" class="preview-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">確認送出</button>
    </div>
  </div>
</template>

<script>
import RatingStar from '../components/RatingStar.vue'
import PostBasicInformation from '../components/PostBasicInformation.vue'
import ThemeSelector from '../components/ThemeSelector.vue'

import {
  DRINK_TYPE
} from '../../config/constants'

export default {
  name: 'quick-edit-view',
  components: {
    RatingStar, PostBasicInformation, ThemeSelector
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
      rating_map: [
        {
          title: '5 Stars',
          value: 5
        },
        {
          title: '4 Stars',
          value: 4
        },
        {
          title: '3 Stars',
          value: 3
        },
        {
          title: '2 Stars',
          value: 2
        },
        {
          title: '1 Star',
          value: 1
        }
      ]
    }
  },
  computed: {
    leftHeaderClick() {
      return this.$store.getters.headerLeftClick
    },
    rightHeaderClick() {
      return this.$store.getters.headerRightClick
    }
  },
  watch: {
    leftHeaderClick (newVal) {
      if (this.$store.state.route.name !== 'preview') {
        return
      }
      this.$router.go(-1)
    },
    rightHeaderClick (newVal) {
      if (this.$store.state.route.name !== 'preview') {
        return
      }
      console.log('rightHeaderClick', newVal)
    }
  },
  mounted () {
  },
  methods: {
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
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
</style>

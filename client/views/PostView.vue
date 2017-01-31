<template>
  <div class="post-view">
    <div class="page-content">
      <div class="card demo-card-header-pic">
        <div :data-image="post.thumb.current ? post.thumb.current.secure_url : ''" style=""
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

const lazyloadImgs = ($el, callback) => {
  $el.querySelectorAll('._lazy').forEach(item => {
    let img = document.createElement('img')
    img.onload = () => {
      item.style.backgroundImage = `url(${img.src})`
      callback()
    }
    img.onerror = () => {
      callback()
    }
    img.src = item.getAttribute('data-image')
  })
}

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
        menuActions.push({
          name: '編輯',
          type: 'edit'
        })
        menuActions.push({
          name: '刪除',
          type: 'delete'
        })
      }
      return menuActions
    },
    _imageClassObject() {
      return {
        _lazy: this.lazy,
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
    lazyloadImgs(this.$el, () => {
      this.lazy = false
    })
  },
  mounted() {
    lazyloadImgs(this.$el, () => {
      this.lazy = false
    })
  },
  watch: {
    post(newVal, oldVal){
      this.lazy = true
    },
    leftHeaderClick (newVal) {
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
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.thumb-container
  padding-bottom 58%
  background-repeat no-repeat
  background-size contain
  background-position center
section
  padding 20px
.title
  width 100%
  margin-top 5px
.rating
  float left
  margin 0
  padding 0
  margin-left 20px
  li
    font-size 14px
  label
    font-size 14px
.rating-val
  float left
.update-time
  float left
  margin-left 20px
  color #4f5256
.description_s
  color #cbccce
  width 100%
hr
  height 1px
  border 0
  background-color #323538
.demo-list-item
  width 100%
.setting-item
  border-top 1px solid
  color #4f5256
.setting-item-value
  color #cbccce
</style>

<template>
  <div>
    <basic-edit :post="post" v-on:change="postChange" v-on:imageChange="imageChange" />
    <div class="btn-container">
      <a v-on:click="$emit('cancel')">
        <button class="preview-btn mdl-button mdl-button--raised">取消</button>
      </a>
      <a v-on:click="onClickNextStep">
        <button class="preview-btn mdl-button mdl-button--raised">
          {{bottomLeftBtnText}}
        </button>
      </a>
    </div>
    <div class="tab-list">
      <div class="tab-inner">
        <div :class="'tab' +
          (index <= tabIndex ? (index === tabIndex ? ' selected' : ' in-selected') : '')"
          v-for="(tab, index) in tabList" @click="switchTab(index)">
          <i class="material-icons">{{tab.icon}}</i>
          <div class="action">{{tab.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicEdit from '../components/BasicEdit.vue'
import {
  DRINK_TYPE
} from '../../config/constants'
import {
  isValidMongoId
} from '../utility'
import ROUTES from '../../config/constants/ROUTES'


export default {
  name: 'detail-edit-view',
  components: {
    BasicEdit
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      tabIndex: 1,
      tabList: [
        {
          icon: 'art_track',
          label: '短評'
        },{
          icon: 'local_bar',
          label: '外觀'
        },{
          icon: 'local_florist',
          label: '氣味'
        },{
          icon: 'opacity',
          label: '味覺'
        },{
          icon: 'assignment_turned_in',
          label: '總結'
        }
      ],
      drink_types: DRINK_TYPE,
      rating_map: [
        {
          title: '1 Star',
          value: 1
        },
        {
          title: '2 Stars',
          value: 2
        },
        {
          title: '3 Stars',
          value: 3
        },
        {
          title: '4 Stars',
          value: 4
        },
        {
          title: '5 Stars',
          value: 5
        },
      ],
    }
  },
  computed: {
    previewPath() {
      if (this.post._id) {
        return {
          name: ROUTES.PREVIEW_EDIT,
          params: {
            id: this.post._id
          }
        }
      } else {
        return {
          name: ROUTES.PREVIEW_EDIT
        }
      }
    },
    bottomLeftBtnText() {
      return this.tabIndex === 4 ? '確認預覽' : '下一步'
    },
    leftHeaderClick() {
      return this.$store.getters.headerLeftClick
    },
    rightHeaderClick() {
      return this.$store.getters.headerRightClick
    }
  },
  mounted () {
  },
  watch: {
    leftHeaderClick (newVal) {
      if (this.$store.state.route.name !== ROUTES.DETAIL_EDIT) {
        return
      }
      this.$emit('cancel')
    },
    rightHeaderClick (newVal) {
      console.log('rightHeaderClick', newVal)
    }
  },
  methods: {
    imageChange(file) {
      // console.log(url, ' url')
      this.$store.dispatch('UPLOAD_IMAGE', file)
      /**
      this.$emit('change', Object.assign(this.post, {
        thumb: {
          url: url,
          original: url
        }
      }))
      **/
    },
    postChange(val) {
      this.$emit('change', Object.assign(this.post, val))
    },
    updateRate (val) {
      this.$emit('change', Object.assign(this.post, {rating: val}))
    },
    selectDrinkType(val) {
      this.$emit('change', Object.assign(this.post, {type: val}))
    },
    switchTab(val) {
      this.$store.dispatch('SET_HEADER', {
        center: this.tabList[val].label,
        left: 'arrow_back',
      })
      this.tabIndex = val
    },
    onClickNextStep() {
      if (this.tabIndex !== 4) {
        this.tabIndex++
      } else {

      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.btn-container
  padding 0 16px
  margin-bottom 15px
  a
    display inline-block
    width 48%
    button
      color white
      width 100%
      font-size 16px
      padding-top 15px
      padding-bottom 15px
      height auto
      line-height normal
      background-color #303943
    &:nth-child(2)
      margin-left 3%
      button
        background-color #7ad0e2
.tab-list
  background-color #11161d
  .tab
    &.selected
      background-color #7ad0e2
      color white
      border-bottom 3px solid #7ad0e2
    &.in-selected
      border-bottom 3px solid #7ad0e2
    cursor pointer
    padding 9px 0
    text-align center
    display inline-block
    border-bottom 3px solid #11161d
    width 20%
    i
      font-size 24px
    div
      font-size 10px
</style>

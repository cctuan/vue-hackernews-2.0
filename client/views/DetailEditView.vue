<template>
  <div class="detail-view">
    <div class="edit-wrap">
      <basic-edit v-show="tabIndex == 0" :post="post" v-on:change="postChange"
        v-on:imageChange="imageChange" :imageUploading="imageUploading"
        :warnMsg="warnMsg" />
      <appearance-edit v-show="tabIndex == 1" :post="post" v-on:change="postChange" />
      <nose-edit v-show="tabIndex == 2" :post="post" v-on:change="postChange" />
      <taste-edit v-show="tabIndex == 3" :post="post" v-on:change="postChange" />
      <summary-edit v-show="tabIndex == 4" :post="post" v-on:change="postChange" />
    </div>
    <div class="tool-container">
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
  </div>
</template>

<script>
import BasicEdit from 'components/BasicEdit.vue'
import AppearanceEdit from 'components/AppearanceEdit.vue'
import NoseEdit from 'components/NoseEdit.vue'
import TasteEdit from 'components/TasteEdit.vue'
import SummaryEdit from 'components/SummaryEdit.vue'
import STATUS from 'config/constants/STATUS.js'
import * as types from 'config/constants/MISSING_FORM_TYPE'
import {
  BACK_ICON,
} from 'config/iconKeys'
import deepExtend from 'deep-extend'

import {
  DRINK_TYPE
} from '../../config/constants'
import ROUTES from '../../config/constants/ROUTES'
import {
  quickPostVerify
} from './../plugins/verifier'

export default {
  name: 'detail-edit-view',
  components: {
    BasicEdit, AppearanceEdit, NoseEdit, TasteEdit, SummaryEdit
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      tabIndex: 0,
      warnMsg : {},
      tabList: [
        {
          icon: 'art_track',
          label: '短評',
          warn_list : [
            types.MISSING_PHOTO,
            types.MISSING_RATING,
            types.MISSING_NAME,
            types.MISSING_DES_S,
            types.MISSING_TYPE
          ]
        },{
          icon: 'local_bar',
          label: '外觀',
          warn_list: []
        },{
          icon: 'local_florist',
          label: '氣味',
          warn_list: []
        },{
          icon: 'opacity',
          label: '味覺',
          warn_list: []
        },{
          icon: 'assignment_turned_in',
          label: '總結',
          warn_list: []
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
    imageUploading(){
      return this.$store.getters.currentImageStatus === STATUS.IMAGE_UPLOADING
    },
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
    },
    tabIndex(){
      window.scrollTo(0,0)
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
      this.$emit('change', val)
    },
    switchTab(val) {
      this.$store.dispatch('SET_HEADER', {
        center: this.tabList[val].label,
        left: BACK_ICON,
      })
      this.tabIndex = val
    },
    onClickNextStep() {
      if (this.tabIndex !== 4) {
        this.switchTab(++this.tabIndex)
      } else {
        const verifiedResult = quickPostVerify(this.post)
        if (verifiedResult.result) {
          this.$router.push({ path: `/edit/preview` })
        } else {
          window.alert('您還有未完成的欄位喔')
          this.tabList.some((tab, index) => {
            if (tab.warn_list.some(warnItem => {
              return verifiedResult.type[warnItem]
            })) {
              this.switchTab(index)
              return true
            }
          })
          this.warnMsg = verifiedResult.type

        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.edit-wrap
  padding-bottom 150px
.tool-container
  position fixed
  bottom 0
  width 100%
  background-color #1d242c
  .btn-container
    flex none
    padding 0 16px
    margin-top 15px
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

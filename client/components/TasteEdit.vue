<template>
  <div class="content">
    <div class="content-inner">
      <form-slider :value="_wineBody" min="1" max="3" step="1"
        v-on:change="onWineBodyChange" :values="wineBodys" title="酒體"/>
      <form-slider :value="_tannin" min="1" max="3" step="1"
        v-on:change="onTanninChange" :values="tannins" title="丹寧"/>
      <form-slider :value="_sweetness" min="1" max="3" step="1"
        v-on:change="onSweetnessChange" :values="sweetnesses" title="甜度"/>
      <form-slider :value="_acid" min="1" max="3" step="1"
        v-on:change="onAcidChange" :values="acids" title="酸度"/>
      <taste-nose-form title="味覺類別"
        detailTitle="味覺細項" :values="tastes"
        :val="_currentTasteType" v-on:change="onTasteChange" />
    </div>
  </div>
</template>

<script>
import TASTES from 'config/constants/TASTE_TYPE'
import WINE_BODYS from 'config/constants/WINE_BODY'
import TANNINS from 'config/constants/TANNIN'
import SWEETNESS from 'config/constants/SWEETNESS'
import STRONGS from 'config/constants/STRONGS'
import ACIDS from 'config/constants/ACID'
import TasteNoseForm from './TasteNoseForm.vue'
import FormSlider from './FormSlider.vue'
import {
  DRINK_TYPE
} from '../../config/constants'
import {
  mergeDeep
} from './../utility'
export default {
  name: 'taste-edit',
  components: {
    FormSlider, TasteNoseForm
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      wineBodys: WINE_BODYS,
      tannins: TANNINS,
      sweetnesses: SWEETNESS,
      acids: ACIDS,
      tastes: TASTES
    }
  },
  computed: {
    _acid() {
      return this.post.meta.taste.acid || 1
    },
    _wineBody () {
      return this.post.meta.taste.wine_body || 1
    },
    _tannin () {
      return this.post.meta.taste.tannin || 1
    },
    _strong () {
      return this.post.meta.taste.strong || 1
    },
    _sweetness(){
      return this.post.meta.taste.sweetness || 1
    },
    _currentTasteType() {
      return this.post.meta.taste.type || []
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    onTanninChange(val) {
      this.$emit('change', {
        meta : {
          taste : {
            tannin : val
          }
        }
      })

    },
    onWineBodyChange(val) {
      this.$emit('change', {
        meta : {
          taste : {
            wine_body : val
          }
        }
      })
    },
    onSweetnessChange(val) {
      this.$emit('change', {
        meta : {
          taste : {
            sweetness : val
          }
        }
      })
    },
    onAcidChange(val) {
      this.$emit('change',  {
        meta : {
          taste : {
            acid : val
          }
        }
      })
    },
    onTasteChange(val) {
      let tasteType = JSON.parse(JSON.stringify(this.post.meta.taste.type || []))
      let currentIndex = tasteType.indexOf(val)

      if (currentIndex === -1) {
        tasteType.push(val)
      } else {
        tasteType.splice(currentIndex, 1)
      }
      this.$emit('change', {
        meta : {
          taste : {
            type : tasteType
          }
        }
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
.content-inner
  padding 0 16px
.edit-section
  border-top 1px solid rgba(255, 255, 255, 0.12)
  .edit-title
    font-size 14px
    padding 15px 0
  .clear-both
    clear both
    margin-bottom 15px
.circle-list
  text-align center
  .circle-container
    cursor pointer
    margin 10px 25px
    width 70px
    display inline-block
    .circle
      position relative
      width 60px
      height 60px
      border-radius 50%
      background-color #b388ff
    .label
      margin-top 15px
      text-align center
      color white
    &.selected
      .label
        color #7ad0e2
      .circle
        &:before
          content ''
          position absolute
          top -7px
          left -7px
          width 70px
          height 70px
          border-radius 50%
          border 2px solid #7ad0e2
.clarity-section
  .circle-container
    .circle
      &:after
        content ''
        position absolute
        top 0
        left 0
        width 60px
        height 30px
        border-radius 60px 60px 0 0
        background-color white
</style>

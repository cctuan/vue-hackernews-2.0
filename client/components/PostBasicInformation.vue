<template>
  <div class="post-basic-info">
    <section class="mdl-components__page mdl-grid">
      <div class="post-header">{{name}}</div>
      <div class="post-info">
        <span class="rating-val" v-if="rating">{{rating}}.0</span>
        <ul class="rating" v-if="rating">
          <li v-for="(item, index) in [1,2,3,4,5]" class="label">
            <label>
              <icon :name="(item > rating) ? 'star-o' : 'star'" color="yellow"/>
            </label>
          </li>
        </ul>
        <span class="update-time">{{updatedAt | timeConvert}}</span>
      </div>
      <div class="description_s">{{description_s}}</div>
      <ul class="post-intro-list">
        <li class="post-intro-li"
          v-if="meta && meta.other && meta.other.year">
          <span class="title">
            年份
          </span>
           <span class="value">
             {{meta.other.year}}
           </span>
        </li>
        <li class="post-intro-li"
          v-if="meta && meta.other && meta.other.matury">
          <span class="title">
            成熟度
          </span>
           <span class="value">
             {{meta.other.matury}}
           </span>
        </li>
        <li class="post-intro-li"
          v-if="meta && meta.other && meta.other.price">
          <span class="title">
            價格
          </span>
          <span class="value">
           {{meta.other.price}}
          </span>
        </li>
        <li class="post-intro-li"
          v-if="meta && meta.other && meta.other.price">
          <span class="title">
            外觀
          </span>
          <div class="appearance-container" v-if="_hasAppearance">
            <div class="clarity-container circle" v-if="meta.clarity">
              <div class="chip-clarity" :style="'background-color:' + _clarity.color"></div>
              <div class="label">{{_clarity.label}}</div>
            </div>
            <div class="color-container circle" v-if="meta.color">
              <div class="chip-color" :style="'background-color:' + _color.color"></div>
              <div class="label">{{_color.label}}</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <template v-if="meta && meta.nose">
      <div class="post-form-title" v-if="!!_nose.length">氣味</div>
      <section class="chip-text-section">
        <div class="chip-text" v-for="noseItem in _nose">
          {{noseItem._label}}
        </div>
      </section>
    </template>
    <template v-if="meta && meta.taste">
      <div class="post-form-title" v-if="!!_taste.length">味覺</div>
      <section class="chip-text-section">
        <div class="chip-text" v-for="tasteItem in _taste">
          {{tasteItem._label}}
        </div>
      </section>
    </template>
  </div>
</template>

<script>

import 'vue-awesome/icons/star'
import 'vue-awesome/icons/star-o'
import Icon from 'vue-awesome/components/Icon.vue'
import COLORS from 'config/constants/COLOR'
import CLARITIES from 'config/constants/CLARITY'
import NOSES from 'config/constants/NOSES'
import STRONGS from 'config/constants/STRONGS'
import TASTES from 'config/constants/TASTE_TYPE'
import WINE_BODYS from 'config/constants/WINE_BODY'
import TANNINS from 'config/constants/TANNIN'
import SWEETNESS from 'config/constants/SWEETNESS'
import ACIDS from 'config/constants/ACID'
export default {
  name: 'post-basic-information',
  components: {
    Icon
  },
  data () {
    return {
      clarities: CLARITIES,
      colors: COLORS,
      noses: NOSES,
      strongs: STRONGS,
      wineBodys: WINE_BODYS,
      tannins: TANNINS,
      sweetnesses: SWEETNESS,
      acids: ACIDS,
      tastes: TASTES,
      tastePostLabel: '味',
      strongLabel: '強度',
      nosePostLabel: '香',
      wineBodyLabel: '強度',
      tanninLabel: '單寧',
      acidLabel: '酸味',
      sweetnessLabel: '甜度'
    }
  },
  props: {
    name : {
      type : String,
      default : ''
    },
    updatedAt : {
      type : Number,
    },
    rating : {
      type : [Number, String],
    },
    description_s : {
      type : String,
      default : ''
    },
    meta : {
      type : Object,
    },
  },
  computed: {
    _hasAppearance() {
      return this.meta.color || this.meta.clarity
    },
    _color() {
      return this.colors.find(color => {
        return color.val === this.meta.color
      })
    },
    _clarity() {
      return this.clarities.find(clarity => {
        return clarity.val === this.meta.clarity
      })
    },
    _taste() {
      let result = []
      if (this.meta.taste.acid) {
        const acidItem = this.acids.find(acid => {
          return acid.val === this.meta.taste.acid
        })
        if (acidItem){
          acidItem._label = this.acidLabel + acidItem.label
          result.push(acidItem)
        }
      }
      if (this.meta.taste.sweetness) {
        const sweetItem = this.sweetnesses.find(sweet => {
          return sweet.val === this.meta.taste.sweetness
        })
        if (sweetItem){
          sweetItem._label = this.sweetnessLabel + sweetItem.label
          result.push(sweetItem)
        }
      }
      if (this.meta.taste.tannin) {
        const tanninItem = this.tannins.find(tannin => {
          return tannin.val === this.meta.taste.tannin
        })
        if (tanninItem){
          tanninItem._label = this.tanninLabel + tanninItem.label
          result.push(tanninItem)
        }
      }
      if (this.meta.taste.wine_body) {
        const wineBodyItem = this.wineBodys.find(wineBody => {
          return wineBody.val === this.meta.taste.wine_body
        })
        if (wineBodyItem){
          wineBodyItem._label = this.wineBodyLabel + wineBodyItem.label
          result.push(wineBodyItem)
        }
      }
      if (this.meta.taste.type && this.meta.taste.type.length) {
        this.meta.taste.type.forEach(type => {
          let mapValue = this.tastes.find(taste => {
            return taste.types.find(subType => {
              return subType.val === type
            })
          })

          if (mapValue) {
            mapValue._label = mapValue.label_zh + this.tastePostLabel
            result.push(mapValue)
          }
        })
      }
      return result
    },
    _nose() {
      let result = []
      if (this.meta.nose.strong) {
        const strongItem = this.strongs.find(strong => {
          return strong.val === this.meta.nose.strong
        })
        if (strongItem){
          strongItem._label = this.strongLabel + strongItem.label
          result.push(strongItem)
        }
      }
      if (this.meta.nose.type && this.meta.nose.type.length) {
        this.meta.nose.type.forEach(type => {
          let mapValue = this.noses.find(nose => {
            return nose.types.find(subType => {
              return subType.val === type
            })
          })

          if (mapValue) {
            mapValue._label = mapValue.label_zh + this.nosePostLabel
            result.push(mapValue)
          }
        })
      }
      return result
    }
  }
}
</script>
<style lang="stylus">
.post-basic-info
  color #cbccce
  section
    padding 20px
    &.chip-text-section
      padding 7px 20px
  .post-header
    width 100%
    font-size 20px
    margin-top 5px
    margin-bottom 5px
    -webkit-line-clamp 1
    word-wrap break-word
    max-height 32px
    text-align left
    overflow hidden
    line-height 32px
  .post-info
    margin-bottom 10px
    .rating
      float left
      margin 0
      padding 0
      margin-left 20px
      li
        display inline-block
        font-size 14px
      label
        font-size 14px
    .rating-val
      float left
    .update-time
      float left
      margin-left 20px
      color gba(255, 255, 255, 0.5)
  .description_s
    color #fff
    width 100%
    margin-bottom 20px
    -webkit-line-clamp 2
    word-wrap break-word
    max-height 56px
    line-height 20px
    text-align left
    overflow hidden
  .post-intro-list
    width 100%
    list-style none
    margin 0
    padding 0
    .post-intro-li
      border-top 1px solid rgba(255, 255, 255, 0.12)
      width 100%
      padding 15px 0
      .title
        display inline-block
        text-align left
        width 9%
      .value
        display inline-block
        text-align right
        width 90%
  .appearance-container
    margin-top 15px
    .circle
      width 190px
      max-width 49%
      display inline-block
      position relative
      .chip-clarity,
      .chip-color
        display inline-block
        width 40px
        height 40px
        border-radius 50%
      .chip-clarity
        &:after
          content ''
          position absolute
          top 0
          left 0
          width 40px
          height 20px
          border-radius 40px 40px 0 0
          background-color white
      .label
        display inline-block
        position absolute
        line-height 40px
        margin-left 10px
  .post-form-title
    font-size 14px
    color rgba(255, 255, 255, 0.5)
    width 100%
    height 20px
    padding 6px 16px
    background-color #11161d
  .chip-text
    margin 6px 15px 6px 0
    display inline-block
    padding 6px 15px
    border-radius 30px
    background-color #303943
</style>

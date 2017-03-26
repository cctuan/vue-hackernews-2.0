<template>
  <div class="content">
    <div class="content-inner">
      <form-slider :value="_strong" min="1" max="3" step="1"
        v-on:change="onStrongChange" :values="strongs" title="強度"/>
      <taste-nose-form title="smell type"
        detailTitle="detail smell type" :values="noses"
        :val="_currentNose" v-on:change="onNoseChange" />
    </div>
  </div>
</template>

<script>
import TasteNoseForm from './TasteNoseForm.vue'
import FormSlider from './FormSlider.vue'
import NOSES from 'config/constants/NOSES'
import STRONGS from 'config/constants/STRONGS'
import DRINK_TYPE from 'config/constants/DRINK_TYPE'
import {
  mergeDeep
} from './../utility'
export default {
  name: 'nose-edit',
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
      strongs: STRONGS,
      noses: NOSES
    }
  },
  computed: {
    _strong () {
      return this.post.meta.nose.strong || 1
    },
    _currentNose() {
      return this.post.meta.nose.type || []
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    onStrongChange(val) {
      this.$emit('change', {
        meta : {
          nose : {
            strong : val
          }
        }
      })
    },
    onNoseChange(val) {
      let noseType = JSON.parse(JSON.stringify(this.post.meta.nose.type || []))
      if (!noseType) {
        noseType = []
      }
      let currentIndex = noseType.indexOf(val)

      if (currentIndex === -1) {
        noseType.push(val)
      } else {
        noseType.splice(currentIndex, 1)
      }

      this.$emit('change', {
        meta : {
          nose : {
            type : noseType
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
    width 60px
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

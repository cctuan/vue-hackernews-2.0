<template>
  <div class="edit-section">
    <div class="edit-title">
      <span class="title">{{title}}</span>
      <span class="status">{{currentLabel}}</span>
    </div>
    <div class="mdl-slider__container">
      <input ref="input"
             type="range"
             class="mdl-slider is-upgraded"
             :min="min"
             :max="max"
             :step="step"
             v-model="valueNumber"
             @input="onInput"
             data-upgraded=",MaterialSlider"
             :disabled="disabled" />
      <div class="mdl-slider__background-flex">
        <div class="mdl-slider__background-lower"
             :style="lowerBackgroundStyle">
        </div>
        <div class="mdl-slider__background-upper"
             :style="upperBackgroundStyle">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-slider',
  computed: {
    lowerBackgroundStyle () {
      return {
        flex: `${this.relativeValue} 1 0%`
      }
    },
    upperBackgroundStyle () {
      return {
        flex: `${1 - this.relativeValue} 1 0%`
      }
    },
    valueNumber () {
      return Number(this.value)
    },
    stepNumber () {
      return Number(this.step)
    },
    minNumber () {
      return Number(this.min)
    },
    maxNumber () {
      return Number(this.max)
    },
    relativeValue () {
      const val = Math.round((this.valueNumber - this.minNumber) / this.stepNumber) * this.stepNumber
      return val / (this.maxNumber - this.minNumber)
    },
    currentLabel() {
      return this.values[this.valueNumber - this.minNumber] ?
        this.values[this.valueNumber- this.minNumber].label : ''
    }
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    values: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      required: true
    },
    step: {
      type: [String, Number],
      default: 1
    },
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      required: true
    },
    disabled: {
      required: false
    }
  },
  methods: {
    onInput ({ target: { value } }) {
      this.$emit('change',
        typeof this.value === 'string' ? value : Number(value)
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
.edit-section
  border-top 1px solid rgba(255, 255, 255, 0.12)
.edit-title
  font-size 14px
  padding 15px 0
  .title
    color rgba(255, 255, 255, 0.5)
  .status
    float right
.clear-both
  clear both
  margin-bottom 15px
input.is-upgraded
  width calc(100% - 24px)
  margin 0 12px
  &::-webkit-slider-thumb
    background #7ad0e2
  &::-moz-range-thumb
    background #7ad0e2
  &::-ms-thumb
    background #7ad0e2
.mdl-slider__background-upper
  background-color rgba(255, 255, 255, 0.3)
.mdl-slider__background-lower
  background-color #7ad0e2
.mdl-slider__container
  margin-bottom 15px
</style>

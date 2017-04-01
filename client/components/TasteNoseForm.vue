<template>
  <div>
    <div class="edit-section">
      <div class="edit-title">
        {{title}}
      </div>
      <div class="circle-list">
        <div :class="'circle-container ' +
          (index === selectedIndex ? 'selected' : '')"
          v-for="(typeItem, index ) in _values"
          v-on:click="onClickType(typeItem, index)">
          <div class="circle" :style="'background-color:white'">
          </div>
          <span v-show="typeItem.count" class="circle-badge">
            {{typeItem.count}}
          </span>
          <div class="label">
            {{typeItem.label_zh}}
          </div>
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
    <div class="edit-section" v-if="typeof selectedIndex==='number'">
      <div class="edit-title">
        {{detailTitle}}
      </div>
      <div class="circle-list">
        <div :class="'circle-container ' +
          (val.indexOf(subItem.val) !== -1 ? 'selected' : '')"
          v-for="(subItem, index) in selectedItem.types"
          v-on:click="onClickSubType(subItem, index)">
          <div class="circle" :style="'background-color:white'">
          </div>
          <div class="label">
            {{subItem.label_zh}}
          </div>
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tast-nose-form',
  computed: {
    _values() {
      return this.values.map(mainItem => {
        if (!mainItem.types || !mainItem.types.length) {
          return {}
        }
        mainItem.count = 0;
        mainItem.types.map(subItem => {
          if (this.val.indexOf(subItem.val) !== -1) {
            mainItem.count++
          }
          return subItem
        })
        return mainItem
      })
    }
  },
  data() {
    return {
      selectedIndex: null,
      selectedItem: {
        types: [],
        label: ''
      }
    }
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    detailTitle: {
      type: String,
      default: () => ''
    },
    values : {
      type: Array,
      default: () => []
    },
    val: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClickType (item, index) {
      this.selectedIndex = index
      this.selectedItem = item
    },
    onClickSubType(item, index) {
      this.$emit('change', item.val)
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
.circle-list
  text-align center
  .circle-container
    position relative
    cursor pointer
    margin 10px 15px
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
    .circle-badge
      position absolute
      width 24px
      height 24px
      top 0px
      right 0px
      text-align center
      border-radius 50%
      background-color rgb(255, 64, 129)
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
</style>

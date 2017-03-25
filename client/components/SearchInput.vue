<template>
  <form class="searchbar">
    <div class="search-input">
      <div class="search-icon">
        <icon name="search" color="white" />
      </div>
      <input type="search" placeholder="搜尋" v-model="inputValue">
      <a class="search-clear link" v-on:click="inputValue = null">
        <icon name="remove" color="white" />
      </a>
    </div>
  </form>
</template>

<script>
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/remove'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
  name: 'search-input',
  components : {Icon},
  data() {
    return {
      inputValue: null
    }
  },
  watch: {
    inputValue(newValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>
<style lang="stylus" scoped>
.searchbar
  height 48px
  width 100%
  box-sizing border-box
  padding 0 16px
  overflow hidden
  position relative
  display -webkit-box
  display -ms-flexbox
  display -webkit-flex
  display flex
  -webkit-box-align center
  -ms-flex-align center
  -webkit-align-items center
  align-items center
  color #fff
  z-index 200

.search-icon
  position absolute
  top 0
  left 0
  width 40px
  text-align center
  line-height 32px

.search-input
  width 100%
  height 32px
  position relative
  -webkit-box-flex 1
  -webkit-flex-shrink 1
  -ms-flex 0 1 auto
  flex-shrink 1
  input
    text-indent 10px

input
  box-sizing border-box
  width 100%
  height 32px
  display block
  border none
  -webkit-appearance none
  -moz-appearance none
  -ms-appearance none
  appearance none
  border-radius 0
  font-family inherit
  color #fff
  font-size 16px
  font-weight 400
  padding 0
  border-bottom 1px solid #fff
  height 100%
  padding 0 36px 0 40px
  background-color transparent
  opacity 1

input::-webkit-search-cancel-button
  display none

.search-clear
  position absolute
  width 56px
  line-height 32px
  right -16px
  top 0
  opacity 0
  cursor pointer
  pointer-events auto
  opacity 1
</style>

<template>
  <form class="searchbar">
    <div class="search-input">
      <input type="search" placeholder="搜尋" v-model="inputValue">
      <a class="search-clear" v-on:click="inputValue = null"></a>
    </div>
  </form>
</template>

<script>
export default {
  name: 'search-input',
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
  background #2196f3
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

.search-input
  width 100%
  height 32px
  position relative
  -webkit-box-flex 1
  -webkit-flex-shrink 1
  -ms-flex 0 1 auto
  flex-shrink 1

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
  padding 0 36px 0 24px
  background-color transparent
  background-repeat no-repeat
  background-position 0 center
  background-image url(../../public/magnifying-glass.svg)
  opacity 1
  -webkit-background-size 24px 24px
  background-size 24px 24px
  -webkit-transition-duration .3s
  transition-duration .3s

input::-webkit-search-cancel-button
  display none

.search-clear
  position absolute
  width 56px
  height 100%
  right -16px
  top 0
  opacity 0
  background-position center
  background-repeat no-repeat
  -webkit-background-size 24px 24px
  background-size 24px 24px
  background-image url(../../public/cancel.svg)
  -webkit-transition-duration .3s
  transition-duration .3s
  cursor pointer
  pointer-events auto
  opacity 1
</style>

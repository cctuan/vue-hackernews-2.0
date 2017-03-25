<template>
  <div class="card">
    <div class="card-inner" v-lazyimg="thumb.current ? thumb.current.secure_url : null">
      <div class="card-content">
        <div class="card-content-inner">
          <div class="headline">{{name}}</div>
          <p class="body">{{description_s}}</p>
          <div class="bottom">
            <icon name="star" color="yellow" />
            <span class="rating-value">{{rating}}.0</span>
            <router-link :to="`/post/${_id}/view`">完整筆記</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/star'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
  name: 'post-item',
  components : {Icon},
  props: {
    name : {
      type: String,
      default : ''
    },
    description_s : {
      type: String,
      default : ''
    },
    rating : {
      type: Number,
      default : 0
    },
    _id : {
      type: String,
      default : '',
    },
    thumb: {
      default : {},
      type: Object
    }
  }
}
</script>
<style lang="stylus" scoped>
.card
  padding 8px
  float left
  width 100%
  box-sizing border-box
.card-inner
  position relative
  padding 0 0 66% 0
  background-size contain
  background-position center
  background-repeat no-repeat
.card-content
  position absolute
  background-color black
  opacity 0.6
  color white
  width 100%
  bottom 0
  padding 10px 25px
  box-sizing border-box
  .card-content-inner
    .headline
      -webkit-line-clamp 1
      word-wrap break-word
      max-height 32px
      text-align left
      overflow hidden
      line-height 32px
    .bottom
      i
        font-size 16px
  h6
    padding 0
    margin 0
  p
    margin 0 0 5px
  .rating-value
    font-size 16px
    margin-left 10px
  i
    font-size 15px
    color yellow
    line-height 20px
  .body
    -webkit-line-clamp 2
    word-wrap break-word
    max-height 56px
    line-height 20px
    text-align left
    overflow hidden
a
  color white
  float right
</style>

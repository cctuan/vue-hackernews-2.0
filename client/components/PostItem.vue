<template>
  <div class="card">
    <div class="card-inner _lazy" :data-image="post.thumb ? post.thumb.url : null">
      <div class="card-content">
        <div class="card-content-inner">
          <h6>{{post.name}}</h6>
          <p>{{post.description_s}}</p>
          <div>
            <i class="material-icons">star</i>
            <span class="rating-value">{{post.rating}}.0</span>
            <router-link :to="`/post/${post._id}/view`">完整筆記</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-item',
  props: {
    post: {
      default: {},
      type: Object
    }
  }
}
</script>
<style lang="stylus" scoped>
.card
  padding 2px 4px 2px 4px
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
  h6
    padding 0
    margin 0
  p
    margin 0 0 5px
  .rating-value
    margin-left 10px
  i
    font-size 15px
    color yellow
    line-height 20px
a
  color white
  float right
</style>

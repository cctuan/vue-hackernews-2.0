<template>
  <section class="mdl-components__page mdl-grid">
    <div class="post-header">{{post ? post.name : ''}}</div>
    <div class="post-info">
      <span class="rating-val">{{post.rating}}.0</span>
      <ul class="rating">
        <li class="material-icons" v-for="(item, index) in [1,2,3,4,5]">
          <label class="material-icons">{{item > post.rating ? 'star_border' : 'star'}}</label>
        </li>
      </ul>
      <span class="update-time">{{post.updatedAt | timeConvert}}</span>
    </div>
    <div class="description_s">{{post ? post.description_s : ''}}</div>
    <ul class="post-intro-list">
      <li class="post-intro-li"
        v-if="post.meta && post.meta.other && post.meta.other.year">
        <span class="title">
          年份
        </span>
         <span class="value">
           {{post.meta.other.year}}
         </span>
      </li>
      <li class="post-intro-li"
        v-if="post.meta && post.meta.other && post.meta.other.matury">
        <span class="title">
          成熟度
        </span>
         <span class="value">
           {{post.meta.other.matury}}
         </span>
      </li>
      <li class="post-intro-li"
        v-if="post.meta && post.meta.other && post.meta.other.price">
        <span class="title">
          價格
        </span>
         <span class="value">
           {{post.meta.other.price}}
         </span>
      </li>
      <li class="post-intro-li"
        v-if="post.meta && post.meta.other && post.meta.other.price">
        <span class="title">
          外觀
        </span>
         <span class="value">
           {{post.meta.other.price}}
         </span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'post-basic-information',
  props: {
    post: {
      default: {},
      type: Object
    }
  }
}
</script>
<style lang="stylus" scoped>
section
  padding 20px
.post-header
  width 100%
  font-size 20px
  margin-top 5px
  margin-bottom 5px
.post-info
  margin-bottom 10px
  .rating
    float left
    margin 0
    padding 0
    margin-left 20px
    li
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
      width 10%
    .value
      display inline-block
      text-align right
      width 90%
</style>

<template>
  <section class="mdl-components__page mdl-grid">
    <h5 class="title">{{post ? post.name : ''}}</h5>
    <div>
      <span class="rating-val">{{post.rating}}.0</span>
      <ul class="rating">
        <li class="material-icons" v-for="(item, index) in [1,2,3,4,5]">
          <label class="material-icons">{{item > post.rating ? 'star_border' : 'star'}}</label>
        </li>
      </ul>
      <span class="update-time">{{post.updatedAt | timeConvert}}</span>
    </div>
    <div class="description_s">{{post ? post.description_s : ''}}</div>
    <ul class="demo-list-item mdl-list">
      <li class="mdl-list__item setting-item"
        v-if="post.meta && post.meta.other && post.meta.other.year">
        <span class="mdl-list__item-primary-content">
          年份
        </span>
         <span class="mdl-list__item-secondary-content setting-item-value">
           {{post.meta.other.year}}
         </span>
      </li>
      <li class="mdl-list__item setting-item"
        v-if="post.meta && post.meta.other && post.meta.other.price">
        <span class="mdl-list__item-primary-content">
          價格
        </span>
         <span class="mdl-list__item-secondary-content setting-item-value">
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
.title
  width 100%
  margin-top 5px
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
  color #4f5256
.description_s
  color #cbccce
  width 100%
</style>

<template>
  <div class="post-view">
    <div class="page-content">
      <div class="row">
        <div class="col-30">
          <p class="buttons-row share-icons">
            <a class="button"><i class="f7-icons">social_facebook_fill</i></a>
            <a class="button"><i class="f7-icons share-line"></i></a>
          </p>
        </div>
        <div class="col-40">
        </div>
        <div class="col-30">
          <div class="bottom-line">
            <span><a>刪除</a></span>
            <span><router-link :to="`/post/${post._id}/edit`">編輯</router-link></span>
          </div>
        </div>
      </div>
      <div class="card demo-card-header-pic">
        <div :data-image="post && post.thumb ? post.thumb.url : ''" style=""
          valign="bottom" class="card-header color-white no-border _lazy">Journey To Mountains</div>
        <div class="card-content">
          <div class="card-content-inner">
            <h3>{{post ? post.name : ''}}<span class="right-end">得分:{{post.rating}}/5</span></h3>
            <p class="color-gray">Posted on January 21, 2015</p>
            <p>{{post ? post.description_s : ''}}</p>
            <template v-if="(post && post.meta)">
              <template v-if="post.meta.other">
                <h4 v-if="post.meta.other.year">Year : {{post.meta.other.year}}</h4>
                <h4 v-if="post.meta.other.price">Price : {{post.meta.other.price}}NTD</h4>
              </template>
              <template v-if="(post.meta.color || post.meta.clarity)">
                <h4>Appearance :</h4>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isValidMongoId
} from '../utility'
export default {
  name: 'post-view',
  components: {},
  props: {
    post: {}
  },
  updated() {
    this.$el.querySelectorAll('._lazy').forEach(item => {
      let img = document.createElement('img')
      img.onload = () => {
        item.style.backgroundImage = `url(${img.src})`
        item.classList.remove('_lazy')
      }
      img.onerror = () => {
        item.classList.remove('_lazy')
      }
      img.src = item.getAttribute('data-image')
    })
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
</style>

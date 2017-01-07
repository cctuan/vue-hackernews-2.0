<template>
  <div>
    <div class="mdl-card mdl-shadow--2dp preview-img"
      :style="'background-image:url(' + post.thumb.url + ')'">
    </div>
    <p>{{post.name}}</p>
    <rating-star uid="quick" :items="rating_map" legend="Default star rating:" :value="post.rating"></rating-star>
    <p>{{post.description_s}}</p>
    <ul class="mdl-list">
      <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          Facebook
        </span>
        <span class="mdl-list__item-secondary-action">
          <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-1">
            <input type="checkbox" class="mdl-switch__input" v-model="enable_fb_sharing" />
          </label>
        </span>
      </li>
      <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          LINE
        </span>
        <span class="mdl-list__item-secondary-action">
          <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-1">
            <input type="checkbox" class="mdl-switch__input" v-model="enable_line_sharing" />
          </label>
        </span>
      </li>
    </ul>
    <div class="btn confirm-send">
      <button v-on:click="onSave" class="preview-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">確認送出</button>
    </div>
  </div>
</template>

<script>
import RatingStar from '../components/RatingStar.vue'
import {
  DRINK_TYPE
} from '../../config/constants'

export default {
  name: 'quick-edit-view',
  components: {
    RatingStar,
  },
  props: {
    post: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      enable_fb_sharing: true,
      enable_line_sharing: true,
      drink_types: DRINK_TYPE,
      rating_map: [
        {
          title: '5 Stars',
          value: 5
        },
        {
          title: '4 Stars',
          value: 4
        },
        {
          title: '3 Stars',
          value: 3
        },
        {
          title: '2 Stars',
          value: 2
        },
        {
          title: '1 Star',
          value: 1
        }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onSave () {
      this.$store.dispatch('SAVE_POST')
        .then((val) => {
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.rating-field
  text-align center
.preview-img
  width 100%
  height 300px
  background-size contain
  background-repeat no-repeat
  background-position center
.confirm-send
  button
    width 100%
</style>

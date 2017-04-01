<template>
  <div v-bind:class="_classObject" v-lazyimg="url">
    <div class="caption" v-on:click="uploadImage">
      <div class="icon-container">
        <icon name="camera" color="white" scale="2"/>
      </div>
      <div class="sub-header">拍下美酒照片</div>
      <input id="myFileInput" type="file"
        accept="image/*;capture=camera"
        style="display: none"
        v-on:change="inputChange"
        >
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/camera'
import Icon from 'vue-awesome/components/Icon.vue'

export default {
  name: 'image-editor',
  props : {
    url : {
      default : '',
      type: String
    }
  },
  components: {
    Icon
  },
  computed: {
    _classObject(){
      let result = {
        thumb : true
      }
      if (!!this.url) {
        result.lazy = false
      }
      return result
    }
  },

  beforeMount () {
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    uploadImage() {
      this.$el.querySelector('#myFileInput').click()
    },
    inputChange(evt) {
      const file = evt.target.files[0]
      this.$emit('change', file)
      return
      // XXX: should upload to cloudImage
      const fr = new FileReader()
      const img = new Image()
      img.onload = () => {
        this.$emit('change', img.src)
      }
      img.onerror = () => {
        console.log('onerrorl')
      }
      img.src = window.URL.createObjectURL(file)
    }
  },
  watch: {
    post (data) {/**
      if (!data || !data.thumb || !data.thumb.url) {
        return
      }

      const uploadImage = this.$el.querySelector('.upload-image')
      let img = document.createElement('img')
      img.onload = () => {
        uploadImage.style.backgroundImage = `url(${data.thumb.url})`
      }
      img.src = data.thumb.url**/
    }
  }
}
</script>
<style lang="stylus" scoped>
.thumb
  padding-bottom 70%
  background-size contain
  background-position center center
  background-repeat no-repeat
  position relative
.lazy
  background-image url('../../public/photo-camera.svg')
  background-size 100px
.caption
  width 100%
  position absolute
  text-align center
  bottom calc(50% - 75px)
  .icon-container
    cursor pointer
    i
      font-size 50px
  .sub-header
    margin-top 15px
</style>

<template>
  <div class="edit-view">
    <div class="view-inner">
      <router-view :post="post" v-on:change="postUpdate" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'edit-view',
  components: {
  },
  props: {
    post: {
      default: {},
      type: Object
    }
  },
  computed: {
  },
  updated(val) {
  },
  mounted () {
    // fetchItem(this.$store)
  },
  watch: {
  },
  methods: {
    postUpdate(newPost) {
      this.$store.dispatch('UPDATE_CURRENT_POST', newPost)
    }
  }
}
</script>
<style lang="stylus" scoped>
.rating-field
  text-align center
.edit-section
  height 100px
.content-inner
  padding 10px
.chip-flat
  width 20%
  float left
  height 20px
  padding 5px 10px
.preview-btn
  width 100%
.drink-type-item
  float left
  padding 0 10px 0 10px
  div
    border-width: 1px;
    border-style: solid;
  .selected
    background-color: rgba(158,158,158,.2)
</style>

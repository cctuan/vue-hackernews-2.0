<template>
  <div class="edit-title">
    {{title}}
    <span class="warn-msg" v-if="warnMsg">
      {{warnMsg}}
    </span>
  </div>
</template>

<script>

export default {
  name: 'edit-title',
  components: {
  },
  props: {
    title : {
      type : String,
      default : ''
    },
    warnMsg : {
      type : String
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.edit-title
  color white
  .warn-msg
    float right
    color red
</style>

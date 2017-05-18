<template>
  <modal v-if="showModal" @click="$emit('close')">
    <div slot="body" class="preview-dialog">
      <div class="header">
        <icon :name="warning" color="yellow"/>
      </div>
      <div class="sub-header">
        請稍等一下,系統仍在處理中
      </div>
      <button @click="$emit('close')" class="detail-edit common-color main-func-button mdl-button mdl-button--raised mdl-button--colored">
        關閉
      </button>
    </div>
  </modal>
</template>

<script>

import 'vue-awesome/icons/warning'
import Icon from 'vue-awesome/components/Icon.vue'
import Modal from 'components/Modal.vue'

export default {
  name: 'processing-dialog',
  components: {
    Modal, Icon
  },
  props: {
    showModal: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    route () {
      return this.$store.state.route
    }
  },
  watch: {
    '$route'() {
      this.showModal = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.preview-dialog
  text-align center
  .header
    i
      font-size 40px
  .sub-header
    color black
    margin-top 15px
  button
    width 100%
    &.detail-edit
      background-color #7ad0e2
</style>

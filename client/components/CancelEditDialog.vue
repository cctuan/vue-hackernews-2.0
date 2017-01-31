
<template>
  <modal v-if="showModal" @close="$emit('close')">
    <div slot="body" class="edit-dialog">
      <div class="headline">
        取消編輯
      </div>
      <div class="body">
        您的筆記尚未編輯完成，確定要捨棄此份筆記？
      </div>
      <div class="btn-container">
        <div class="continue-btn" @click="$emit('close')">
          繼續編輯
        </div>
        <router-link to="/">
          <div class="cancel-btn">
            確定捨棄
          </div>
        </router-link>
      </div>
    </div>
  </modal>
</template>

<script>
import ROUTES from 'config/constants/ROUTES'
import Modal from 'components/Modal.vue'

export default {
  name: 'cancel-edit-dialog',
  components: {Modal},
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
  watch : {
    '$route'() {
      this.showModal = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.edit-dialog
  .headline
    color #000000
  .body
    margin-top 15px
    color rgba(0, 0, 0, 0.5)
  .btn-container
    text-align right
    margin-top 24px
    .continue-btn, a
      display inline-block
    .continue-btn, .cancel-btn
      cursor pointer
      padding 10px
    .cancel-btn
      color #7ad0e2
</style>

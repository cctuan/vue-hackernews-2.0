<template>
  <div class="edit-view">
    <div class="page-content">
      edit view
    </div>
  </div>
</template>

<script>

export default {
  name: 'edit-view',
  components: {},
  computed: {
    post () {
      return this.$store.getters.activePost
    }
  },

  beforeMount () {
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

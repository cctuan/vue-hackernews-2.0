<template>
  <div class="landing-view page-view">
    <div class="wrapper">
      <p class="sub-header-text">照片美化與酒評產生器<br>創造分享更多樂趣</p>
      <p>
        <router-link to="/">
          <button class="start-btn button">
            開始撰寫筆記
          </button>
        </router-link>
      </p>
      <p><a class="link">立即加入</a>一飲LINE@帳號</p>
    </div>
    <div class="footer">
      <div class="inner">
        <p>@2016 1shot. Inc.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing-view',
  beforeMount () {
    if (typeof window !== 'undefined') {
      document.cookie = 'visited=1'
    }
    this.$store.dispatch('VISIT')
  },
  computed: {
  },
}
</script>
<style lang="stylus" scoped>
.landing-view
  .footer
    position fixed
    bottom 0
.start-btn
  min-height 50px
  height auto
  width 100%
  margin 60px 0 20px 0
  background-color #7ad0e2
  color white
</style>

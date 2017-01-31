<template>
  <div class="landing-view">
    <img>
    <p>照片美化與酒評產生器<br>創造分享更多樂趣</p>
    <p>
      <router-link to="/">
        <button class="start-btn mdl-button mdl-button--raised mdl-button--colored">
          開始撰寫筆記
        </button>
      </router-link>
    </p>
    <p><a>立即加入</a>一飲LINE@帳號</p>
    <div>
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
  height: 100%
  text-align center
  padding 0 50px
.start-btn
  min-height 50px
  height auto
  width 100%
  background-color #7dd0e0
</style>

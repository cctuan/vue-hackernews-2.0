<template>
  <div class="login-view">
    <h5>初次登入需綁定FB帳號</h5>
    <p>使用本服務前，請先登入您的Facebook帳號以利一飲提供優質的使用情境與服務</p>
    <a href="/auth/facebook">
      <button class="login-fb-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
        以 Facebook 帳戶註冊
      </button>
    </a>
  </div>
</template>

<script>
export default {
  name: 'login-view',
  computed: {
  },
}
</script>
<style lang="stylus" scoped>
.login-view
  height 100%
  text-align center
  padding 0 50px
.login-fb-btn
  width 100%
  background-color #3b5998
</style>

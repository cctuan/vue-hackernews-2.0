<template>
  <div class="login-view page-view">
    <div class="wrapper">
      <div class="login-icon">
        <i class="material-icons">card_giftcard</i>
      </div>
      <div class="sub-header-text">初次登入需綁定FB帳號</div>
      <p class="body-text">使用本服務前，請先登入您的Facebook帳號以利一飲提供優質的使用情境與服務</p>
      <a class="login-button-container" href="/auth/facebook">
        <button class="login-fb-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          以 Facebook 帳戶註冊
        </button>
      </a>
    </div>
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
.login-icon
  text-align center
  i
    font-size 70px
.sub-header
  margin 30px 0 10px
.login-button-container
  margin-top 30px
  display inline-block
  width 100%
  button
    height auto
    width 100%
    background-color #3b5998
    padding 15px 20px
    font-family MicrosoftJhengHei
    font-size 16px
    font-weight bold
    font-style normal
    font-stretch normal
    line-height normal
    letter-spacing normal
    text-align center
    color #ffffff
</style>

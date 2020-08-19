<template>
  <header id="header">
    <a href="/" id="logo"></a>

    <nav id="nav">
      <a href="">手机</a>
      <a href="">笔记本</a>
      <a href="">家居</a>
    </nav>

    <div id="user">
      <a href="javascript:;" @click="toLogin">登录</a>
      <a href="javascript:;" @click="toRegister">注册</a>
      <a href="javascript:;" @click="toLogout">退出</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'KHeader',
  data() {
    return {

    }
  },
  methods: {
    toRegister() {
      this.$router.push({
        name: 'Register'
      })
    },
    toLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    toLogout() {
      localStorage.removeItem('token')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>
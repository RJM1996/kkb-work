<template>
  <div style="margin: 50px;">
    <div style="display: flex;">
      <span>账号：</span>
      <input type="text" name="account" v-model="account" id="account">
    </div>

    <div style="display: flex;">
      <span>密码：</span>
      <input type="text" name="passwd" v-model="passwd" id="passwd">
    </div>

    <button @click="login">登录</button>
  </div>
</template>

<script>
import { login } from '@/api'

export default {
  name: 'Login',
  data() {
    return {
      account: '',
      passwd: ''
    }
  },
  methods: {
    async login() {
      const req = {
        name: this.account,
        password: this.passwd
      }
      let res = await login(req)
      let { id, name } = res.data

      console.log(id, name)
      if (id && name) {
        console.log('登录成功')
        // 登录成功
        const token = res.headers.authorization
        localStorage.setItem('token', token)
        this.$router.push({
          path: '/'
        })
      }

    }
  }
}
</script>
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

    <div style="display: flex;">
      <span>确认密码：</span>
      <input type="text" name="repassword" v-model="repassword" id="repassword">
    </div>

    <button @click="register">注册</button>
  </div>
</template>

<script>
import {regist} from '@/api'

export default {
  name: 'Register',
  data() {
    return {
      account: '',
      passwd: '',
      repassword: ''
    }
  },
  methods: {
    async register() {
      const req = {
        name: this.account,
        password: this.passwd,
        repassword: this.repassword
      }
      let res = await regist(req)
      let { id, name } = res.data

      console.log(id, name)
      if (id && name) {
        alert('注册成功')
        console.log('注册成功')
        // 注册成功
        // const token = res.headers.authorization
        // localStorage.setItem('token', token)
        this.$router.push({
          name: 'Login'
        })
      }
    }
  }
}
</script>
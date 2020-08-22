<template>
  <div id="main">

    <div v-if="isError">
      <h3>获取商品失败</h3>
    </div>
    <div v-else>
      <div v-if="item">
        <h1 class="title">{{item.name}}</h1>
        <div class="detail" v-html="item.detail.detail"></div>
      </div>
      <div v-else>
        <p>数据加载中……</p>
      </div>
    </div>

  </div>
</template>

<script>
import { getItem } from '@/api';

export default {
  name: 'Detail',

  data() {
    return {
      item: null,
      isError: false
    }
  },

  async created() {

  },

  // 它比组件的初始化都要早
  // 所以在这里不能访问this
  // 守卫：它是一个生命周期函数（路由），因为它有点类似 koa - next
  // to,from 对应着访问之前的url与之后的url的对应$route对象
  async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter', this, to.params.id);

    try {
      let { data } = await getItem(to.params.id);
      // this.item = data;
      // 如果是一个函数，那么这个函数会在导航确认以后在调用
      next(function (vm) { //vm => 组件的this
        vm.item = data;
      })
    } catch (e) {
      next(function (vm) { //vm => 组件的this
        vm.isError = true;
      })
    }

    // next();
  }
}
</script>
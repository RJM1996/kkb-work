import Vue from "vue";
import VueRouter from "vue-router";

import Main from "@/views/Main.vue";
import Detail from "@/views/Detail.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register";

// 注册
Vue.use(VueRouter);
// 创建一个路由对象 和 koa 类似
let router = new VueRouter({
  mode: "history",
  // 所有的路由映射，每一个路由就是一个对象
  routes: [
    {
      // path => component
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/detail/:id",
      name: "Detail",
      component: Detail,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
  ],
});

const LOGIN_PAGE_NAME = "Login";
const REGISTER_PAGE = 'Register'

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if(to.name === REGISTER_PAGE) {
    next()
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME, // 跳转到登录页
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next();
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: "Main", // 跳转到home页
    });
  } else {
    next();
  }
});

export default router;

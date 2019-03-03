import Vue from 'vue';
import App from './App.vue';
import axios from "axios";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import VueRouter from "vue-router";

// 导入组件
import Longin from "./pages/Login";
import Admin from "./pages/Admin";
import GoodsList from "./pages/goods/GoodsList";
import CategoryList from "./pages/category/CategoryList";

Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 配置路由
const routes =[
  {path:"/",redirect:"/admin"},
  {path:"/login",component:Longin,meta:"登录页" },
  { path:"/admin",component:Admin,meta:"首页",redirect:"/admin/goods-list",children:[
    {path:"goods-list",component: GoodsList,meta:"商品列表"},
    {path:"category-list",component:CategoryList,meta:"栏目列表"}
  ]},

]

const router = new VueRouter({
  routes
})
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  // 挂载到根实例
  router,
  render: h => h(App),
}).$mount('#app')



import Vue from 'vue';
import App from './App.vue';
import axios from "axios";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import VueRouter from "vue-router";

// 导入组件
// 首页
import Longin from "./pages/Login";
import Admin from "./pages/Admin";
// 商品列表
import GoodsList from "./pages/goods/GoodsList";
import GoodsAdd from "./pages/goods/GoodAdd"
import GoodsEdit from "./pages/goods/GoodsEdit"
import CategoryList from "./pages/category/CategoryList";
import CategoryAdd from "./pages/category/CategoryAdd";
import AccountList from "./pages/Account/AccountList";
import OrderManager from "./pages/Order/OrderManager";
import OrderEdit from "./pages/Order/OrderEdit";
//因为vue的语法，所以可以忽略.vue后缀名

// 引入vuex仓库
import store from"./store"
// Node.js 语法，可以只写文件夹名，它会自动寻找文件夹下面的js文档

Vue.use(VueRouter);
Vue.use(ElementUI);


// Vue.prototype.$axios = axios

Vue.config.productionTip = false;

// 配置路由
const routes =[
  {path:"/",redirect:"/admin"},
  {path:"/login",component:Longin,meta:"登录页" },
  { path:"/admin",component:Admin,meta:"管理后台",redirect:"/admin/goods-list",children:[
    {path:"goods-list",component: GoodsList,meta:"商品列表"},
    {path:"goods-add",component: GoodsAdd,meta:"添加商品"},
    {path:"goods-edit/:id",component: GoodsEdit,meta:"添加商品"},
    {path:"category-list",component:CategoryList,meta:"栏目列表"},
    {path:"category-add",component:CategoryAdd,meta:"新增栏目"},
    {path:"account-list",component:AccountList,meta:"会员列表"},
    {path:"orderManager",component:OrderManager,meta:"订单管理"},
    {path:"order-edit/:id",component:OrderEdit,meta:"订单编辑"},
  ]},

]

const router = new VueRouter({
  routes
})
// 2.把axios绑定到vue实例的属性$axios   
 axios.defaults.baseURL = "http://127.0.0.1:8899";
//  绑定网址是全局有效
Vue.prototype.$axios = axios;

new Vue({
  // 挂载到根实例
  router,
  // 挂载一个store
  store,
  render: h => h(App),
}).$mount('#app')



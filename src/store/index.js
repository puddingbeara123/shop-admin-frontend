import Vue from "vue";
import Vuex from "vuex";
// 引入用户user.js的数据
import user from "./modules1/user"
Vue.use(Vuex);

export default new Vuex.Store({
   modules:{
       user
   }
})

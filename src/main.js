import Vue from 'vue';
import App from './App.vue';
import axios from "axios";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false;
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')


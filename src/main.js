import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import store from './store'


Vue.use(Antd);
Vue.use(ElementUI);
Vue.use(contentmenu);
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

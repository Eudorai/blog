import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/reset.css'

//引入element-ui
import ElementUI from 'element-ui'

Vue.use(ElementUI);

Vue.config.productionTip = false;

require("./mock");

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

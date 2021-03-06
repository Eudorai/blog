import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from 'axios'

import './assets/css/reset.css'

//引入element-ui
import ElementUI from 'element-ui'
import './theme/index.css'

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 默认图片
Vue.filter('IMG', function (value) {
    if (value) {
        return value;
    } else {
        return "https://dxs-pictures.gd2.qingstor.com/pc_image/1533308847-sJINRfclxg.jpeg";
    }
});

//拦截request，发请求前带上token
axios.interceptors.request.use((config) => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    window.console.info(config.url);
    return config;
});

//拦截response
axios.interceptors.response.use(res => {
    return res
}, err => {
    console.log(err.response.data);
    Vue.prototype.$message({
        type: 'error',
        message: err.response.data
    });
    // router.push('/login');
    return Promise.reject(err)

});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

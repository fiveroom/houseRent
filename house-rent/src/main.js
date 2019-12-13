import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import element from '@/element';

import Nav from '@/components/Nav.vue';

import Axios from 'axios';
import Qs from 'qs';

Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = Qs;

Vue.use(element)
Vue.config.productionTip = false

Vue.component('header-nav', Nav)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
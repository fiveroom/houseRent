import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import element from '@/element';
import '@/router/permission'

import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer';
import Mybutton from '@/components/Mybutton';
import MyInput from '@/components/MyInput';

import Axios from 'axios';
import Qs from 'qs';

Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = Qs;

Vue.use(element)
Vue.config.productionTip = false

Vue.component('header-nav', Nav)
Vue.component('Footer', Footer)
Vue.component('Mybutton', Mybutton)
Vue.component('MyInput', MyInput)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
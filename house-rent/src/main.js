import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import element from '@/element';
// import '@/router/permission'

import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer';
import Mybutton from '@/components/Mybutton';
import MyInput from '@/components/MyInput';
import myLoadding from '@/components/loadding';

// import Axios from '@/axios';
// import Axios from '@/axios';
import Qs from 'qs';

// Axios.defaults.headers.post["Content-Type"] =
//     "application/x-www-form-urlencoded";
// Vue.prototype.$axios = Axios;
// Vue.prototype.$qs = Qs;

Vue.use(element)
Vue.use(myLoadding)
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.user.user_id) {
            next()
        } else {
            next({
                path: '/user/login',
                query: to.fullPath
            })
        }
    } else {
        next()
    }

})

Vue.component('header-nav', Nav)
Vue.component('Footer', Footer)
Vue.component('Mybutton', Mybutton)
Vue.component('MyInput', MyInput)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import element from '@/element';
import '@/router/permission'

import Nav from '@/components/wholeSit/Nav.vue';
import Footer from '@/components/wholeSit/Footer';
import Mybutton from '@/components/wholeSit/Mybutton';
import MyInput from '@/components/wholeSit/MyInput';
import RightSide from "@/components/wholeSit/RightSide";
import myLoadding from '@/components/loadding';
import VueAMap from 'vue-amap';

Vue.use(element)
Vue.use(myLoadding)
Vue.config.productionTip = false
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
    key: '52e32be08f9e13cb695662b063f0b887',
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
    v: '1.4.4',
    uiVersion: '1.0'
})

Vue.component('header-nav', Nav)
Vue.component('Footer', Footer)
Vue.component('Mybutton', Mybutton)
Vue.component('MyInput', MyInput)
Vue.component('RightSide', RightSide)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
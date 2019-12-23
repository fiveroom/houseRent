//index.js
import myLoading from './loadding.vue';
export default {
    /* 
    * Vue:Vue 构造器
    * options:可选插件参数
    */
    install(Vue, options) {
        const Loading = Vue.extend(myLoading);
        const Profile = new Loading({
            el: document.createElement('div')
        });

        /*
        *el： https://cn.vuejs.org/v2/api/#el
        *loading.vue中的template模板内容将会替换挂载的元素。挂载元素的内容都将被忽略。 *所以Profile.$el最终是template里面的内容
        */


        //这里插件接收三个值 icon progressColor 如果注册的时候传入这些值则赋值给组件内默认值。
        // if (options) {
        //     options.text ? (Profile.text = options.text) : '';
        // }
        // if (options && options.el) {
        //     el.appendChild(Profile.$el)
        // } else {
        //     document.body.appendChild(Profile.$el);
        // }
        //定义显示隐藏的方法  open 会传入一个text 字符串。如果有则赋值给组件内默认值。
        const myLoadingMethod = {
            open(el) {
                console.log(el);
                Profile.show = true;
                if (el) {
                    el.appendChild(Profile.$el);
                    Profile.el = true
                } else {
                    document.body.appendChild(Profile.$el);
                }
            },
            hide() {
                let timer = setTimeout(() => {
                    Profile.show = false;
                    clearTimeout(timer)
                }, 500)
            }
        };
        Vue.prototype.$myLoadding = myLoadingMethod;
    }
}
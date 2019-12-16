import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Houses from '@/views/Houses';
import UserEnt from '@/views/UserEnt'; // 用户登录注册
import HouseDetail from '@/views/HouseDetail'; // 房子详情
import UserDetail from '@/views/UserDetail'; // 房子详情
import NoContent from '@/views/NoContent';
import Login from '@/components/Login'; // 登录
import Register from '@/components/Register'; // 注册

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const meta = {requireAuth: true}
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/h',
        component: Houses
    },
    {
        path: '/hdetail',
        component: HouseDetail
    },
    {
        path: '/user',
        component: UserEnt,
        children: [{
                path: '',
                component: Login
            }, {
                path: '/user/login',
                component: Login,
                meta: {
                    index: 1
                }
            },
            {
                path: '/user/register',
                component: Register,
                meta: {
                    index: 2
                }
            }
        ]
    },
    {
        path: '/editCode',
        component: NoContent
    },
    {
        path: '/userDetail',
        component: UserDetail,
        meta: {
            ...meta
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
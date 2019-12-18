import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Houses from '@/views/Houses';
import UserEnt from '@/views/UserEnt'; // 用户登录注册
import HouseDetail from '@/views/HouseDetail'; // 房子详情
import UserDetail from '@/views/UserDetail'; // 房子详情
import NoContent from '@/views/NoContent';
import Login from '@/components/Login'; // 登录
import Register from '@/components/Register'; // 注册
import PersCenter from '@/components/PersCenter'; // 个人中心
import EditPerData from '@/components/EditPerData'; // 个人中心
import EditPhone from '@/components/EditPhone'; // 个人中心

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const meta = { requireAuth: true }
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
        },
        children: [{
                path: '',
                name: '个人中心',
                component: PersCenter
            }, {
                // 个人中心
                name: '个人中心',
                path: '/userDetail/persCenter',
                component: PersCenter
            },
            {
                // 我的收藏
                name: '我的收藏',
                path: '/userDetail/myCollect',
                component: NoContent
            },
            {
                // 资料修改
                name: '编辑个人资料',
                path: '/userDetail/editInfo',
                component: EditPerData
            },
            {
                // 修改手机号
                name: '修改手机号',
                path: '/userDetail/editPhone',
                component: EditPhone
            },
            {
                // 修改手机号
                name: '修改手机号',
                path: '/userDetail/editEmail',
                component: NoContent
            }
        ]

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
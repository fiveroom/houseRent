import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Houses from '@/views/Houses';
import UserEnt from '@/views/UserEnt'; // 用户登录注册
import HouseDetail from '@/views/HouseDetail'; // 房子详情
import UserDetail from '@/views/UserDetail'; // 房子详情
import NoContent from '@/views/NoContent';
import PayPage from '@/components/PayPage';
import Login from '@/components/Login'; // 登录
import Register from '@/components/Register'; // 注册

import PersCenter from '@/components/userCom/PersCenter'; // 个人中心
import EditPerData from '@/components/userCom/EditPerData'; // 个人资料
import EditPhone from '@/components/userCom/EditPhone'; // 手机号码更改
import MyOrder from '@/components/userCom/MyOrder'; // 订单
import MyContract from '@/components/userCom/MyContract'; // 我的合同
import MyCollect from '@/components/userCom/MyCollect'; // 我的收藏
import EditPwd from '@/components/userCom/EditPwd'; // 编辑密码
import MySubs from '@/components/userCom/MySubs'; // 我的预约
import MyOrderRecord from '@/components/userCom/MyOrderRecord'; // 合同
import ContractDetail from '@/components/userCom/ContractDetail'; // 合同

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const meta = { requiresAuth: true }
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/h',
        name: '房屋搜索',
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
                component: PersCenter,
            },
            {
                // 我的收藏
                name: '我的收藏',
                path: '/userDetail/myCollect',
                component: MyCollect
            },
            {
                // 资料修改
                name: '编辑个人资料',
                path: '/userDetail/editInfo',
                component: EditPerData,
                meta: {
                    index: 2,
                    last: true
                }
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
            },
            {
                name: '我的账单',
                path: '/userDetail/myOrder',
                component: MyOrder,
                // props: true,
                props: (route) => ({ con_id: route.query.con_id, house_id: route.query.house_id })
            },
            // {
            //     name: '我的合同',
            //     path: '/userDetail/myContract',
            //     component: MyContract
            // },
            {
                name: '订单支付',
                path: '/userDetail/payPage',
                component: PayPage
            },
            {
                path: '/userDetial/editPwd',
                component: EditPwd
            },
            {
                path: '/userDetail/mySubs',
                component: MySubs
            },
            {
                name: '账单交易记录',
                path: '/userDetail/myOrderRecord',
                component: MyOrderRecord
            },
            {
                path: '/userDetail/contractDetail',
                component: ContractDetail
            }
        ]
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router
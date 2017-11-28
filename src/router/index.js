import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store'
import * as types from '@/store/types'
import { Modal } from 'iview'

Vue.use(Router);

// 页面刷新时，重新赋值token
if (Vue.ls.get('authorization')) {
    store.commit(types.LOGIN, { authorization: Vue.ls.get('authorization'), loginId: Vue.ls.get('loginId') })
}


const router = new Router({
    mode: 'history',
    base: '/qd/',
    routes: [{
            path: '/',
            redirect: '/index',
            name: 'main',
            component: resolve => require(['@/views/main.vue'], resolve),
            children: [{
                    path: '/index',
                    name: 'index',
                    meta: {
                        requireAuth: true
                    },
                    component: resolve => require(['@/views/index/index'], resolve),
                }, {
                    path: '/publishIron-:isCopy',
                    name: 'publishIron',
                    component: resolve => require(['@/views/publish/iron/index'], resolve),
                },
                {
                    path: '/buyer',
                    name: 'buyer',
                    component: resolve => require(['@/views/buyer/index'], resolve),
                    children: [{
                            path: 'Bbuys-:isToday',
                            name: 'Bbuys',
                            component: resolve => require(['@/views/buyer/buys/index'], resolve)
                        }, {
                            path: 'BuserInfo',
                            name: 'BuserInfo',
                            component: resolve => require(['@/views/buyer/personalInfo/index'], resolve)
                        },
                        {
                            path: 'Bright',
                            name: 'Bright',
                            component: resolve => require(['@/views/rights/index'], resolve)
                        }
                    ]
                },
                {
                    path: '/seller',
                    name: 'seller',
                    component: resolve => require(['@/views/seller/index'], resolve),
                    children: [{
                            path: 'Sbuys-:isToday',
                            name: 'Sbuys',
                            component: resolve => require(['@/views/seller/buys/index'], resolve)
                        }, {
                            path: 'SuserInfo',
                            name: 'SuserInfo',
                            component: resolve => require(['@/views/seller/personalInfo/index'], resolve)
                        }, {
                            path: 'scope',
                            name: 'scope',
                            component: resolve => require(['@/views/seller/scope/index'], resolve)
                        }, {
                            path: 'discount',
                            name: 'discount',
                            component: resolve => require(['@/views/seller/discount/index'], resolve)
                        },
                        {
                            path: 'Sright',
                            name: 'Sright',
                            component: resolve => require(['@/views/rights/index'], resolve)
                        },
                        {
                            path: 'ironRes',
                            name: 'ironRes',
                            component: resolve => require(['@/views/seller/resources/ironRes/index'], resolve)
                        },
                        {
                            path: 'plan',
                            name: 'plan',
                            component: resolve => require(['@/views/seller/resources/plan/index'], resolve)
                        },
                        {
                            path: 'special',
                            name: 'special',
                            component: resolve => require(['@/views/seller/resources/special/index'], resolve)
                        }
                    ]
                },
                {
                    path: '/market',
                    name: 'market',
                    redirect: '/market/iron',
                    component: resolve => require(['@/views/market/index'], resolve),
                    meta: {
                        requireAuth: true
                    },
                    children: [{
                        path: 'iron',
                        name: 'mIron',
                        component: resolve => require(['@/views/market/iron/index'], resolve),
                        meta: {
                            requireAuth: true
                        }
                    }, {
                        path: 'plan',
                        name: 'mPlan',
                        component: resolve => require(['@/views/market/plan/index'], resolve),
                        meta: {
                            requireAuth: true
                        }
                    }, {
                        path: 'special',
                        name: 'mSpecial',
                        component: resolve => require(['@/views/market/special/index'], resolve),
                        meta: {
                            requireAuth: true
                        }
                    }]
                },
                {
                    path: '/userInfo',
                    name: 'userInfo',
                    component: resolve => require(['@/views/user/index.vue'], resolve),
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/login/index'], resolve)
        },
        {
            path: '/retrieve',
            name: 'retrieve',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/login/retrievePassword'], resolve)
        },
        {
            path: '/superAgent-:loginId',
            name: 'superAgent',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/publish/super/index'], resolve)
        },
        {
            path: '/doc',
            name: 'doc',
            component: resolve => require(['@/views/doc/index'], resolve),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: resolve => require(['@/views/notFound/index'], resolve)
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        next();
    } else {
        if (store.state.authorization) {
            next();
        } else {
            Modal.confirm({
                content: '您还没有登录，请登录',
                onOk() {
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath }
                    })
                },
                onCancel() {
                    router.replace({
                        path: '/'
                    })
                }
            })
        }
    }
})

export default router;
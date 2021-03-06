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
            children: [
                {
                    path: '/index',
                    name: 'index',
                    meta: {
                        requireAuth: true
                    },
                    component: resolve => require(['@/views/index/index'], resolve),
                }, 
                {
                    path: '/publishIron-:isCopy',
                    name: 'publishIron',
                    component: resolve => require(['@/views/publish/iron/index'], resolve),
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
                },
                {
                    path: '/auction',
                    name: 'auction',
                    component: resolve => require(['@/views/auction/index.vue'], resolve),
                    meta: {
                        requireAuth: true,
                        keepAlive: true
                    }
                },
                {
                    path: '/auctionDetail:id',
                    name: 'auctionDetail',
                    component: resolve => require(['@/views/auction/detail.vue'], resolve),
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/',
            redirect: '/index',
            name: 'main',
            component: resolve => require(['@/views/backEnd.vue'], resolve), 
            children: [
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
                        },
                        {
                            path: 'BironOrder',
                            name: 'BironOrder',
                            component: resolve => require(['@/views/buyer/orders/iron/index'], resolve)
                        },
                        {
                            path: 'BplanOrder',
                            name: 'BplanOrder',
                            component: resolve => require(['@/views/buyer/orders/plan/index'], resolve)
                        },
                        {
                            path: 'BspecialOrder',
                            name: 'BspecialOrder',
                            component: resolve => require(['@/views/buyer/orders/special/index'], resolve)
                        },
                        {
                            path: 'Boc',
                            name: 'Boc',
                            redirect: 'Boc/step1',
                            component: resolve => require(['@/views/contract/contractTemp/index'], resolve),
                            children: [{
                                    path: 'Bstep1-:type',
                                    name: 'Bstep1',
                                    component: resolve => require(['@/views/contract/contractTemp/step1'], resolve)
                                },
                                {
                                    path: 'Bstep2-:sellId-:type',
                                    name: 'Bstep2',
                                    component: resolve => require(['@/views/contract/contractTemp/step2'], resolve)
                                },
                                {
                                    path: 'Bstep3-:type',
                                    name: 'Bstep3',
                                    component: resolve => require(['@/views/contract/contractTemp/step3'], resolve)
                                },
                                {
                                    path: 'Bstep4-:type',
                                    name: 'Bstep4',
                                    component: resolve => require(['@/views/contract/contractTemp/step4'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'BocManage-:type',
                            name: 'BocManage',
                            component: resolve => require(['@/views/contract/contractManage/index'], resolve)
                        },
                        {
                            path: 'BocAuthen-:type',
                            name: 'BocAuthen',
                            component: resolve => require(['@/views/contract/authentication/index'], resolve),
                        },
                        {
                            path: 'BocAuthenStep1-:type-:status',
                            name: 'BatStep1',
                            component: resolve => require(['@/views/contract/authentication/step1'], resolve)
                        },
                        {
                            path: 'BocAuthenStep2-:type-:status',
                            name: 'BatStep2',
                            component: resolve => require(['@/views/contract/authentication/step2'], resolve)
                        },
                        {
                            path: 'BocAuthenStep3-:type',
                            name: 'BatStep3',
                            component: resolve => require(['@/views/contract/authentication/step3'], resolve)
                        },
                        {
                            path: 'Recharge',
                            name: 'Recharge',
                            component: resolve => require(['@/views/buyer/myAssets/recharge/index.vue'], resolve)
                        },
                        {
                            path: 'assetDetail',
                            name: 'assetDetail',
                            component: resolve => require(['@/views/buyer/myAssets/assetDetail/index.vue'], resolve)
                        },
                        {
                            path: 'bankCard',
                            name: 'bankCard',
                            component: resolve => require(['@/views/buyer/myAssets/bankCard/index.vue'], resolve)
                        },
                        {
                            path: 'addCard',
                            name: 'addCard',
                            component: resolve => require(['@/views/buyer/myAssets/bankCard/add.vue'], resolve)
                        },
                        {
                            path: 'bankDetail',
                            name: 'bankDetail',
                            component: resolve => require(['@/views/buyer/myAssets/bankCard/detail.vue'], resolve)
                        },
                        {
                            path: 'putForwardList',
                            name: 'putForwardList',
                            component: resolve => require(['@/views/buyer/myAssets/putForward/index.vue'], resolve)
                        },
                        {
                            path: 'putForward',
                            name: 'putForward',
                            component: resolve => require(['@/views/buyer/myAssets/putForward/putForward.vue'], resolve)
                        },
                        {
                            path: 'collection',
                            name: 'collection',
                            component: resolve => require(['@/views/buyer/collection/index'], resolve)
                        },
                        {
                            path: 'bidders',
                            name: 'bidders',
                            component: resolve => require(['@/views/buyer/bidders/index'], resolve)
                        },
                        {
                            path: 'deposit',
                            name: 'deposit',
                            component: resolve => require(['@/views/buyer/deposit/index'], resolve)
                        }
                    ]
                },
                {
                    path: '/seller',
                    name: 'seller',
                    meta: {
                        isBack: true
                    },
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
                            path: 'planRes',
                            name: 'planRes',
                            component: resolve => require(['@/views/seller/resources/plan/index'], resolve)
                        },
                        {
                            path: 'specialRes',
                            name: 'specialRes',
                            component: resolve => require(['@/views/seller/resources/special/index'], resolve)
                        },
                        {
                            path: 'SironOrder',
                            name: 'SironOrder',
                            component: resolve => require(['@/views/seller/orders/iron/index'], resolve)
                        },
                        {
                            path: 'SplanOrder',
                            name: 'SplanOrder',
                            component: resolve => require(['@/views/seller/orders/plan/index'], resolve)
                        },
                        {
                            path: 'SspecialOrder',
                            name: 'SspecialOrder',
                            component: resolve => require(['@/views/seller/orders/special/index'], resolve)
                        },
                        {
                            path: 'Soc',
                            name: 'Soc',
                            component: resolve => require(['@/views/contract/contractTemp/index'], resolve),
                            children: [{
                                    path: 'Sstep1-:type',
                                    name: 'Sstep1',
                                    component: resolve => require(['@/views/contract/contractTemp/step1'], resolve)
                                },
                                {
                                    path: 'Sstep2-:sellId-:type',
                                    name: 'Sstep2',
                                    component: resolve => require(['@/views/contract/contractTemp/step2'], resolve)
                                },
                                {
                                    path: 'Sstep3-:type',
                                    name: 'Sstep3',
                                    component: resolve => require(['@/views/contract/contractTemp/step3'], resolve)
                                },
                                {
                                    path: 'Sstep4-:type',
                                    name: 'Sstep4',
                                    component: resolve => require(['@/views/contract/contractTemp/step4'], resolve)
                                }

                            ]
                        },
                        {
                            path: 'SocManage-:type',
                            name: 'SocManage',
                            component: resolve => require(['@/views/contract/contractManage/index'], resolve)
                        },
                        {
                            path: 'SocAuthen-:type',
                            name: 'SocAuthen',
                            component: resolve => require(['@/views/contract/authentication/index'], resolve),
                        },
                        {
                            path: 'SocAuthenStep1-:type-:status',
                            name: 'SatStep1',
                            component: resolve => require(['@/views/contract/authentication/step1'], resolve)
                        },
                        {
                            path: 'SocAuthenStep2-:type-:status',
                            name: 'SatStep2',
                            component: resolve => require(['@/views/contract/authentication/step2'], resolve)
                        },
                        {
                            path: 'SocAuthenStep3-:type',
                            name: 'SatStep3',
                            component: resolve => require(['@/views/contract/authentication/step3'], resolve)
                        }
                    ]
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
            path: '/register',
            name: 'register',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/register/index'], resolve)
        },
        {
            path: '/Authentication',
            name: 'Authentication',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/Authentication/index'], resolve)
        },
        {
            path: '/shop-:id',
            name: 'shop',
            redirect: '/shop-:id/iron-:type',
            component: resolve => require(['@/views/shop/index'], resolve),
            children: [{
                    path: 'iron-:type',
                    name: 'sIron',
                    component: resolve => require(['@/views/shop/iron/index'], resolve),
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'plan-:type',
                    name: 'sPlan',
                    component: resolve => require(['@/views/shop/plan/index'], resolve),
                    meta: {
                        requireAuth: true
                    }
                }, {
                    path: 'special-:type',
                    name: 'sSpecial',
                    component: resolve => require(['@/views/shop/special/index'], resolve),
                    meta: {
                        requireAuth: true
                    }
                }
            ]
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
            path: '/appDownload',
            name: 'appDownload',
            component: resolve => require(['@/views/appDownload/index'], resolve),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/logistics',
            name: 'logistics',
            component: resolve => require(['@/views/logistics/index'], resolve),
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
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
        mode: 'history',
        base: '/qd/',
        routes: [{
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
                }]
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
                }]
            },
            {
                path: '/userInfo',
                name: 'userInfo',
                component: resolve => require(['@/views/user/index.vue'], resolve),
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
    // router.beforeEach((to, from, next) => {
    //     next();
    // })

// router.afterEach((to, from, next) => {

// });

export default router;
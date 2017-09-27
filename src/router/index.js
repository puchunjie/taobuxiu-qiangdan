import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
        mode: 'history',
        base: '/qd/',
        routes: [{
                path: '/publishIron',
                name: 'publishIron',
                component: resolve => require(['@/views/publish/iron/index'], resolve),
            },
            {
                path: '*',
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
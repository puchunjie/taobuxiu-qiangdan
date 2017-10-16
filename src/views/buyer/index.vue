<template>
    <div class="container">
        <leftMenu :menus="menus"></leftMenu>
        <div class="right-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import leftMenu from '@/components/leftMenu.vue'
    export default {
        components: {
            leftMenu
        },
        data() {
            return {
                menus: [{
                    title: '现货求购管理',
                    icon: 'icon-menu',
                    subs: [{
                        name: '今日',
                        count: 300,
                        router: {
                            name: 'Bbuys',
                            params: {
                                isToday: 1
                            }
                        }
                    }, {
                        name: '历史',
                        count: 14002,
                        router: {
                            name: 'Bbuys',
                            params: {
                                isToday: 0
                            }
                        }
                    }]
                }, {
                    title: '我的买家档案',
                    icon: 'icon-weibiaoti1',
                    subs: [{
                            name: '基本信息',
                            router: {
                                name: 'BuserInfo'
                            }
                        },
                        {
                            name: '权益说明',
                            router: {}
                        }
                    ]
                }]
            }
        }
    }
</script>



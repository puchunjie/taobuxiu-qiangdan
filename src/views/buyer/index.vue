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
                    icon: '',
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
                    icon: '',
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


<style lang="less">
    .container {
        width: 100%;
        .right-content {
            margin: 15px 0 0 175px;
            padding-right: 15px;
        }
    }
</style>


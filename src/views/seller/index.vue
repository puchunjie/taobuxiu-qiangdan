<template>
    <div class="container">
        <leftMenu :menus="menus"></leftMenu>
        <div class="right-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import leftMenu from '@/components/leftMenu.vue'
    export default {
        components: {
            leftMenu
        },
        computed: {
            ...mapGetters(['nums'])
        },
        data() {
            return {
                menus: [{
                    title: '现货报价管理',
                    icon: 'icon-guanli',
                    subs: [{
                        name: '今日',
                        count: 300,
                        router: {
                            name: 'Sbuys',
                            params: {
                                isToday: 1
                            }
                        }
                    }, {
                        name: '历史',
                        count: 14002,
                        router: {
                            name: 'Sbuys',
                            params: {
                                isToday: 0
                            }
                        }
                    }]
                }, {
                    title: '我的卖家档案',
                    icon: 'icon-weibiaoti1',
                    subs: [{
                            name: '基本信息',
                            router: {
                                name: 'SuserInfo'
                            }
                        },
                        {
                            name: '经营范围',
                            router: {
                                name: 'scope'
                            }
                        },
                        {
                            name: '权益说明',
                            router: {
                                name: 'Sright'
                            }
                        },
                        {
                            name: '发布优惠',
                            router: {
                                name: 'discount'
                            }
                        }
                    ]
                }]
            }
        },
        watch: {
          nums(val){
              this.menus[0].subs[0].count = val.todaySell;
            this.menus[0].subs[1].count = val.historySell;
          }  
        },
        mounted () {
            this.menus[0].subs[0].count = this.nums.todaySell;
            this.menus[0].subs[1].count = this.nums.historySell;
        }
    }
</script>



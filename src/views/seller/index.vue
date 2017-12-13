<template>
    <div class="container">
        <leftMenu :menus="asyncMenu"></leftMenu>
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
            ...mapGetters(['userCount']),
            asyncMenu() {
                this.menus[0].subs[0].count = this.userCount.sellIronT;
                this.menus[0].subs[1].count = this.userCount.sellIronH;
                this.menus[2].subs[0].count = this.userCount.sellX;
                this.menus[2].subs[1].count = this.userCount.sellD;
                this.menus[2].subs[2].count = this.userCount.sellT;
                return this.menus
            }
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
                        title: '现货资源管理',
                        icon: 'icon-weibiaoti1',
                        subs: [{
                                name: '现货资源',
                                router: {
                                    name: 'ironRes'
                                }
                            },
                            {
                                name: '定开计划',
                                router: {
                                    name: 'planRes'
                                }
                            },
                            {
                                name: '特价资源',
                                router: {
                                    name: 'specialRes'
                                }
                            }
                        ]
                    },
                    {
                        title: '我的订单',
                        icon: 'icon-dingdan2',
                        subs: [{
                            name: '现货订单',
                            count: 0,
                            router: {
                                name: 'SironOrder',
                                params: {
                                    isToday: 1
                                }
                            }
                        }, {
                            name: '定开订单',
                            count: 0,
                            router: {
                                name: 'SplanOrder',
                                params: {
                                    isToday: 0
                                }
                            }
                        }, {
                            name: '特价订单',
                            count: 0,
                            router: {
                                name: 'SspecialOrder',
                                params: {
                                    isToday: 0
                                }
                            }
                        }]
                    }, {
                        title: '合同管理',
                        icon: 'icon-dingdan2',
                        subs: [{
                            name: '起草合同',
                            count: 0,
                            router: {
                                name: 'Sstep1',
                                params: {
                                    type: 2
                                }
                            }
                        }, {
                            name: '管理合同',
                            count: 0,
                            router: {
                                name: 'SocManage',
                                params: {
                                    type: 2
                                }
                            }
                        },{
                        name: '认证合同',
                        router: {
                            name: 'SocAuthen',
                                params: {
                                    type: 2
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
                    }
                ]
            }
        }
    }
</script>



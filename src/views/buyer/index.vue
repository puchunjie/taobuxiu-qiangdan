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
            ...mapGetters(['pushData', 'userCount']),
            asyncMenu() {
                this.menus[0].subs[0].count = this.userCount.buyIronT;
                this.menus[0].subs[1].count = this.userCount.buyIronH;
                this.menus[1].subs[0].count = this.userCount.buyX;
                this.menus[1].subs[1].count = this.userCount.buyD;
                this.menus[1].subs[2].count = this.userCount.buyT;
                return this.menus
            }
        },
        data() {
            return {
                menus: [{
                    title: '现货求购管理',
                    icon: 'icon-ziyuan10',
                    subs: [{
                        name: '今日',
                        count: 0,
                        router: {
                            name: 'Bbuys',
                            params: {
                                isToday: 1
                            }
                        }
                    }, {
                        name: '历史',
                        count: 0,
                        router: {
                            name: 'Bbuys',
                            params: {
                                isToday: 0
                            }
                        }
                    }]
                }, {
                    title: '我的订单',
                    icon: 'icon-ziyuan13',
                    subs: [{
                        name: '现货订单',
                        count: 0,
                        router: {
                            name: 'BironOrder',
                            params: {
                                isToday: 1
                            }
                        }
                    }, {
                        name: '定开订单',
                        count: 0,
                        router: {
                            name: 'BplanOrder',
                            params: {
                                isToday: 0
                            }
                        }
                    }, {
                        name: '特价订单',
                        count: 0,
                        router: {
                            name: 'BspecialOrder',
                            params: {
                                isToday: 0
                            }
                        }
                    }]
                }, {
                    title: '合同管理',
                    icon: 'icon-ic_import_contacts_b',
                    subs: [{
                        name: '起草合同',
                        router: {
                            name: 'Bstep1',
                            params: {
                                type: 1
                            }
                        }
                    }, {
                        name: '管理合同',
                        router: {
                            name: 'BocManage',
                            params: {
                                type: 1
                            }
                        }
                    }, {
                        name: '认证合同',
                        router: {
                            name: 'BocAuthen',
                            params: {
                                type: 1
                            }
                        }
                    }]
                },{
                    title: '我的资产',
                    icon: '',
                    subs: [{
                            name: '充值管理',
                            router: {
                                name: 'Recharge',
                                query: {
                                    step: 1
                                }
                            }
                        }]
                }, {
                    title: '我的拍卖',
                    icon: 'icon-ziyuan11',
                    subs: [{
                        name: '我的竞拍',
                        router: {
                            name: 'bidders'
                        }
                    }, {
                        name: '我的保证金',
                        router: {
                            name: 'deposit'
                        }
                    }, {
                        name: '我的收藏',
                        router: {
                            name: 'collection'
                        }
                    }]
                }, {
                    title: '我的买家档案',
                    icon: 'icon-ziyuan11',
                    subs: [{
                            name: '基本信息',
                            router: {
                                name: 'BuserInfo'
                            }
                        },
                        {
                            name: '权益说明',
                            router: {
                                name: 'Bright'
                            }
                        }
                    ]
                }]
            }
        }
    }
</script>



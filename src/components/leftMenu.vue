<template>
    <div class="left-menu">
        <ul class="menu-list">
            <li class="menu-item" v-for="(item,index) in menus" :key="index">
                <div class="item-title">
                    <span class="iconfont" :class="item.icon"></span> {{ item.title }}
                </div>
                <ul class="sub-menu-list">
                    <li v-for="(sub,i) in item.subs" :class="{'active':sub.active}" :key="i" @click="routerGo(sub)">
                        {{ sub.name }}
                        <span v-if="sub.count != undefined && sub.count>0">{{ sub.count }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import * as types from '@/store/types'
    export default {
        props: {
            menus: Array
        },
        data() {
            return {
                documentHeight: 800
            }
        },
        methods: {
            routerGo(item) {
                this.$router.push(item.router);
            },
            // 设置高亮
            setHighLight() {
                this.initMenuActive();
                setTimeout(() => {
                    let routerPath = this.$route.path;
                    this.menus.forEach(sub => {
                        sub.subs.forEach(el => {
                            if (routerPath.indexOf(el.router.name) > 0) {
                                if (this.$route.name == 'Bbuys' || this.$route.name == 'Sbuys') {
                                    if (el.router.params.isToday == this.$route.params.isToday) {
                                        el.active = true;
                                        return false
                                    }
                                } else {
                                    el.active = true;
                                    return false
                                }
                            }
                        })
                    })
                }, 50);
            },
            initMenuActive() {
                this.menus.forEach(sub => {
                    sub.subs.forEach(el => {
                        this.$set(el, 'active', false);
                    })
                });
            }
        },
        watch: {
            $route() {
                this.setHighLight();
            }
        },
        created() {
            this.setHighLight();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../assets/base.less');
    .left-menu {
        position: absolute;
        width: 160px;
        min-height: 100%;
        top: 0;
        padding-top: 148px;
        background-color: #303653;
    }
    
    .menu-list {
        width: 100%;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        .menu-item {
            width: 100%;
            .item-title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-indent: 12px;
                .iconfont {
                    font-size: 20px;
                }
            }
        }
        .sub-menu-list {
            width: 100%;
            li {
                position: relative;
                line-height: 40px;
                text-indent: 35px;
                cursor: pointer;
                &.active,
                &:hover {
                    background-color: rgba(225, 225, 225, 0.3);
                }
                span {
                    position: absolute;
                    width: 24px;
                    height: 16px;
                    top: 12px;
                    right: 39px;
                    background-color: @dark_red;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    line-height: 16px;
                    text-indent: 0;
                    .ellipsis;
                    .borderRadius(100px);
                }
            }
        }
    }
</style>


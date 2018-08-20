<template>
    <div class="left-menu">
        <div class="menu-list">
            <div class="menu-item" :class="item.isOpen ? 'open' : ''" v-for="(item,index) in inMenus" :key="index">
                <div class="item-title" @click="toggleItem(item,index)">
                    {{ item.title }} <i class="iconfont" :class="item.isOpen ? 'icon-up' : 'icon-down'"></i>
                </div>
                <div class="sub-menu-list">
                    <router-link class="sub-item" v-for="(sub,i) in item.subs" :key="i" :to="sub.router" tag="div" active-class="active" exact>
                        {{ sub.name }}
                        <span v-if="sub.count != undefined && sub.count>0">{{ sub.count }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            menus: Array
        },
        data() {
            return {
                inMenus: []
            }
        },
        watch: {
            menus: {
                handler: function(newVal, oldVal) {
                    this.initMenu();
                },
                deep: true
            }
        },
        methods: {
            initMenu() {
                let arr = this.$clearData(this.menus)
                this.inMenus = arr.map(item => {
                    item.isOpen = true;
                    return item
                })
            },
            toggleItem(item, i) {
                this.inMenus[i].isOpen = !this.inMenus[i].isOpen;
            }
        },
        created() {
            this.initMenu();
        }
    }
</script>


<style lang="less">
    @import url('../assets/base.less');
    .left-menu {
        position: absolute;
        width: 160px;
        min-height: 100%;
        top: 0;
        padding-top: 100px;
        background-color: #3f3f3f;
        color: #999999;
        font-size: 14px;
        .menu-list {
            width: 100%;
            color: #C1C3CB;
            font-weight: 500;
            .menu-item {
                width: 100%;
                .item-title {
                    position: relative;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    text-indent: 12px;
                    cursor: pointer;
                    &:hover {
                        color: #fff;
                        background-color: #333333;
                    }
                    .iconfont {
                        position: absolute;
                        font-size: 12px;
                        right: 12px;
                    }
                }
            }
            .sub-menu-list {
                width: 100%;
                height: 0;
                overflow: hidden;
                background-color: #333333;
                .sub-item {
                    position: relative;
                    line-height: 40px;
                    text-indent: 35px;
                    cursor: pointer;
                    &.active {
                        background-color: #3366CC;
                        color: #fff;
                    }
                    &:hover {
                        color: #fff;
                    }
                    span {
                        position: absolute;
                        width: 24px;
                        height: 16px;
                        top: 12px;
                        right: 39px;
                        background-color: @dark_red;
                        color: #fff;
                        text-align: center;
                        line-height: 16px;
                        text-indent: 0;
                        .ellipsis;
                        .borderRadius(100px);
                    }
                }
            }
        }
        .open {
            .sub-menu-list {
                height: auto!important;
            }
        }
    }
</style>


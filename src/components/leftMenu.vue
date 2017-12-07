<template>
    <div class="left-menu">
        <ul class="menu-list">
            <li class="menu-item" v-for="(item,index) in menus" :key="index">
                <div class="item-title">
                    <span class="iconfont" :class="item.icon"></span> {{ item.title }}
                </div>
                <ul class="sub-menu-list">
                    <router-link v-for="(sub,i) in item.subs" :key="i" :to="sub.router" tag="li" active-class="active" exact>
                        {{ sub.name }}
                        <span v-if="sub.count != undefined && sub.count>0">{{ sub.count }}</span>
                    </router-link>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            menus: Array
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


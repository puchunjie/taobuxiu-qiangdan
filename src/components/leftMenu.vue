<template>
    <div class="left-menu">
        <ul class="menu-list">
            <li class="menu-item" v-for="(item,index) in menus" :key="index">
                <div class="item-title">
                    <span class="iconfont icon-CombinedShape"></span>
                    {{ item.title }}
                </div>
                <ul class="sub-menu-list">
                    <li v-for="(sub,i) in item.subs" :key="i">
                        {{ sub.name }}{{ sub.count ? `(${sub.count})`: '' }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:{
          menus:Array  
        }
    }
</script>


<style lang="less" scoped>
    .left-menu {
        position: absolute;
        width: 160px;
        height: 100%;
        min-height: 850px;
        top: 0;
        padding-top: 148px;
        background-color: #303653;
    }
    
    .menu-list {
        width: 100%;
        color: #fff;
        font-size: 14px;
        .menu-item{
            width: 100%;
            .item-title{
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-indent: 12px;
                .iconfont{
                    font-size: 20px;
                }
            }
        }


        .sub-menu-list{
            width: 100%;
            li{
                line-height: 40px;
                text-indent: 35px;
                cursor: pointer;
                &.active,&:hover{
                    background-color: rgba(225, 225, 225, 0.3);
                }
            }
        }
    }
</style>


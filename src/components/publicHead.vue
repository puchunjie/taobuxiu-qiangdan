<template>
    <div class="main-header">
        <img class="logo" src="../assets/logo.png">
        <ul class="menu">
            <li>首页</li>
            <router-link :class="{'active':$route.name == 'publishIron'}" :to="{name:'publishIron',params:{isCopy: 0}}" tag="li">发布求购</router-link>
        </ul>
        <div class="account-group">
            <router-link :to="{name:'BuserInfo'}" class="br" :class="{'active':isBuyer}">买家中心</router-link>
            <router-link :to="{name:'SuserInfo'}" class="bl" :class="{'active':isSeller}">卖家中心</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            isBuyer(){
                return this.$route.fullPath.indexOf('buyer') > -1
            },
            isSeller(){
                return this.$route.fullPath.indexOf('seller') > -1
            }
        }
    }
</script>


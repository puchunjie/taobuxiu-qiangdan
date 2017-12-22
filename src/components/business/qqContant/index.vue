<template>
    <div class="qq-conatnt">
        {{ data.name }} {{ data.phone }}
        <a v-show="data.qq != ''" :href='"tencent://message/?uin="+data.qq+"&amp;Site=&amp;Menu=yes"'>
            <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/icon_qq.png">
            <span class="flash">QQ交谈</span>
        </a>
    
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                default: function() {
                    return {
                        name: '',
                        phone: '',
                        qq: ''
                    }
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    .qq-conatnt {
        display: inline;
        img {
            display: inline-block;
            width: 16px;
            vertical-align: sub;
        }
        .flash {
            animation: change .8s ease-in infinite;
            color: #FD7C20;
        }
        @keyframes change {
            0% {
                text-shadow: 0 0 1px #FD7C20
            }
            50% {
                text-shadow: 0 0 10px #FD7C20
            }
            100% {
                text-shadow: 0 0 1px #FD7C20
            }
        }
    }
</style>

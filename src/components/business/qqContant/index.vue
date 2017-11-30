<template>
    <div class="qq-conatnt">
        {{ data.name }} {{ data.phone }}
        <a :href='"tencent://message/?uin="+data.qq+"&amp;Site=&amp;Menu=yes"'>
            <img src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/icon_qq.png">
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
        display: inline-block;
        img {
            display: inline-block;
            width: 16px;
            vertical-align: sub;
        }
    }
</style>

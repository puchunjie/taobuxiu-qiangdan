<template>
    <div class="strength">
        密码强度
        <span v-for="(level,i) in levels" :class="[level.cls,{'done':i < checkStrength}]" :key="i">{{ level.value }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            value: String
        },
        data() {
            return {
                levels: [{
                    value: '弱',
                    cls: 'red'
                }, {
                    value: '中',
                    cls: 'yelow'
                }, {
                    value: '强',
                    cls: 'green'
                }]
            }
        },
        computed: {
            //密码强度0-3 0无1弱2中3强
            checkStrength() {
                let lv = 0
                if (this.value.match(/[a-z]/g))
                    lv++;
                if (this.value.match(/[0-9]/g))
                    lv++;
                if (this.value.match(/(.[^a-z0-9])/g))
                    lv++;
                if (this.value.length < 6)
                    lv = 0;
                if (lv > 3)
                    lv = 3;
                return lv
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../assets/base.less';
    .strength {
        height: 30px;
        line-height: 30px;
        color: @f_goast;
        span {
            display: inline-block;
            width: 50px;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            vertical-align: middle;
            background-color: @back_gray;
            color: #fff;
            margin: 0 5px;
            text-align: center;
            &.red.done {
                background-color: @dark_red;
            }
            &.yelow.done {
                background-color: @light_yellow;
            }
            &.green.done {
                background-color: @light_green;
            }
        }
    }
</style>

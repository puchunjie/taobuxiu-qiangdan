
<template>
    <div class="time-warp">
        <div v-if="!flag" class="out">
            <span v-if="time == ''">计算中...</span>
            <div v-else v-html="time"></div>
        </div>
        <span v-else>已结束</span>
    </div>
</template>

<script>
    export default {
        props: {
            endTime: {
                type: [String, Number]
            },
            nowTime: {
                type: [String, Number],
                default: undefined
            },
            color: {
                type: String,
                default: String
            },
            isDetail: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                time: '',
                flag: false,
                interval: null,
                styles: 'display:inline-block;vertical-align: bottom;font-weight:bold;font-size:18px;margin:0 4px;'
            }
        },
        mounted() {
            this.interval = setInterval(() => {
                if (this.flag == true) {
                    clearInterval(this.interval)
                }
                this.timeDown()
            }, 500)
        },
        methods: {
            timeDown() {
                const endTime = new Date(this.endTime)
                const nowTime = this.nowTime || new Date().getTime();
                let leftTime = parseInt((endTime.getTime() - nowTime) / 1000)
                let d = parseInt(leftTime / (24 * 60 * 60))
                let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
                let m = this.formate(parseInt(leftTime / 60 % 60))
                let s = this.formate(parseInt(leftTime % 60))
                if (leftTime <= 0) {
                    this.flag = true
                    this.$emit('time-end')
                }
                this.time = this.isDetail ?
                    `<span style="color:${this.color};${this.styles}">${d}</span>天<span style="color:${this.color};${this.styles}">${h}</span>小时<span style="color:${this.color};${this.styles}">${m}</span>分<span style="color:${this.color};${this.styles}">${s}</span>秒` :
                    `<span style="color:${this.color}">${d}</span>天<span style="color:${this.color}">${h}</span>小时<span style="color:${this.color}">${m}</span>分<span style="color:${this.color}">${s}</span>秒`
            },
            formate(time) {
                if (time >= 10) {
                    return time
                } else {
                    return `0${time}`
                }
            }
        },
        watch: {
            'endTime': function(newValue) {
                clearInterval(this.interval);
                this.flag = false;
                setTimeout(() => {
                    this.interval = setInterval(() => {
                        this.timeDown()
                    }, 500)
                }, 500)
    
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .time-warp {
        display: inline-block;
        min-width: 140px;
        &.green .out span {
            color: @dark_green;
        }
        &.red .out span {
            color: @dark_red;
        }
    }
</style>

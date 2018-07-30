
<template>
    <div class="time-warp">
        <div v-if="!flag">
            <span v-if="time == ''">计算中...</span>
            <span v-else>{{time}}</span>
        </div>
        <span v-else>已结束</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: '',
                flag: false,
                interval: null
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
        props: {
            endTime: {
                type: [String, Number]
            },
            nowTime: {
                type: [String, Number],
                default: undefined
            }
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
                this.time = `${d}天${h}小时${m}分${s}秒`
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
                this.interval = setInterval(() => {
                    if (this.flag == true) {
                        clearInterval(this.interval)
                    }
                    this.timeDown()
                }, 500)
            }
        }
    }
</script>

<style scoped>
    .time-warp {
        display: inline-block;
        width: 140px;
    }
</style>

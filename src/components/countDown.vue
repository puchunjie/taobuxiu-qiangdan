<style lang="less">
    @import '../assets/base.less';
    .cd {
        display: inline-block;
        font-size: 14px;
        color: #FE5252;
        span {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
            background-color: #FE5252;
            margin: 0 2px;
            .borderRadius;
        }
    }
</style>

<template>
    <div class="cd" :endTime="endTime" :callback="callback" :endText="endText" v-html="content">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: '',
                timer: '',
                now: this.nowTime
            }
        },
        props: {
            endTime: {
                type: [String, Number],
                default: 0
            },
            nowTime: {
                type: [String, Number],
                default: new Date().getTime()
            },
            endText: {
                type: String,
                default: '已结束'
            },
            callback: {
                type: Function,
                default: function() {
    
                }
            },
            normal: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.content = this.normal ? '00:00:00' : '<span>00</span>:<span>00</span>:<span>00</span>';
        },
        mounted() {
            this.action(this.endTime);
            this.countdowm(this.endTime)
        },
        methods: {
            countdowm(timestamp) {
                let normal = this.normal;
                clearInterval(this.timer);
                let self = this;
                this.timer = setInterval(function() {
                    self.now += 1000;
                    let nowTime = new Date()
                    let endTime = new Date(timestamp);
                    let t = endTime.getTime() - self.now;
                    if (t > 0) {
                        let day = Math.floor(t / 86400000);
                        let hour = Math.floor((t / 3600000) % 24);
                        let min = Math.floor((t / 60000) % 60);
                        let sec = Math.floor((t / 1000) % 60);
                        hour = hour < 10 ? "0" + hour : hour;
                        min = min < 10 ? "0" + min : min;
                        sec = sec < 10 ? "0" + sec : sec;
                        let format = normal ? `${hour}:${min}:${sec}` : `<span>${hour}</span>:<span>${min}</span>:<span>${sec}</span>`;
                        self.content = format;
                    } else {
                        clearInterval(self.timer);
                        self.content = self.endText;
                        self._callback();
                    }
                }, 1000);
            },
            _callback() {
                if (this.callback && this.callback instanceof Function) {
                    this.callback(...this);
                }
            },
            action(timestamp) {
                let normal = this.normal;
                this.now += 1000;
                let nowTime = new Date()
                let endTime = new Date(timestamp);
                let t = endTime.getTime() - this.now;
                let day = Math.floor(t / 86400000);
                let hour = Math.floor((t / 3600000) % 24);
                let min = Math.floor((t / 60000) % 60);
                let sec = Math.floor((t / 1000) % 60);
                hour = hour < 10 ? "0" + hour : hour;
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                let format = normal ? `${hour}:${min}:${sec}` : `<span>${hour}</span>:<span>${min}</span>:<span>${sec}</span>`;
                this.content = format;
            }
        },
        watch: {
            'endTime': function(newValue) {
                this.countdowm(newValue)
            }
        }
    }
</script>
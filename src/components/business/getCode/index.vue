<template>
    <div class="code-container">
        <div class="btn-group" @click="getCode" v-show="btnShow">
            <slot></slot>
        </div>
        <span v-show="!btnShow" class="count">{{count}}s重新发送</span>
    </div>
</template>

<script>
    export default {
        props: {
            mobile: {
                type: [String, Number],
            },
            apiUrl: {
                type: String
            },
            timeCount: {
                type: Number,
                default: 60
            }
        },
        data() {
            return {
                btnShow: true,
                count: '',
                timer: null,
            }
        },
        computed: {
            // 验证手机号
            isMobile() {
                let pattern = /^1[358][0123456789]\d{8}$/;
                if (!pattern.test(this.mobile)) {
                    return false;
                }
                return true;
            }
        },
        methods: {
            getCode() {
                if (this.isMobile) {
                    this.countCode();
                    this.$http.post(this.apiUrl, {
                        mobile: this.mobile
                    }).then(res => {
                        if (res.code === 1000) {
                            this.$emit('on-success')
                        } else {
                            this.$Notice.warning({
                                desc: res.message
                            })
                        }
                    })
                } else {
                    this.$Message.error('请输入正确的手机号！')
                }
    
            },
            countCode(formData) {
                if (!this.timer) {
                    this.count = this.timeCount;
                    this.btnShow = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= this.timeCount) {
                            this.count--;
                        } else {
                            this.btnShow = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    .code-container {
        display: inline-block;
        .count {
            display: inline-block;
            width: 100px;
            height: 30px;
            line-height: 30px;
            color: red;
            text-align: center;
            white-space: nowrap;
        }
    }
</style>

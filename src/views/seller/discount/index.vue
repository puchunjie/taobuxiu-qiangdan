<template>
    <div class="discount-container">
        <p class="active-discount">当前优惠：{{ user.proInfo }}</p>
        <div class="text-area">
            <textarea class="publish-area" v-model="proInfo"></textarea>
            <a class="publish" @click="saveDiscount">发布</a>
        </div>
        <div class="hot">
            <p>热门字段</p>
            <div class="hot-item">
                <a v-for="item in temps" :key="item.id" @click="proInfo = item.info">{{ item.info }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import * as types from '@/store/types'
    export default {
        data() {
            return {
                proInfo: '',
                temps: []
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            saveDiscount() {
                if (this.proInfo != '') {
                    this.$http.post(this.$api.saveDiscount, {
                        proInfo: this.proInfo
                    }).then(res => {
                        if (res.code === 1000) {
                            this.$Message.success('发布成功!');
                            // 更新优惠信息
                            this.$store.commit(types.UPDATE_PRO_INFO, this.proInfo);
                            this.proInfo = '';
                        }
                    })
                } else {
                    this.$Message.error('请输入优惠信息！');
                }
            },
            // 获取优惠信息模板
            getDiscounts() {
                this.$http.post(this.$api.getDiscount).then(res => {
                    if (res.code === 1000) {
                        this.temps = res.data;
                    }
                })
            }
        },
        created() {
            this.getDiscounts();
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../assets/base.less';
    .discount-container {
        .active-discount {
            margin-top: 190px;
            text-align: center;
        }
        .text-area {
            position: relative;
            width: 800px;
            height: 48px;
            background-color: #fff;
            margin: 60px auto 0;
            overflow: hidden;
            .publish-area {
                display: block;
                width: 750px;
                height: 30px;
                line-height: 30px;
                margin: 10px 0 0 16px;
                border: 0;
                resize: none;
                &:focus {
                    outline: 0;
                }
            }
            .publish {
                position: absolute;
                display: inline-block;
                width: 80px;
                height: 30px;
                line-height: 30px;
                right: 16px;
                top: 10px;
                background-color: @dark_blue;
                color: #fff;
                text-align: center;
            }
        }
        .hot {
            width: 800px;
            margin: 23px auto 0;
            color: @f_goast;
            .hot-item {
                margin-top: 10px;
                a {
                    display: inline-block;
                    background-color: #fff;
                    color: @f_goast;
                    padding: 3px;
                    margin: 10px 10px 0 0;
                    &:hover {
                        background-color: @dark_blue;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>


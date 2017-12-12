<template>
    <div class="oc-container">
        <innerTitle>起草合同</innerTitle>
        <div class="oc-main">
            <div class="step-wrap">
                <div class="item" v-for="(step,i) in steps" :key="i" :class="{'active':nowSetp == i+1}" :style="{zIndex:steps.length - i}">
                    <span class="step-count">{{ i+1 }}</span>{{ step }}
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import innerTitle from '@/components/business/innerTitle.vue'
    export default {
        components: {
            innerTitle
        },
        data() {
            return {
                steps: ['选择签约方', '选择签约订单', '确认我方信息', '开始起草合同'],
                nowSetp: 1
            }
        },
        methods: {
            setStep(val) {
                this.nowSetp = val.replace(/[^0-9]/ig, "");
            },
            //查询是否认证
            queryBaseInfo() {
                this.$http.post(this.$api.queryBaseInfo).then(res => {
                    if (res.code === 1000) {
                        if (res.data == '') {
                            this.$Modal.confirm({
                                content: '对不起您还没有认证，是否前往认证？',
                                onOk: () => {
                                    let routerName = this.$route.params.type == 1 ? 'BocAuthen' : 'SocAuthen';
                                    this.$router.push({
                                        name: routerName
                                    });
                                }
                            });
                        }
                    }
                })
            }
        },
        watch: {
            '$route.name' (val) {
                this.setStep(val)
            }
        },
        created() {
            this.setStep(this.$route.name);
            this.queryBaseInfo();
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../assets/base.less');
    .oc-container {
        width: 100%;
    }
    
    .oc-main {
        width: 100%;
        background-color: #fff;
        padding-bottom: 85px;
        border: @b_d1;
        font-size: 12px;
    }
    
    .step-wrap {
        width: 100%;
        height: 51px;
        line-height: 50px;
        border-bottom: @b_d1;
        font-size: 14px;
        color: @f_goast;
        .item {
            position: relative;
            width: 25%;
            height: 100%;
            text-align: center;
            float: left;
            &:not(:last-child):before {
                position: absolute;
                content: '';
                right: -20px;
                width: 0;
                height: 0;
                border-top: 25px solid transparent;
                border-left: 20px solid @back_gray;
                border-bottom: 25px solid transparent;
            }
            &:not(:last-child):after {
                position: absolute;
                content: '';
                right: -19px;
                top: 1px;
                width: 0;
                height: 0;
                border-top: 24px solid transparent;
                border-left: 19px solid #fff;
                border-bottom: 24px solid transparent;
            }
            .step-count {
                display: inline-block;
                width: 22px;
                height: 22px;
                line-height: 18px;
                border: 2px solid @f_goast;
                margin-right: 8px;
                .borderRadius(11px);
            }
            &.active {
                background-color: @mask_blue;
                color: #fff;
                &:after {
                    border-left-color: @mask_blue;
                }
                .step-count {
                    border-color: #fff;
                }
            }
        }
    }
    
    .oc-search {
        position: relative;
        width: 100%;
        height: 34px;
        margin: 20px 0;
        padding: 0 20px;
        .search-input {
            display: inline-block;
            width: 360px;
            height: 34px;
            border: @b_d1;
            background-color: @goast_gray;
            margin-right: 30px;
            input {
                display: inline-block;
                width: 280px;
                height: 100%;
                border: 0;
                margin: 0;
                outline: none;
                padding: 0 12px;
                border-right: @b_d1;
                background-color: #fff;
            }
            a {
                display: inline-block;
                width: 70px;
                height: 100%;
                text-align: center;
                color: @f_goast;
            }
        }
        .time-limit {
            display: inline-block;
            width: 280px;
            margin-right: 30px;
            .select {
                width: 150px;
            }
        }
        .btns {
            display: inline-block;
            .btn {
                display: inline-block;
                width: 90px;
                height: 32px;
                line-height: 28px;
                border: 2px solid @dark_blue;
                color: #fff;
                text-align: center;
                background-color: @dark_blue;
            }
            .goast {
                background-color: #fff;
                color: @dark_blue;
                margin-left: 20px;
            }
        }
    }
    
    .oc-table {
        position: relative;
        width: 100%;
        padding: 0 20px;
        color: @f_dark;
        table {
            width: 100%;
            border: @b_d1;
        }
        th {
            background-color: @table_headbg;
            height: 34px;
            text-align: center;
            &.company-name {
                width: 340px;
                text-indent: 80px;
                text-align: left;
            }
        }
        td {
            height: 48px;
            border-top: @b_d1;
            text-align: center;
            &.company-name {
                text-align: left;
                text-indent: 40px;
            }
            & .pick {
                display: inline-block;
                width: 58px;
                height: 24px;
                line-height: 22px;
                border: 1px solid @mask_blue;
                color: @mask_blue;
                .noselect;
            }
        }
    }
    
    .oc-bottom {
        width: 100%;
        text-align: right;
        margin: 20px 0;
        padding: 0 20px;
    }
    
    .empty {
        width: 100%;
        min-height: 270px;
        text-align: center;
        background-color: #fff;
        img {
            display: inline-block;
            width: 230px;
            margin-top: 20px;
        }
    }
</style>

<template>
    <div class="authen-container">
        <innerTitle>认证信息</innerTitle>
        <div class="at-main">
            <div class="to-at" v-show="!startAt">
                <p class="tip">
                    <span class="iconfont icon-about"></span> 请您确认以下主体信息的准确性，如不准确，请尽快完成变更；如遇问题，请联系平台客服：0510-81812186
                </p>
                <div v-if="isRz">
                    <p style="margin-top:40px;font-size:14px;">您暂未认证合同主体信息</p>
                    <a class="btn" @click="startAtAction">立即认证</a>
                </div>
                <div v-else>
                    <h2 class="sub-tit">以下是您的电子合同认证信息</h2>
                    <div class="form-text">
                        <div class="group"><label>企业抬头：</label>{{ rzInfo.companyName }}</div>
                        <div class="group"><label>主体类型：</label>{{ rzInfo.userType | userTypeStr }}</div>
                        <div class="group"><label>主体证件类型：</label>{{ rzInfo.certifyType | certifyTypeStr }}
                            <viewPic :imgUrl="rzInfo.businessLicense">查看图片</viewPic>
                        </div>
                        <div class="group"><label>主体证件号码：</label>{{ rzInfo.certifyNumber }}</div>
                        <div class="group"><label>主体所属区域：</label>{{ rzInfo.locationName }}</div>
                        <div class="group"><label>主体单位通讯地址：</label>{{ rzInfo.address }}</div>
                        <div class="group"><label>认证负责人姓名：</label>{{ rzInfo.legalPersonName }}
                            <viewPic :imgUrl="rzInfo.businessCertificate">查看企业授权书</viewPic>
                        </div>
                        <div class="group"><label>负责人证件类型：</label>{{ rzInfo.legalPersonCertifyType | certifyTypeStr }}
                            <viewPic :imgUrl="rzInfo.legalPersonCardPhotoA">查看正面</viewPic>
                            <viewPic :imgUrl="rzInfo.legalPersonCardPhotoB">查看反面</viewPic>
                        </div>
                        <div class="group"><label>负责人证件号：</label>{{ rzInfo.legalPersonCardId }}</div>
                        <div class="group"><label>负责人手机号：</label>{{ rzInfo.legalPersonMobile }}</div>
                        <div class="group"><label>最后更新时间：</label>{{ rzInfo.updateTime }}</div>
                        <div class="group"><label>认证状态：</label><span :class="'state state-'+rzInfo.status">{{ rzInfo.status | stateStr }}</span> <a v-show="rzInfo.status == 9" @click="showFalid(rzInfo.remark)">查看原因</a></div>
                        <div class="group">
                            <label></label>
                            <a class="btn" v-show="rzInfo.status == 1" @click="rzAgin">变更信息</a>
                            <a class="btn" v-show="rzInfo.status == 9" @click="rzAgin">再次认证</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-wrap" v-show="startAt">
                <div class="item" v-for="(step,i) in steps" :key="i" :class="{'active':nowSetp == i+1}" :style="{zIndex:steps.length - i}">
                    <span class="step-count">{{ i+1 }}</span>{{ step }}
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import innerTitle from '@/components/business/innerTitle.vue'
    import viewPic from '@/components/basics/viewPic/index.vue'
    export default {
        components: {
            innerTitle,
            viewPic
        },
        data() {
            return {
                isRz: false, //是否认证
                startAt: false, //是否开始认证
                steps: ['填写基本信息', '上传资料', '提交成功，等待审核'],
                nowSetp: 1,
                rzInfo: {}
            }
        },
        computed: {
            ...mapGetters(['ajaxHead']),
            type() {
                return this.$route.params.type
            }
        },
        filters: {
            stateStr(value) {
                switch (Number(value)) {
                    case 1:
                        return '认证成功'
                        break;
                    case 2:
                        return '审核中'
                        break;
                    case 9:
                        return '认证失败'
                        break;
                    default:
                        break;
                }
            }
        },
        methods: {
            setStep(val) {
                this.nowSetp = val.replace(/[^0-9]/ig, "");
                if (this.nowSetp == '')
                    this.startAt = false;
            },
            startAtAction() {
                this.startAt = true;
                this.$router.replace({
                    name: this.type == 1 ? 'BatStep1' : 'SatStep1'
                })
            },
            // 验证商户是否认证
            queryBaseInfo() {
                this.$http.post(this.$api.queryBaseInfo).then(res => {
                    if (res.code === 1000) {
                        this.isRz = res.data == '';
                        this.rzInfo = res.data;
                    }
                })
            },
            //再次认证
            rzAgin() {
                let data = this.$clearData(this.rzInfo);
                data.v = this.ajaxHead.loginId;
                console.log(data);
                this.$ls.set('rzInfo', data);
                this.startAtAction();
            },
            showFalid(text) {
                this.$Modal.error({
                    render: (h) => {
                        return h('p', {
                            domProps: {
                                innerHTML: text
                            },
                            style: {
                                color: 'red',
                                fontSize: '14px'
                            }
                        })
                    }
                })
            }
        },
        watch: {
            '$route.name' (val) {
                this.setStep(val);
            }
        },
        created() {
            this.queryBaseInfo();
            if (this.$route.name != 'BocAuthen' && this.$route.name != 'SocAuthen') {
                this.startAt = true;
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('./index.less');
</style>


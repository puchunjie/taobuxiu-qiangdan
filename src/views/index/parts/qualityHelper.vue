<template>
    <div class="quality-container">
        <div class="tit">质检助手</div>
        <div class="form">
            <div class="input-item-warp wid-quality" ref="inDoorTime">
                <label style="float:left">时间</label>
                <DatePicker placement="bottom-end" :options="dataOptions" v-model="apiData.inDoorTime" class="goast-picker level1" type="datetime"></DatePicker>
            </div>
            <div class="input-item-warp wid-quality" ref="place">
                <label>地点</label>
                <input v-model="apiData.place" class="goast-input level1" type="text">
            </div>
            <div class="input-item-warp wid-quality" ref="company">
                <label>公司</label>
                <input v-model="apiData.company" @focus="showRelation('autoCompany')" @blur="showRelation('autoCompany')" class="goast-input level1" type="text">
                <div class="relation-content" v-show="autoCompany">
                    <div class="tag" @click="fillData('company',user.companyName)">
                        {{ user.companyName }}
                    </div>
                </div>
            </div>
            <div class="input-item-warp wid-quality" ref="contactName">
                <label>联系人</label>
                <input v-model="apiData.contactName" @focus="showRelation('autoContactName')" @blur="showRelation('autoContactName')" class="goast-input level1" type="text">
                <div class="relation-content" v-show="autoContactName">
                    <div class="tag" @click="fillData('contactName',user.contact)">
                        {{ user.contact }}
                    </div>
                </div>
            </div>
            <div class="input-item-warp wid-quality" ref="contactPhone">
                <label>联系电话</label>
                <input v-model="apiData.contactPhone" @focus="showRelation('autoContactPhone')" @blur="showRelation('autoContactPhone')" class="goast-input level1" type="text">
                <div class="relation-content" v-show="autoContactPhone">
                    <div class="tag" @click="fillData('contactPhone',user.contactNum)">
                        {{ user.contactNum }}
                    </div>
                </div>
            </div>
    
            <!-- <a class="btn" @click="commit">提交申请</a> -->
            <Button type="primary" @click="commit" :loading="loading" long>提交申请</Button>
        </div>
        <div v-if="!isLogin" class="disable-mask">
            <router-link class="login-btn" :to="{name:'login',query: { redirect: $router.currentRoute.fullPath }}">去登录</router-link>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import {
        dateformat
    } from '@/filters'
    export default {
        data() {
            return {
                apiData: {
                    inDoorTime: '',
                    place: '',
                    company: '',
                    contactName: '',
                    contactPhone: ''
                },
                loading: false,
                autoCompany: false,
                autoContactName: false,
                autoContactPhone: false,
                dataOptions: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['user']),
            isLogin() {
                return this.user != ''
            }
        },
        methods: {
            resetData(){
                this.apiData = {
                    inDoorTime: '',
                    place: '',
                    company: '',
                    contactName: '',
                    contactPhone: ''
                }
            },
            commit() {
                // console.log(this.checkEmpty)
                if (this.checkEmpty()) {
                    this.loading = true;
                    let params = this.$clearData(this.apiData);
                    params.inDoorTime = dateformat(params.inDoorTime);
                    this.$http.post(this.$api.applyQuality, params).then(res => {
                        if (res.code === 1000) {
                            this.$Message.success('提交成功');
                            this.resetData();
                            this.loading = false;
                        }
                    })
                } else {
                    this.$Message.error('请将信息正确填写完整！')
                }
            },
            showRelation(tag) {
                setTimeout(() => {
                    this[tag] = !this[tag];
                }, 100);
            },
            fillData(tag, data) {
                this.apiData[tag] = data;
            },
            // 检查是否为空
            checkEmpty() {
                let isOk = true;
                _.forEach(this.apiData, (val, key) => {
                    let tag = this.$refs[key]
                    if (val == '') {
                        this.setErr(tag);
                        isOk = false
                    } else {
                        this.removeErr(tag)
                    }
                })
                return isOk
            },
            // 取消输入错误提示
            removeErr(el) {
                let elClassName = el.className;
                if (elClassName.indexOf('on-err') > 0) {
                    let reg = new RegExp("on-err", "g");
                    el.className = elClassName.replace(reg, "").replace(/(^\s*)|(\s*$)/g, "")
                }
            },
            // 设置输入错误提示
            setErr(el) {
                let elClassName = el.className;
                if (elClassName.indexOf('on-err') < 0) {
                    el.className = elClassName + ' ' + 'on-err';
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../assets/base.less';
    .tit {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        padding: 0 27px;
        font-weight: bold;
        border-bottom: @b_d1;
    }
    
    .form {
        width: 100%;
        padding: 20px 30px;
        .input-item-warp {
            margin: 0 0 16px 0;
            float: none;
            label {
                display: inline-block;
                width: 56px;
            }
            &.wid-quality {
                width: 252px;
                .level1 {
                    width: 155px;
                }
            }
        }
        .btn {
            display: inline-block;
            width: 100%;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 16px;
            color: #fff;
            background-color: @dark_blue;
            .borderRadius;
        }
    }
    
    .quality-container {
        .disable-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: rgba(255, 255, 255, 0);
            z-index: 10;
            text-align: center;
            line-height: 420px;
            .transition(background-color .5s);
        }
        &:hover {
            .disable-mask {
                background-color: rgba(255, 255, 255, .7);
            }
            .login-btn {
                .opacity(1);
            }
        }
        .login-btn {
            display: inline-block;
            width: 80px;
            height: 30px;
            line-height: 30px;
            background-color: @dark_blue;
            color: #fff;
            .borderRadius;
            .opacity(0);
            .transition(opacity .5s);
        }
    }
</style>


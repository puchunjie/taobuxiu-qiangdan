<style lang="less" scoped>
    @import '../../assets/base.less';
    .base-info-container {
        padding: 10px 60px 20px 60px;
        margin-top: 20px;
        background-color: #fff;
        border: @b_d1;
        .tab {
            width: 100%;
            height: 60px;
            line-height: 60px;
            border-bottom: @b_d1;
            .tab-item {
                display: inline-block;
                width: 70px;
                height: 59px;
                margin: 0 20px 0 10px;
                text-align: center;
                font-size: 16px;
                color: @f_dark;
                border-bottom: 4px solid #fff;
                &.active {
                    border-color: @dark_blue;
                    font-weight: 500;
                }
            }
        }
        .tab-contnet {
            .form {
                width: 400px;
                margin: 30px 0 0 60px;
                .form-input {
                    width: 200px;
                }
                .btn {
                    display: inline-block;
                    padding: 0 17px;
                    background-color: @dark_blue;
                    color: #fff;
                    margin-right: 10px;
                    .borderRadius;
                    &.goast {
                        background-color: #fff;
                        color: @dark_blue;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="base-info-container inner-container">
        <div class="tab">
            <a class="tab-item" :class="{'active':active == index}" @click="selectTab(index)" v-for="(tab,index) in tabs" :key="index">{{ tab.name }}</a>
        </div>
        <div class="tab-contnet">
            <!-- 基本信息 -->
            <i-form class="form" :model="userData" :rules="userDataRule" :label-width="90" v-show="active == 0" ref="userInfo">
                <form-item label="用户名">
                    {{ base.mobile }}
                </form-item>
                <form-item label="公司名称">
                    {{ user.companyName }}
                </form-item>
                <form-item label="联系人" prop="contact">
                    <i-input placeholder="请输入" v-model="userData.contact" class="form-input"></i-input>
                </form-item>
                <form-item label="联系电话" prop="contactNum">
                    <i-input placeholder="请输入联系电话" v-model="userData.contactNum" class="form-input"></i-input>
                </form-item>
                <form-item label="QQ" prop="qq">
                    <i-input placeholder="请输入QQ" v-model="userData.qq" class="form-input"></i-input>
                </form-item>
                <form-item label="办公地址" prop="provinceId">
                    <citySelect class="form-input" :value="[userData.provinceId,userData.cityId,userData.districtId]" @on-select="asyncAdress"></citySelect>
                </form-item>
                <form-item prop="address">
                    <i-input placeholder="请输入详细地址" v-model="userData.address" style="width:300px"></i-input>
                </form-item>
                <form-item label="仓库" prop="storeHouseId">
                    <ajaxSelect class="form-input" :api="$api.getStores" :value="userData.storeHouseId+'-'+userData.storeHouseName" @on-select="asyncStore"></ajaxSelect>
                </form-item>
                <form-item>
                    <a class="btn" @click="save">保存</a>
                    <a class="btn" @click="backLink">返回</a>
                </form-item>
            </i-form>
    
            <!-- 修改密码 -->
            <i-form class="form" :model="passWord" :rules="passWordRule" :label-width="90" ref="password" v-show="active == 1">
                <form-item label="旧密码" prop="oldPwd">
                    <i-input placeholder="请输入旧密码" type="password" v-model="passWord.oldPwd" class="form-input"></i-input>
                </form-item>
                <form-item label="新密码" prop="newPwd">
                    <i-input placeholder="请输入新密码" type="password" v-model="passWord.newPwd" class="form-input"></i-input>
                </form-item>
                <form-item label="重复新密码" prop="reNewPwd">
                    <i-input placeholder="重新输入新密码" type="password" v-model="passWord.reNewPwd" class="form-input"></i-input>
                </form-item>
                <form-item>
                    <a class="btn" @click="savePsd">确认修改</a>
                </form-item>
            </i-form>
        </div>
    </div>
</template>

<script>
    import * as types from '@/store/types'
    import ajaxSelect from '@/components/basics/ajaxSelect/index'
    import citySelect from '@/components/basics/citySelect/index'
    import {
        mapGetters
    } from 'vuex'
    export default {
        components: {
            ajaxSelect,
            citySelect
        },
        data() {
            return {
                userData: {
                    id: '',
                    contact: '',
                    contactNum: '',
                    qq: '',
                    provinceId: '',
                    provinceName: '',
                    cityId: '',
                    cityName: '',
                    districtId: '',
                    districtName: '',
                    storeHouseId: '',
                    storeHouseName: '',
                    address: ''
                },
                userDataRule: {
                    contact: [{
                        required: true,
                        message: '联系人不能为空',
                        trigger: 'blur'
                    }],
                    contactNum: [{
                        required: true,
                        message: '联系电话不能为空',
                        trigger: 'blur'
                    }],
                    qq: [{
                        required: true,
                        message: 'QQ不能为空',
                        trigger: 'blur'
                    }],
                    provinceId: [{
                        required: true,
                        message: '请选择办公地址',
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '详细地址不能为空',
                        trigger: 'blur'
                    }],
                    storeHouseId: [{
                        required: true,
                        message: '请选择仓库',
                        trigger: 'change'
                    }],
                },
                passWord: {
                    oldPwd: '',
                    newPwd: '',
                    reNewPwd: ''
                },
                passWordRule: {
                    oldPwd: [{
                        required: true,
                        message: '旧密码不能为空',
                        trigger: 'blur'
                    }],
                    newPwd: [{
                        required: true,
                        message: '新密码不能为空',
                        trigger: 'blur'
                    }],
                    reNewPwd: [{
                        required: true,
                        message: '新密码重复不能为空',
                        trigger: 'blur'
                    }, {
                        validator: (rule, value, callback) => {
                            if (value != this.passWord.newPwd) {
                                return callback(new Error(rule.message));
                            } else {
                                callback();
                            }
                        },
                        message: '请输入相同的新密码',
                        trigger: 'blur'
                    }],
                },
                tabs: [{
                        name: '基本信息'
                    },
                    {
                        name: '账号安全'
                    }
                ],
                active: 0
            }
        },
        computed: {
            ...mapGetters(['user', 'base']),
            // 是否有新版本的地址信息？
            isNewAdress() {
                return this.user.provinceId != ''
            }
        },
        methods: {
            // 切换tab
            selectTab(i) {
                this.active = i;
            },
            // 同步仓库信息
            asyncStore(data) {
                this.userData.storeHouseId = data.id;
                this.userData.storeHouseName = data.name;
            },
            //同步地区
            asyncAdress(data) {
                this.userData.provinceId = data.provinceId;
                this.userData.provinceName = data.provinceName;
                this.userData.cityId = data.cityId;
                this.userData.cityName = data.cityName;
                this.userData.districtId = data.districtId;
                this.userData.districtName = data.districtName;
            },
            // 初始化userData
            resetUserData(val) {
                this.userData = {
                    id: val.id,
                    contact: val.contact,
                    contactNum: val.contactNum,
                    qq: val.qq,
                    provinceId: val.provinceId,
                    provinceName: val.provinceName,
                    cityId: val.cityId,
                    cityName: val.cityName,
                    districtId: val.districtId,
                    districtName: val.districtName,
                    storeHouseId: val.storeHouseId,
                    storeHouseName: val.storeHouseName,
                    address: val.address
                }
            },
            // 保存修改
            save() {
                this.$refs.userInfo.validate((valid) => {
                    if (valid) {
                        let params = this.$clearData(this.userData);
                        this.$http.post(this.$api.updateBuserInfo, params).then(res => {
                            if (res.code === 1000) {
                                this.$store.commit(types.UPDATE_USER_INFO, res.data);
                                this.$Message.success('修改成功!');
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //返回
            backLink() {
                this.$router.go(-1)
            },
            // 修改密码
            savePsd() {
                this.$refs.password.validate((valid) => {
                    if (valid) {
                        let params = this.$clearData(this.passWord);
                        this.$http.post(this.$api.updatePsd, params).then(res => {
                            if (res.code === 1000) {
                                this.$Message.success('修改成功!');
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        created() {
            this.resetUserData(this.user);
        },
        watch: {
            user(val){
                this.resetUserData(val)
            }
        }
    }
</script>





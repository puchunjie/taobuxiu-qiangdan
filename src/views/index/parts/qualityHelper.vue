<template>
    <div>
        <div class="tit">质检助手</div>
        <div class="form">
            <div class="input-item-warp wid-quality">
                <label style="float:left">时间</label>
                <DatePicker v-model="apiData.inDoorTime" class="goast-picker level1" type="datetime"></DatePicker>
            </div>
            <div class="input-item-warp wid-quality">
                <label>地点</label>
                <input v-model="apiData.place" class="goast-input level1" type="text">
            </div>
            <div class="input-item-warp wid-quality">
                <label>公司</label>
                <input v-model="apiData.company" class="goast-input level1" type="text">
            </div>
            <div class="input-item-warp wid-quality">
                <label>联系人</label>
                <input v-model="apiData.contactName" class="goast-input level1" type="text">
            </div>
            <div class="input-item-warp wid-quality">
                <label>联系电话</label>
                <input v-model="apiData.contactPhone" class="goast-input level1" type="text">
            </div>
            
            <a class="btn" @click="commit">提交申请</a>
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
        data () {
            return {
                apiData:{
                    inDoorTime:new Date(),
                    place:'',
                    company: '',
                    contactName:'',
                    contactPhone: ''
                }
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            commit(){
                let params = this.$clearData(this.apiData);
                params.inDoorTime = dateformat(params.inDoorTime);
                this.$http.post(this.$api.applyQuality,params).then(res => {
                    if(res.code === 1000){
                        
                    }
                })
            }
        },
        created () {
            if(this.user.companyName){
                this.apiData.company = this.user.companyName;
                this.apiData.contactName = this.user.contact;
                this.apiData.contactPhone = this.user.contactNum;
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
            label{
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
        .btn{
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
</style>


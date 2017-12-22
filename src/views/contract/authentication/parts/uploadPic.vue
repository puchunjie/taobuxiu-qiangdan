<template>
    <div class="upload-pic-container">
        <p class="tit" v-show="title!=''">{{ title }}:</p>
        <div class="upload-wrap">
            <Spin fix v-show="uploadLoading"></Spin>
            <Upload :show-upload-list="false" :headers="ajaxHead" type="drag" :action="$api.uploadPic" :format="['jpg','jpeg','png']" :max-size="2048" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                :before-upload="setLoading" :on-error="ctryErr">
                <div style="padding: 20px 0;margin:0 auto" v-show="imgSrc == ''">
                    <span class="iconfont icon-upload"></span>
                    <p class="tip">点击上传</p>
                </div>
                <div class="img-cover" v-show="imgSrc != ''">
                    <img :src="imgSrc">
                    <div class="over-upload">重新上传</div>
                </div>
         </Upload>
            
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            value: {
                type: String
            }
        },
        data() {
            return {
                uploadLoading: false,
                imgSrc: ''
            }
        },
        computed: {
            ...mapGetters(['ajaxHead'])
        },
        watch: {
            imgSrc(val) {
                this.$emit('input', val)
            }
        },
        methods: {
            setLoading() {
                this.uploadLoading = true;
            },
            handleSuccess(res, file) {
                let pres = JSON.parse(res);
                console.log(pres)
                this.imgSrc = this.$api.aliClound + pres[0].url;
                this.$Message.success('上传成功！');
                this.uploadLoading = false;
            },
            ctryErr(error) {
                this.$Notice.warning({
                    title: '上传异常!',
                    desc: error
                });
                this.uploadLoading = false;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '上传文件类型错误！',
                    desc: '您上传的： ' + file.name + ' 格式不正确, 请选择(.png,.jpg,.jpeg)后缀的文件。'
                });
                this.uploadLoading = false;
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '上传文件超出尺寸',
                    desc: '您上传的：  ' + file.name + ' 太大了, 不得超过2MB。'
                });
                this.uploadLoading = false;
            }
        },
        mounted() {
            if (this.value)
                this.imgSrc = this.value;
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../../../assets/base.less');
    .upload-pic-container {
        display: inline-block;
        width: 240px;
        vertical-align: middle;
        font-size: 14px;
        margin-right: 20px;
        .tit {
            margin-bottom: 10px;
        }
        .upload-wrap {
            position: relative;
            width: 240px;
            height: 150px;
            background-color: #fff;
            .icon-upload {
                font-size: 50px;
                color: #D8D8D8;
            }
            .tip {
                color: #D8D8D8;
                font-size: 14px;
                margin: 10px 0 30px 0;
            }
            .img-cover {
                position:relative;
                width: 100%;
                height: 150px;
                background-color: #fff;
                padding: 5px;
                border: @b_d1;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .over-upload{
                    display:none;
                    position:absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #000;
                    .opacity(.5);
                    color: #fff;
                    text-align:center;
                    line-height: 150px;
                    cursor: pointer;
                }
                &:hover .over-upload{
                    display: block;
                }
            }
        }
    }
</style>

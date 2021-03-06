<template>
    <div class="upload-container excel-panel" v-if="visible">
        <div class="inner-wrap">
            <Spin fix v-show="uploadLoading">正在上传，请耐心等待...</Spin>
            <div class="header">{{ step == 1 ? '上传Excel' : '最近5条上传的历史记录' }}
                <span class="close iconfont icon-close" @click="close"></span>
            </div>
            <div class="excel-content" v-show="step == 1">
                <div class="type-select">
                    <a class="riado-group" @click="type = 1">
                        <span class="iconfont" :class="type == 1 ? 'icon-radioacheck' : 'icon-radio'"></span>
                        <label>板卷类</label>
                    </a>
                    <a class="riado-group" @click="type = 2" v-show="!isDk">
                        <span class="iconfont" :class="type == 2 ? 'icon-radioacheck' : 'icon-radio'"></span>
                        <label>非板卷类</label>
                    </a>
                </div>
                <div class="file-upload">
                    <p class="file-show">{{ fileName }}</p>
                    <Upload class="btn" ref="upload" :show-upload-list="false" :headers="ajaxHead" :data="{type:type}" :on-success="handleSuccess" :format="['xlsx']" :max-size="1024" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="beforeUp" :on-error="ctryErr"
                        :action="uploadApi">
                        上传
                    </Upload>
                    <a class="goast" v-if="!canDown" @click="noPass">下载模板</a>
                    <a class="goast" v-else :href="$api.aliClound + excelUrl" download @click="countNum">下载模板</a>
                    <a class="goast" @click="getHistory">下载历史文件</a>
                </div>
                <p class="tip"><span>* </span>必须使用<a>《淘不锈接单版-资源标准模板》</a>，填好资源后上传。</p>
                <p class="tip"><span>* </span>使用表格模板导入，当部分参数组合与已存在资源完全相同时会自动替换，文件大小不能超多1M。</p>
            </div>
    
            <div class="upload-history" v-show="step != 1">
                <table>
                    <thead>
                        <tr>
                            <th>文件名</th>
                            <th>上传时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in historyList" :key="i">
                            <td>{{ item.fileName }}</td>
                            <td>{{ item.createTime | dateformat }}</td>
                            <td>
                                <a target="_blank" :href="$api.aliClound + item.excelUrl + '.html'">预览</a>
                                <a :href="$api.aliClound + item.excelUrl" download>下载</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            isDk: {
                type: Boolean,
                default: false
            },
            uploadApi: String,
            historyApi: String,
            storeType: [String,Number]
        },
        data() {
            return {
                visible: false,
                fileName: '',
                type: 1,
                step: 1,
                historyList: [],
                uploadLoading: false,
                excelUrl: '',
                excelName:'',
                excelId:'',
                canDown: false
            }
        },
        computed: {
            ...mapGetters(['ajaxHead']),
            excelType(){
                return {
                    storeType: this.storeType,
                    type: this.type
                }
            }
        },
        watch: {
            visible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.visible = val
            },
            type(){
                this.getExcelUrl();
            }
        },
        methods: {
            close() {
                this.visible = false;
                this.step = 1;
                this.type = 1;
                this.file = '';
                this.uploadLoading = false;
                this.historyList = [];
                this.excelName = '';
            },
            // 获取历史记录
            getHistory() {
                this.$http.post(this.historyApi, {
                    type: this.type,
                    pageSize: 5
                }).then(res => {
                    if (res.code === 1000) {
                        this.historyList = res.data;
                        if (this.historyList.length > 0) {
                            this.step = 2;
                        } else {
                            this.$Notice.warning({
                                title: '提示！',
                                desc: '您还没有上传过文件。'
                            });
                        }
                    }
                })
            },
            beforeUp() {
                this.uploadLoading = true;
            },
            handleSuccess(res, file) {
                if (res.code === 1000) {
                    this.$Message.success('上传成功！');
                    this.fileName = res.data.fileName;
                    this.visible = false;
                    this.$emit('on-upload-success');
                } else {
                    this.$Notice.error({
                        title: '上传异常!',
                        desc: res.message
                    });
                }
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
                    desc: '您上传的： ' + file.name + ' 格式不正确, 请选择.xlsx后缀的文件。'
                });
                this.uploadLoading = false;
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '上传文件超出尺寸',
                    desc: '您上传的：  ' + file.name + ' 太大了, 不得超过1MB。'
                });
                this.uploadLoading = false;
            },
            // 获取EXCEL模板地址
            getExcelUrl(){
                this.$http.post(this.$api.selectExecleUrlByType,this.excelType).then(res => {
                    if(res.code === 1000){
                        this.canDown = true;
                        this.excelId = res.data.modelId;
                        this.excelUrl = res.data.modelUrl;
                        this.excelName = res.data.modelUrl.split("/")[res.data.modelUrl.split("/").length-1].split(".")[0]
                    }else{
                        this.canDown = false;
                    }
                })
            },
            countNum(){
                let params = {fileName:this.excelName,url:this.excelUrl,modelId:this.excelId};
                let fparams = Object.assign(params,this.excelType);
                this.$http.post(this.$api.downloadExcel,fparams);
            },
            noPass(){
                this.$Notice.warning({
                    title: '下载异常',
                    desc: '您下载的模板在服务器上消失了！'
                });
            }
        },
        mounted() {
            this.visible = this.value;
            this.getExcelUrl()
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../../assets/resources.less");
</style>

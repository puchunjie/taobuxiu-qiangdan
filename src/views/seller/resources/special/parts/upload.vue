<template>
    <div class="upload-container upload-plan" v-if="visible">
        <div class="inner-wrap">
            <div class="header">{{ strs.title }}<span class="close iconfont icon-close" @click="close"></span></div>
            <div class="content">
                <div class="table-tr tr-header">
                    <div class="table-td iron">品类</div>
                    <div class="table-td material">材质</div>
                    <div class="table-td surface">表面</div>
                    <div class="table-td proPlace">产地</div>
                    <div class="table-td spec">规格</div>
                    <div class="table-td tolerance">公差</div>
                    <div class="table-td measuring">计量方式</div>
                    <div class="table-td price">单价(元/吨)</div>
                    <div class="table-td tax">含税</div>
                    <div class="table-td location">所在地</div>
                    <div class="table-td stock">库存量</div>
                    <div class="table-td warehouse">仓库</div>
                    <div class="table-td operation" v-show="!isEdit">操作</div>
                </div>
                <uploadItem @add="addItem" @copy="copyItem" @del="delItem" :index="i" v-for="(item,i) in list" :key="item.uuId" v-model="list[i]" :isEdit="isEdit"></uploadItem>
            </div>
            <div class="bottom-btns">
                <a class="btn" @click="publish">{{ strs.btn }}</a>
                <a class="btn goast" @click="close">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
    import uploadItem from './uploadItem'
    import cloneDeep from 'lodash/cloneDeep'
    import {
        getuuId
    } from '@/utils/tools.js'
    const item = {
        id: "",
        uuId: "",
        ironTypeId: "",
        ironTypeName: "",
        materialId: "",
        materialName: "",
        surfaceId: "",
        surfaceName: "",
        proPlacesId: "",
        proPlacesName: "",
        length: "",
        width: "",
        height: "",
        specifications: "",
        tolerance: "",
        taxType:"",
        measuringType: "",
        price: "",
        locationId: "",
        locationName: "",
        storeHouseId: "",
        storeHouseName: "",
        storeHouseCount:"",
        appFlag: "1"
    }
    export default {
        components: {
            uploadItem
        },
        props: {
            strs: {
                type: Object,
                default: function(){
                    return {
                        title: '',
                        btn: ''
                    }
                }
            },
            value: {
                type: Boolean,
                default: false
            },
            editList: {
                type: Array
            }
        },
        data() {
            return {
                list: [],
                maxLength: 5,
                visible: false
            }
        },
        computed: {
            // 是否为修改，判断是否有数据传入
            isEdit() {
                return this.editList.length > 0
            },
            //现有条数
            listLength() {
                return this.list.length
            },
            // 是否全部填写完整？
            isAllOk() {
                let ok = true;
                this.list.forEach(el => {
                    if (!el.isOk) {
                        ok = false
                        return false
                    }
                })
                return ok
            }
        },
        methods: {
            addItem() {
                if (this.listLength < 5) {
                    let itemFu = cloneDeep(item);
                    itemFu.uuId = getuuId();
                    this.list.push(itemFu);
                } else {
                    this.$Message.warning('最多同时操作5条数据！');
                }
            },
            copyItem(i) {
                if (this.listLength < 5) {
                    let copyItem = cloneDeep(this.list[i]);
                    copyItem.uuId = getuuId();
                    copyItem.id = "";
                    this.list.push(copyItem);
                } else {
                    this.$Message.warning('最多同时操作5条数据！');
                }
            },
            delItem(i) {
                if (this.listLength > 1) {
                    this.list.splice(i, 1)
                } else {
                    this.$Message.warning('最少保留一条数据!');
                }
            },
            publish() {
                if (this.isAllOk) {
                    let params = JSON.stringify(cloneDeep(this.list));
                    this.$http.post(this.$api.saveAndUpdateSpecialPrice, {
                        storeInfos: params
                    }).then(res => {
                        if (res.code === 1000) {
                            this.$Message.success(this.isEdit ? '修改成功' : '上架成功');
                            this.close();
                            this.$emit('on-ajax-success');
                        } else {
                            this.$Message.error(res.message);
                        }
                    })
                } else {
                    this.$Message.error('请确保数据正确填写!');
                }
            },
            close() {
                this.visible = false;
                this.list = [];
                this.$nextTick(() => {
                    this.addItem();
                });
                this.$parent.editList = [];
            }
        },
        watch: {
            visible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.visible = val
            },
            isEdit(val) {
                if (val) {
                    this.list = [];
                    this.$nextTick(() => {
                        this.list.push(...cloneDeep(this.editList));
                    })
                }
            }
        },
        created() {
            this.addItem();
        },
        mounted() {
            this.visible = this.value
        }
    }
</script>


<style lang="less" scoped>
    @import url("../../../../../assets/resources.less");
    .upload-plan {
        .inner-wrap {
            width: 1210px;
        }
    }
</style>

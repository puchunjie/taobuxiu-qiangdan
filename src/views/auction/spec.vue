<template>
    <div class="auction-spec-container">
        <template v-if="showDeatil">
                <div class="input-warp">
                    <div class="title">厚度</div>
                    <input class="input r" tag="heightMin" v-model="params.heightMin" @input="checkNum" type="text">
                    <span>-</span>
                    <input class="input" tag="heightMax" v-model="params.heightMax" @input="checkNum" type="text">
                </div>
                <div class="input-warp">
                    <div class="title">宽度</div>
                    <input class="input r" tag="widthMin" v-model="params.widthMin" @input="checkNum" type="text">
                    <span>-</span>
                    <input class="input" tag="widthMax" v-model="params.widthMax" @input="checkNum" type="text">
                </div>
                <div class="input-warp">
                    <div class="title">长度</div>
                    <input class="input r" tag="lengthMin" v-model="params.lengthMin" @input="checkNum" type="text">
                    <span>-</span>
                    <input class="input" tag="lengthMax" v-model="params.lengthMax" @input="checkNum" type="text">
                </div>
        </template>
        <input v-else class="spec-input" v-model="params.specification" placeholder="请输入规格" type="text">

        <div class="multi-btns" style="width:auto">
            <a class="filter-btn primary" @click="onpick">确定</a>
            <a class="filter-btn" @click="cancel">取消</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showDeatil: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                params: {
                    specification: '', //规格
                    heightMin: '', //厚最小
                    heightMax: '', //厚最大
                    widthMin: '', //宽最小
                    widthMax: '', //宽最大m
                    lengthMin: '', //长最小
                    lengthMax: '' //长最大
                }
            }
        },
        watch: {
            showDeatil(val) {
                if (val) {
                    this.params.specification = '';
                } else {
                    this.params.heightMin = '';
                    this.params.heightMax = '';
                    this.params.widthMin = '';
                    this.params.widthMax = '';
                    this.params.lengthMin = '';
                    this.params.lengthMax = '';
                }
                let data = this.$clearData(this.params);
                this.$emit('on-reset')
            }
        },
        methods: {
            checkNum(e) {
                if (isNaN(+e.target.value)) {
                    let key = e.target.attributes.tag.value;
                    this.params[key] = ''
                }
            },
            onpick() {
                let data = this.$clearData(this.params);
                let isInput = false;
                for(let key in data){
                    isInput = data[key] != '';
                    if(data[key] != '')
                        break
                        
                }
                if(isInput){
                    this.$emit('on-pick', data)
                }else{
                    this.$Message.warning('请输入规格')
                }
            },
            cancel(){
                this.init();
                this.$emit('on-reset');
            },
            init() {
                this.params.specification = '';
                this.params.heightMin = '';
                this.params.heightMax = '';
                this.params.widthMin = '';
                this.params.widthMax = '';
                this.params.lengthMin = '';
                this.params.lengthMax = '';
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/base.less');
    .auction-spec-container {
        .flex-block;
        width: auto;
        .input-warp {
            .flex-block;
            width: auto;
            height: 24px;
            line-height: 22px;
            border: @b_d1;
            margin-right: 16px;
            .title {
                width: 40px;
                height: 100%;
                text-align: center;
                color: #ccc;
                background-color: rgba(247, 247, 247, 1);
                border-right: 1px solid @back_gray;
            }
            .input {
                display: block;
                width: 45px;
                height: 100%;
                padding: 10px 5px;
                border: 0;
                margin: 0;
                outline: 0;
                &.r {
                    text-align: right;
                }
            }
            span {
                color: #ccc;
            }
        }
        .spec-input {
            width: 224px;
            height: 24px;
            line-height: 22px;
            border: @b_d1;
            padding: 0 10px;
            outline: 0;
            margin-right: 16px;
        }
    }
</style>


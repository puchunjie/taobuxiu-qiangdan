<template>
    <div class="upload-container excel-panel" v-if="visible">
        <div class="inner-wrap">
            <div class="header">上传Excel<span class="close iconfont icon-close" @click="close"></span></div>
            <div class="excel-content">
                <div class="type-select">
                    <a class="riado-group" @click="type = 1">
                        <span class="iconfont" :class="type == 1 ? 'icon-radioacheck' : 'icon-radio'"></span>
                        <label>板卷类</label>
                    </a>
                    <a class="riado-group" @click="type = 2">
                    <span class="iconfont" :class="type == 2 ? 'icon-radioacheck' : 'icon-radio'"></span>
                    <label>非板卷类</label>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false,
                list: [],
                type: 1
            }
        },
        computed: {
    
        },
        watch: {
            visible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.visible = val
            }
        },
        methods: {
            close() {
                this.visible = false;
            }
        },
        mounted() {
            this.visible = this.value
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../../assets/resources.less");
</style>

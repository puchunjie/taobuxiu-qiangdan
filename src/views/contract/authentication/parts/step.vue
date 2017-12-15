<template>
    <div class="step-wrap">
        <div class="item" v-for="(step,i) in steps" :key="i" :class="{'active':nowSetp == i+1}" :style="{zIndex:steps.length - i}">
            <span class="step-count">{{ i+1 }}</span>{{ step }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            nowSetp:{
                type:[Number,String],
                default: 1
            }
        },
        data() {
            return {
                steps: ['填写基本信息', '上传资料', '提交成功，等待审核']
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../index.less');
</style>

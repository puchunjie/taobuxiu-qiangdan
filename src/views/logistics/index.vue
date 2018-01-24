<template>
    <div class="logistics-container">
        <div class="banner-container">
            <lForm></lForm>
        </div>
        <div class="icons-container"></div>
    </div>
</template>

<script>
    import lForm from './lForm.vue'
    export default {
        components: {
            lForm
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/base.less');
    .logistics-container {
        width: 100%;
        background-color: @bg_color;
        .banner-container {
            width: 100%;
            height: 640px;
            background: url('../../assets/logistics/logistics1.png') no-repeat;
            background-size: cover;
        }

        .icons-container{
            width: 100%;
            height: 1100px;
        }

       
    }
</style>


<template>
    <div>
        <div class="inner-title">今日市价<span>(最后更新  {{ lastTime | dateformat }})</span></div>
        <div class="item-group">
            <div class="item" :class="[{'no-mr':(i+1)%4 == 0},'type' + item.gains]" v-for="(item,i) in list" :key="item.id">
                <h3>&yen;{{ item.price }}<span>{{ item.proPlace }}</span></h3>
                <p>{{ `${item.material}/${item.surface}   ${item.width}   ${item.tranStatus}   ${item.height}   ${item.ironType}` }}</p>
                <span class="type iconfont" :class="'icon-hq'+ item.gains"></span>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                list:[],
                lastTime:''    
            }
        },
        methods: {
            getData() {
                this.$http.post(this.$api.ironNew).then(res => {
                    if(res.code === 1000){
                        this.list = res.data;
                        this.lastTime = res.data[0].createTime;
                    }
                })
            }
        },
        created () {
            this.getData()
        }
    }
</script>


<style lang="less" scoped>
    @import '../../../assets/base.less';
    .item-group {
        .flex-block;
        .flex-wrap(wrap);
        width: 100%;
        .item {
            position: relative;
            width: 312px;
            height: 120px;
            background-color: #fff;
            margin: 0 24px 24px 0;
            padding: 20px 26px;
            color: @f_dark;
            .borderRadius;
            &.no-mr {
                margin-right: 0;
            }

            h3{
                font-size: 36px;
                span{
                    font-size: 16px;
                    margin-left: 10px;
                    color: @f_dark;
                }
            }
            p{
                margin-top: 20px;
            }

            .type{
                position: absolute;
                right: 20px;
                top: 30px;
                font-size: 60px;
            }

             &.type0{
                h3{
                    color: @light_green;
                }
                .type{
                    color: @light_green;
                }
            }

             &.type1{
                h3{
                    color: @light_yellow;
                }
                .type{
                    color: @light_yellow;
                }
            }

            &.type2{
                h3{
                    color: @dark_red;
                }
                .type{
                    color: @dark_red;
                }
            }
        }
    }
</style>

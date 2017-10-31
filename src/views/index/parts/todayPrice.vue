<template>
    <div>
        <div class="inner-title">今日市价<span v-if="lastTime != ''">(最后更新  {{ lastTime | dateformat }})</span></div>
        <div class="item-group">
            <div class="item" :class="[{'no-mr':(i+1)%4 == 0},'type' + item.gains]" v-for="(item,i) in list" :key="item.id">
                <template v-if="item != ''">
                    <h3>&yen;{{ item.price }}
                        <span class="type iconfont" :class="'icon-hq'+ item.gains"></span>
                        <span class="place">{{ item.proPlace }}</span></h3>
                    <p>
                        {{ `${item.material}/${item.surface} ${item.width} ${item.tranStatus} ${item.height} ${item.ironType}` }}
                        <span class="market">{{ item.area }}</span>
                    </p>
                </template>
                
                <img v-else class="hold-img" src="http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/no-day.png">
            </div>
            
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                list: [],
                lastTime: ''
            }
        },
        methods: {
            getData() {
                this.$http.post(this.$api.ironNew).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data != '' ? res.data : [];
                        if(res.data[0])
                            this.lastTime = res.data[0].createTime;

                        let num = this.list.length;
                        let arr = [];
                        if (num < 8) {
                            let less = 8 - num;
                            for (let i = 0; i < less; i++) {
                                arr.push('');
                            }
                        }
                        this.list.push(...arr);    
                    }
                })
            }
        },
        created() {
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
            h3 {
                font-size: 36px;
                .place {
                    font-size: 16px;
                    color: @f_dark;
                    margin-top: 10px;
                    float: right;
                }
            }
            p {
                margin-top: 20px;
                .market {
                    float: right;
                    color: @f_goast;
                }
            }
            .type {
                position: relative;
                top: 0;
                font-size: 36px;
            }
            &.type0 {
                h3 {
                    color: @light_green;
                }
                .type {
                    color: @light_green;
                }
            }
            &.type1 {
                h3 {
                    color: @light_yellow;
                }
                .type {
                    color: @light_yellow;
                }
            }
            &.type2 {
                h3 {
                    color: @dark_red;
                }
                .type {
                    color: @dark_red;
                }
            }

            .hold-img{
                position: absolute;
                display: block;
                width: 312px;
                left: 0;
                top: 0;
            }
        }
    }
</style>

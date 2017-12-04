<template>
    <div class="seach-div">
        <div class="search-input">
            <input type="text" v-model="search.str" :placeholder="placeholder" />
            <a>搜索</a>
        </div>
        <div class="time-limit">
            下单时间：
            <tbSelect class="select" v-model="search.limitTime" :data='selectData'></tbSelect>
        </div>
        <slot class="page"></slot>
    </div>
</template>


<script>
    import tbSelect from '@/components/business/tbSelect/index'
    export default {
        components: {
            tbSelect
        },
        props: {
            placeholder: String,
            value: {
                type: Object,
                default: function() {
                    return {
                        str: '',
                        limitTime: ''
                    }
                }
            }
        },
        data() {
            return {
                search: {
                    str: '',
                    limitTime: '',
                },
                selectData: []
            }
        },
        watch: {
            'search': {
                handler: function(val, oldVal) {
                    this.$emit('input', val);
                },
                deep: true
            }
        },
        methods: {
            GetDate(day, type) {
                let zdate = new Date(),
                    edate = '';
                if (type === 1) {
                    edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
                } else {
                    edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
                }
                return edate;
            },
            GetDate2(day, type, date) {
                let zdate = '',
                    edate = '';
                if (date === null || date === undefined) {
                    zdate = new Date();
                } else {
                    zdate = date;
                }
                if (type === 1) {
                    edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
                } else {
                    edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
                }
                return edate;
            },
            // 今天
            toDayStr() {
                let returnStr = "";
                let date = new Date(); //当前时间
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                month = month < 10 ? "0" + month : month;
                day = day < 10 ? "0" + day : day;
                //起始时间
                returnStr = new Date(year + "/" + month + "/" + day + " 00:00:00").getTime() + ',';
                //结束时间
                returnStr += new Date(year + "/" + month + "/" + day + " 23:59:59").getTime();
                return returnStr;
            },
            // 昨天
            yesterDayStr() {
                let date = this.GetDate(1, 1); //当前时间前一天
                let returnStr = "";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                month = month < 10 ? "0" + month : month;
                day = day < 10 ? "0" + day : day;
                returnStr = new Date(year + "/" + month + "/" + day + " 00:00:00").getTime() + ',';
                returnStr += new Date(year + "/" + month + "/" + day + " 23:59:59").getTime();
                return returnStr;
            },
            // 本周
            thisWeekStr() {
                let returnStr = "";
                let date = new Date(); //当前时间
                let week = date.getDay(); //获取今天星期几
                let monday = this.GetDate2(week - 1, 1, date); //获取星期一
                let sunday = this.GetDate2(7 - week, 2, date); //获取星期天
                //起始时间的年月日
                let year1 = monday.getFullYear();
                let month1 = monday.getMonth() + 1;
                let day1 = monday.getDate();
                //结束时间的年月日
                let year2 = sunday.getFullYear();
                let month2 = sunday.getMonth() + 1;
                let day2 = sunday.getDate();
                //处理起始时间小于10的追加"0"在前面
                month1 = month1 < 10 ? "0" + month1 : month1;
                day1 = day1 < 10 ? "0" + day1 : day1;
                //处理结束时间小于10的追加"0"在前面
                month2 = month2 < 10 ? "0" + month2 : month2;
                day2 = day2 < 10 ? "0" + day2 : day2;
                returnStr = new Date(year1 + "/" + month1 + "/" + day1 + " 00:00:00").getTime() + ',';
                returnStr += new Date(year2 + "/" + month2 + "/" + day2 + " 23:59:59").getTime();
                return returnStr;
            },
            // 本月
            thisMonthStr() {
                let returnStr = "";
                let date = new Date(); //当前时间
                let year = date.getFullYear();
                let month = date.getMonth();
    
                let min = new Date(year, month, 1); //本月月初
                let max = new Date(year, month + 1, 0); //本月月底
    
                //起始时间的年月日
                let year1 = min.getFullYear();
                let month1 = min.getMonth() + 1;
                let day1 = min.getDate();
                //结束时间的年月日
                let year2 = max.getFullYear();
                let month2 = max.getMonth() + 1;
                let day2 = max.getDate();
                //处理起始时间小于10的追加"0"在前面
                month1 = month1 < 10 ? "0" + month1 : month1;
                day1 = day1 < 10 ? "0" + day1 : day1;
                //处理结束时间小于10的追加"0"在前面
                month2 = month2 < 10 ? "0" + month2 : month2;
                day2 = day2 < 10 ? "0" + day2 : day2;
                returnStr = new Date(year1 + "/" + month1 + "/" + day1 + " 00:00:00").getTime() + ',';
                returnStr += new Date(year2 + "/" + month2 + "/" + day2 + " 23:59:59").getTime();
                return returnStr;
            },
            // 组合时间段 今天，昨天，本周，本月，所有
            createData() {
                this.selectData = [{
                        label: "今天",
                        value: this.toDayStr()
                    },
                    {
                        label: "昨天",
                        value: this.yesterDayStr()
                    },
                    {
                        label: "本周",
                        value: this.thisWeekStr()
                    },
                    {
                        label: "本月",
                        value: this.thisMonthStr()
                    },
                    {
                        label: "所有订单",
                        value: ","
                    }
                ]
            }
        },
        created() {
            this.createData();
        },
        mounted() {
            this.search.str = this.value.str;
            this.search.limitTime = this.value.limitTime;
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/base.less');
    .seach-div {
        position: relative;
        width: 100%;
        height: 34px;
        margin: 16px 0;
        .search-input {
            display: inline-block;
            width: 360px;
            height: 34px;
            border: @b_d1;
            background-color: @goast_gray;
            margin-right: 160px;
            input {
                display: inline-block;
                width: 280px;
                height: 100%;
                border: 0;
                margin: 0;
                outline: none;
                padding: 0 12px;
                border-right: @b_d1;
                background-color: #fff;
            }
            a {
                display: inline-block;
                width: 70px;
                height: 100%;
                text-align: center;
                color: @f_goast;
            }
        }
        .time-limit {
            display: inline-block;
            width: 220px;
            .select {
                width: 150px;
            }
        }
        .page {
            position: absolute;
            right: 0;
        }
    }
</style>


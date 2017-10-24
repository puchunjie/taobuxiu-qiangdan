<template>
    <div class="tab-card" :class="'status'+item.buyStatus">
        <div class="content">
            <h3 class="point-title">
                <span>{{ item.ironTypeName }}</span>
                <span>{{ item.materialName }}</span>
                <span>{{ item.surfaceName }}</span>
                <span>{{ item.proPlacesName }}</span>
            </h3>
            <p>
                <span>{{ item.specifications!= '' ? item.specifications : `${ item.height }*${ item.width }*${ item.length }` }}</span>
                <span>{{ item.tolerance }}</span>
            </p>
            <p>{{ item.remark }}</p>
            <p class="goast">{{ item.updateTime | dateformat }}</p>
        </div>
        <div class="count-action">
            <div class="count">
                <h3>{{ item.sellNum }}</h3>
                <p>{{ item.buyStatus | statusStr }}</p>
            </div>
            <div class="action">
                <span class="iconfont icon-fuzhi" @click.stop="copy"></span><br>
                <span v-show="isIng" class="iconfont icon-shanchu" @click.stop="del"></span><br>
                <span v-show="canEdit && isIng" class="iconfont icon-bianji" @click.stop="edit"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object,
            index: Number
        },
        computed: {
            canEdit() {
                return this.item.editStatus == 0
            },
            isIng() {
                return this.item.buyStatus == 1
            }
        },
        filters: {
            statusStr(status) {
                switch (status) {
                    case "1":
                        return '进行中'
                        break;
                    case "2":
                        return '已成交'
                        break;
                    case "3":
                        return '已失效'
                        break;
                    default:
                        break;
                }
            }
        },
        methods: {
            // 复制求购信息
            copy() {
                this.$emit('on-copy');
            },
            del() {
                this.$Modal.confirm({
                    title: '是否要删除？',
                    content: '删除后将无法撤销，是否继续？',
                    onOk: () => {
                        this.$emit('on-del', this.item);
                    }
                });
            },
            // 编辑
            edit() {
                this.$emit('on-edit', this.index)
            }
        }
    }
</script>


<style lang="less">
    @import '../../../../assets/base.less';
    .tab-card {
        position: relative;
        width: 312px;
        height: 100px;
        .borderRadius;
        .content {
            float: left;
            width: 248px;
            height: 100px;
            padding: 0 10px;
            margin-left: 4px;
            border-top: 2px solid #fff;
            border-bottom: 2px solid #fff;
            background-color: #fff;
            color: @f_dark;
            .point-title {
                height: 30px;
                line-height: 30px;
                font-weight: bold;
                .ellipsis;
                span {
                    margin-right: 8px;
                }
            }
            p {
                height: 22px;
                line-height: 22px;
                .ellipsis;
                span {
                    margin-right: 8px;
                }
                &.goast {
                    color: @f_goast;
                }
            }
        }
        .count-action {
            float: left;
            width: 60px;
            height: 100%;
            text-align: center;
            color: #fff;
            h3 {
                margin-top: 25px;
                font-size: 24px;
            }
            .action {
                display: none;
                margin-top: 12px;
                line-height: 24px;
                .iconfont {
                    cursor: pointer;
                    font-size: 18px;
                }
            }
        }
        &.active:before {
            /*这里的伪元素用单冒号和双冒号都一样*/
            content: '';
            display: block;
            position: absolute;
            right: -20px;
            top: 40px;
            border-top: 10px transparent dashed;
            border-right: 10px transparent dashed;
            border-bottom: 10px transparent dashed;
        }
        &:hover {
            .count-action {
                .count {
                    display: none;
                }
                .action {
                    display: block;
                }
            }
        }
        &.status1 {
            background-color: @light_yellow;
            &:hover {
                .content {
                    border-color: @light_yellow;
                    background-color: #fff3d1;
                }
            }
        }
        &.status1.active {
            &:before {
                border-left: 10px solid @light_yellow;
            }
            .content {
                border-color: @light_yellow;
                background-color: #fff3d1;
            }
        }
        &.status2 {
            background-color: @light_green;
            &:hover {
                .content {
                    border-color: @light_green;
                    background-color: #f3ffe5;
                }
            }
        }
        &.status2.active {
            &:before {
                border-left: 10px solid @light_green;
            }
            .content {
                border-color: @light_green;
                background-color: #f3ffe5;
            }
        }
        &.status3 {
            background-color: @f_goast;
            &:hover {
                .content {
                    border-color: @f_goast;
                    background-color: #d1d1d1;
                }
            }
        }
        &.status3.active {
            &:before {
                border-left: 10px solid @f_goast;
            }
            .content {
                border-color: @f_goast;
                background-color: #d1d1d1;
            }
        }
        &+.tab-card {
            margin-top: 10px;
        }
    }
</style>



<template>
    <div class="prog-container">
        <div class="progress" :class="{ 'done': isDone }">
            <span class="start"></span>
            <span class="line"></span>
            <span class="end"></span>
        </div>
        <div class="word">
            <div class="left">
                <slot name="left"></slot>
            </div>
            <div class="right">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isDone: {
                type: Boolean,
                default: false
            }
        }
    }
</script>


<style lang="less">
    @import url('../../../../assets/base.less');
    .prog-container {
        width: 630px;
        padding: 40px 0;
        .progress {
            width: 100%;
            padding-left: 50px;
            span {
                display: inline-block;
            }
            .start,
            .end {
                position: relative;
                width: 14px;
                height: 14px;
                border: 2px solid @back_gray;
                .borderRadius(14px);
                vertical-align: middle;
            }
            .start {
                left: 5px;
                border-color: @dark_blue;
            }
            .end {
                left: -5px;
            }
            .line {
                width: 409px;
                height: 4px;
                background-color: @back_gray;
                vertical-align: middle;
            }
            &.done {
                .end {
                    border-color: @dark_blue;
                }
                .line {
                    background-color: @dark_blue;
                }
            }
        }
        .word {
            width: 100%;
            margin-top: 8px;
            .flex-block;
            .justify-content(space-between);
            .left,
            .right {
                width: 245px;
                padding-left: 45px;
                h2{
                    color: @f_ligth;
                    font-size: 14px;
                }
                p{
                    font-size: 12px;
                    color: @f_goast;
                    margin-top: 8px;
                }
            }
        }
    }
</style>

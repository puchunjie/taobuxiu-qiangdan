<template>
    <div class="crown-container">
        <label>{{ tit }}</label>
        <span v-for="el in num" :key="el" :class="'crown'+pic"></span>
    </div>
</template>

<script>
    export default {
        props: {
            tit:{
                type:String,
                default:''
            },
            level: {
                type: String,
                default: '1-1'
            }
        },
        computed: {
          num(){
              return this.level!='' ? this.level.split('-')[1] * 1 : 1;
          },
          pic(){
              return this.level!='' ? this.level.split('-')[0] : 1;
          }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';
    .crown-container {
        display: inline-block;
        vertical-align: top;
        height: 18px;
        label{
            position: relative;
            top: -4px;
        }
        span {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 2px;
            background-repeat: no-repeat;
            background-position: center;
            &.crown1 {
                background-image: url('../../../assets/crown/1.png')
            }
            &.crown2 {
                background-image: url('../../../assets/crown/2.png')
            }
            &.crown3 {
                background-image: url('../../../assets/crown/3.png')
            }
        }
    }
</style>


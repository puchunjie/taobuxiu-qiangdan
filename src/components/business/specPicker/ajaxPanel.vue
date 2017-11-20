<template>
    <div class="tb-picker-panel search-mode">
        <div class="tinking-content">
            <div class="item" v-for="item in list" :key="item.id" @click="pickerItem(item)">
                {{ item.height ? item.height+ '*' : '' }}{{ `${item.width}*${item.length}` }}
            </div>
        </div>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
    export default {
        props: {
            search: {
                type: Object,
                default: function() {
                    return {
                        type: true, //true为搜索厚宽长组合，false为搜索宽长组合
                        surface: "",
                        ironType: "",
                        specifications: "",
                        height: "",
                        width: "",
                        length: ""
                    }
                }
            }
        },
        data() {
            return {
                list: [],
            }
        },
        watch: {
            'search': {
                handler: debounce(function(val, oldVal) {
                    if (val.type) {
                        this.getlwh();
                    } else {
                        this.getwh();
                    }
                }, 500),
                deep: true
            }
        },
        methods: {
            getlwh() {
                this.$http.post(this.$api.G_queryGG, {
                    ironType: this.search.ironType,
                    surface: this.search.surface,
                    height: this.search.height
                }).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data;
                    }
                })
            },
            getwh() {
                this.$http.post(this.$api.G_queryWL, {
                    ironType: this.search.ironType,
                    surface: this.search.surface
                }).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data;
                    }
                })
            },
            pickerItem(item){
                this.$emit('on-picker',item);
            }
        },
        created() {
            if(this.search.type){
                this.getlwh();
            }else{
                this.getwh();
            }
            
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/picker.less');
    .search-mode {
        width: 160px!important;
    }
</style>

<template>
    <div class="filter-item" :class="{ 'in-multi': inMulti}">
        <label class="label">{{ name }}:</label>
        <div class="item" :class="{'active': multi && item.isCheck ? item.isCheck : activeIndex == i}" @click="pickItem(i)" v-for="(item,i) in items" :key="i">
            <i class="iconfont" :class=" item.isCheck ? 'icon-check-box' : 'icon-check_box_unselecte' " v-show="multi && inMulti"></i> {{ item.label }}
        </div>
        <div class="show-more" v-show="showMore">更多</div>
        <a class="multi-btn" v-show="multi && !inMulti" @click="multiMode">多选</a>
        <div class="multi-btns" v-show="multi && inMulti">
            <a class="filter-btn primary" @click="multiPick">确定</a>
            <a class="filter-btn" @click="singleMode">取消</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            // 是否有显示更多按钮
            showMore: {
                type: Boolean,
                default: false
            },
            // 大类名称
            name: {
                type: String,
                default: ''
            },
            keyName: {
                type: String,
                default: ''
            },
            api: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: function() {
                    return []
                }
            },
            //多选模式是否开启
            multi: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                activeIndex: null,
                // 是否开启多选
                inMulti: false,
                items: [],
                savePickItem: []
            }
        },
        methods: {
            // 获取筛选条件
            async getFilters() {
                let list = [];
                if (this.api != '') {
                    await this.$http.post(this.api).then(res => {
                        if (res.code == 1000) {
                            list = res.data;
                        }
                    })
                } else {
                    list = this.data;
                }
                this.items = list.map(item => {
                    let obj = {};
                    obj.label = typeof item == 'string' ? item : item.name;
                    obj.key = this.keyName;
                    obj.name = this.name;
                    obj.isCheck = false;
                    return obj
                });
                this.savePickItem = this.$clearData(this.items);
    
            },
            pickItem(i) {
                if (this.multi && this.inMulti) {
                    this.items[i].isCheck = !this.items[i].isCheck;
                } else {
                    if (this.activeIndex == i) return
                    this.activeIndex = i;
                    this.items.forEach(item => item.isCheck = false);
                    this.savePickItem.forEach(item => item.isCheck = false);
                    let pickItem = this.$clearData(this.items[i]);
                    this.$emit('on-pick', pickItem);
                }
    
            },
            multiPick() {
                let items = this.items.filter(item => item.isCheck);
                if (items.length > 0) {
                    let str = '';
                    items.forEach((item, i) => {
                        str += i < (items.length - 1) ? `${item.label};` : item.label;
                    })
                    let outItem = {
                        label: str,
                        key: this.keyName,
                        name: this.name,
                        isCheck: false
                    }
                    this.$emit('on-pick', outItem);
                    this.inMulti = false;
                    this.activeIndex = null;
                    // 保存这次勾选情况，下次勾选来对比是否有变化
                    this.savePickItem = this.$clearData(this.items);
                } else {
                    this.$Message.warning('请勾选筛选条件!')
                }
            },
            multiMode() {
                this.inMulti = true;
            },
            singleMode() {
                if (this.checkIsChange()) {
                    this.items = this.$clearData(this.savePickItem);
                }
                this.inMulti = false;
            },
            //检查多选列表是否有变化
            checkIsChange() {
                let isChange = false;
                for (let [i, item] of new Map(this.items.map((item, i) => [i, item]))) {
                    isChange = this.items[i].isCheck != this.savePickItem[i].isCheck
                    if (isChange) break
                }
                return isChange
            },
            init() {
                this.activeIndex = null;
                this.inMulti = false;
                this.items.forEach(item => item.isCheck = false);
                this.savePickItem.forEach(item => item.isCheck = false);
            }
        },
        created() {
            this.getFilters();
        }
    }
</script>



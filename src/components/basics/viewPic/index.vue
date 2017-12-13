<template>
    <a @click="show">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        props: ['imgUrl'],
        methods: {
            show() {
                this.$Modal.info({
                    width: 500,
                    render: (h) => {
                        return h('img', {
                            attrs: {
                                src: this.imgUrl,
                            },
                            'class': {
                                'view-pic-img': true
                            }
                        })
                    }
                })
            }
        }
    }
</script>



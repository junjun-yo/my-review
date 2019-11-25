<template>
    <el-input-number v-model="data" :min="min" :max="max" :disabled="disabled" @change="handlerChange"></el-input-number>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number,
                default: undefined
            },
            min: {
                type: Number,
                default: undefined
            },
            max: {
                type: Number,
                default: undefined
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value() {
                if (this.value) {
                    this.data = this.value;
                } else {
                    this.data = null;
                }
            }
        },
        data() {
            return {
                data: undefined
            };
        },
        methods: {
            handlerChange(value) {
                this.$emit("input", value);
                this.$emit("change", value);
            }
        },
        created() {
            this.data = this.value;
        }
    };
</script>

<style lang='scss' scoped>
    .el-input-number--mini,.el-input-number--small{
        width: 100%!important;
        max-width: 150px;
    }
</style>
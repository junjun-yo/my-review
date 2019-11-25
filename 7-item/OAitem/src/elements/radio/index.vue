<template>
    <el-radio-group v-model="data" @change="optionChange">
        <el-radio v-for="item in options" :label="item[optValue]" :key="item[optKey]">{{item[optLabel]}}</el-radio>
        <template v-if="code && code!==''">
            <el-radio v-for="item in store.state.dict.dict[code]" :label="item.key" :key="item.id">{{item.value}}</el-radio>
        </template>
    </el-radio-group>
</template>

<script>
    import store from "@/store";
    export default {
        props: {
            value: {
                type: [String, Array],
                default: undefined
            },
            optLabel: {
                type: String,
                default: 'label'
            },
            optKey: {
                type: String,
                default: 'value'
            },
            optValue: {
                type: String,
                default: 'value'
            },
            options: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            code: String
        },
        watch: {
            value() {
                if (this.value) {
                    this.data = this.value;
                }
            }
        },
        data() {
            return {
                store,
                data: undefined,
                codes: []
            };
        },
        methods: {
            optionChange(value) {
                this.$emit("input", value);
                this.$emit("change", value);
            }
        },
        created() {
            if (this.value) {
                this.data = this.value;
            }
        }
    };
</script>

<style lang='scss' scoped>
</style>
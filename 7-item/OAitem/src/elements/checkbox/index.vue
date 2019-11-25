<template>
    <el-checkbox-group
            v-model="data"
            :min="min"
            :max="max"
            @change="optionChange">
        <el-checkbox v-for="item in options" :label="item[optValue]" :key="item[optKey]">{{item[optLabel]}}</el-checkbox>
        <template v-if="code && code!==''">
            <el-checkbox v-for="item in store.state.dict.dict[code]" :label="item.key" :key="item.id">{{item.value}}</el-checkbox>
        </template>
    </el-checkbox-group>
</template>

<script>
    import store from "@/store";
    export default {
        props: {
            value: {
                type: [String, Array],
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
                    if (this.value && this.value.constructor === Array) {
                        this.data = [...this.value];
                    } else {
                        this.data = this.value.split(",");
                    }
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
                if (this.value && this.value.constructor === Array) {
                    this.$emit("input", value);
                } else {
                    this.$emit("input", value.join(","));
                }
                this.$emit("change", value);
            }
        },
        created() {
            if (this.value) {
                if (this.value && this.value.constructor === Array) {
                    this.data = [...this.value];
                } else {
                    this.data = this.value.split(",");
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
</style>
<template>
    <el-input placeholder="请选择角色" v-model="choose" readonly>
        <el-button slot="append" icon="el-icon-search" @click="$roleSelect" v-if="!readonly"></el-button>
    </el-input>
</template>

<script>
    import roleDialog from "./role-select-dialog";
    export default {
        props: {
            value: [String, Array, Object],
            allowCheckCount: Number,
            readonly: {
                type: Boolean,
                default: false
            },
            allData: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            async value() {
                this.transform();
            }
        },
        data() {
            return {
                choose: ""
            };
        },
        methods: {
            $roleSelect() {
                let defaultCheck = [];
                if(this.value && this.choose){
                    let values = this.value.split(",");
                    let labels = this.choose.split(",");
                    if(values.length==labels.length){
                        for(let i in values){
                            defaultCheck.push({key:values[i],label:labels[i]});
                        }
                    }
                }
                this.$open({
                    title: "角色选择",
                    component: roleDialog,
                    width: "680px",
                    props: {
                        allowCheckCount: this.allowCheckCount,
                        defaultCheck: defaultCheck
                    },
                    confirm: data => {
                        if (this.allowCheckCount == 1) {
                            this.choose = data[0].label;
                            this.$emit("input", data[0].key);
                        } else {
                            this.choose = data.map(item => item.label).join(",");
                            this.$emit("input", data.map(item => item.key).join(","));
                        }
                        this.$emit("confirm");
                    }
                });
            },
            async transform() {
                if (this.value) {
                    const res = await Ajax.post("/common/cacheData/searchNameForRole", {
                        id: this.value
                    });
                    this.choose = res.data;
                }
            }
        },
        created() {
            this.transform();
        }
    };
</script>

<style lang='scss' scoped>
</style>
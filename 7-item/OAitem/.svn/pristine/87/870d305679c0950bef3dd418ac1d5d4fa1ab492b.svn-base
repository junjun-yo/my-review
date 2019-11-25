<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="流程类型" prop="flowType">
            <dict-select v-model="vo.flowType" placeholder="请选择所属分类" code="flowType"/>
        </el-form-item>
        <el-form-item label="文号前缀" prop="codePrefix">
            <el-input v-model="vo.codePrefix" autocomplete="off"
                      maxlength="100" placeholder="请输入文号前缀"></el-input>
        </el-form-item>
        <el-form-item label="文号年月" prop="codeYm">
            <oa-select v-model="vo.codeYm" placeholder="请选择文号年月" :options="optCodeYm" clearable/>
        </el-form-item>
        <el-form-item label="文号补位" prop="codeLen">
            <el-input-number v-model="vo.codeLen" :max="99"></el-input-number>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
            <el-input-number v-model="vo.sort"></el-input-number>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        props: {
            id: String,
            unitId: String,
            flowType: String
        },
        data() {
            return {
                vo: {},
                loading: false,
                rules: {
                    flowType : [
                        { required: true, message: "请输入流程类型", trigger: "blur" }
                        ,{ max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,codePrefix : [
                        { required: true, message: "请输入文号前缀", trigger: "blur" }
                        ,{ max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                    ,codeYm : [
                        { required: true, message: "请输入文号年月", trigger: "blur" }
                    ]
                    ,codeLen : [
                        { required: true, message: "请输入文号补位", trigger: "blur" }
                    ]
                    ,sort : [
                    ]
                }
                ,optCodeYm : [{"value":"none","label":"忽略"},{"value":"yyyy","label":"年份"},{"value":"yyyyMM","label":"年月"},{"value":"MM","label":"月份"},{"value":"yyyyMMdd","label":"年月日"}]
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/common/form/type/save", this.vo, "json").then(
                            res => {
                                this.$message({
                                    message: "保存成功！",
                                    type: "success"
                                });
                                done();
                            },
                            err => {
                                fail();
                            }
                        );
                    } else {
                        fail();
                    }
                });
            },
            initForm() {
                if (this.id) {
                    this.loading = true;
                    Ajax.get("/common/form/type/get", {
                        id: this.id
                    }).then(res => {
                        this.vo = res.data;
                        this.loading = false;
                    });
                } else {
                    this.vo.flowType = this.flowType;
                    this.vo.unitId = this.unitId;
                }
            }
        },
        created() {
            this.initForm();
        }
    };
</script>

<style lang='scss' scoped>
</style>
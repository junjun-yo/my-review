<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="所属分类" prop="flowType">
            <dict-select v-model="vo.flowType" placeholder="请选择所属分类" code="flowType"/>
        </el-form-item>
        <el-form-item label="类型名称" prop="name">
            <el-input v-model="vo.name" autocomplete="off"
                      maxlength="50" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="分类图标" prop="icon">
            <icon-select v-model="vo.icon" />
        </el-form-item>
        <el-form-item label="备注说明" prop="documentation">
            <el-input v-model="vo.documentation" autocomplete="off"
                      maxlength="100" placeholder="请输入备注说明"></el-input>
        </el-form-item>
        <el-form-item label="排序号">
            <el-input-number v-model="vo.sort" :min="0" :max="9999"></el-input-number>
        </el-form-item>
    </el-form>
</template>

<script>
    import iconSelect from "@/components/IconSelect";
    export default {
        props: {
            id: String,
            flowType: String,
            unitId: String
        },
        components: {
            iconSelect
        },
        data() {
            return {
                vo: {},
                loading: false,
                rules: {
                    flowType : [
                        { required: true, message: "请输入所属分类", trigger: "blur" }
                    ]
                    ,name : [
                        { required: true, message: "请输入类型名称", trigger: "blur" }
                        ,{ max: 50, message: "长度请小于50", trigger: "blur" }
                    ]
                    ,icon : [
                        { required: true, message: "请选择分类图标", trigger: "blur" }
                    ]
                    ,documentation : [
                        { max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                }
                ,optFlowType : []
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/flow/subType/save", this.vo, "json").then(
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
                    Ajax.get("/flow/subType/get", {
                        id: this.id
                    }).then(res => {
                        this.vo = res.data;
                        this.loading = false;
                    });
                } else{
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
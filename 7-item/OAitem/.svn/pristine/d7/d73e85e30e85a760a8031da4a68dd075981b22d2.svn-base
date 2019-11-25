<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="父级栏目">
            <el-tag effect="dark">{{this.vo.parentName}}</el-tag>
        </el-form-item>
        <el-form-item label="栏目名称" prop="cataName">
            <el-input v-model="vo.cataName" autocomplete="off"
                      maxlength="200" placeholder="请输入栏目名称"></el-input>
        </el-form-item>
        <el-form-item label="栏目类型" prop="cataType">
            <el-tag type="success" v-if="vo.cataType == '1'">公有栏目</el-tag>
            <el-tag type="danger" v-if="vo.cataType == '2'">私有栏目</el-tag>
        </el-form-item>
        <el-form-item label="排序码" prop="cataSort">
            <oa-number v-model="vo.cataSort"></oa-number>
        </el-form-item>
        <el-form-item label="是否审核" prop="cataCheckflag">
            <el-switch v-model="vo.cataCheckflag" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="是否控制起草" prop="cataCreateflag">
            <el-switch v-model="vo.cataCreateflag" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="起草角色" prop="cataCreaterole" v-if="vo.cataCreateflag == '1'">
            <role-select v-model="vo.cataCreaterole" />
        </el-form-item>
        <el-form-item label="是否启用" prop="cataEnable">
            <el-switch v-model="vo.cataEnable" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        props: ["id", "parent", "parentId", "cataType", "mode"],
        data() {
            var validateCreateRole = (rule, value, callback) => {
                //当前栏目需要控制起草，则必需选择起草的角色
                if (this.vo.cataCreateflag == '1' && (value == '' || value == null)) {
                    callback(new Error('请选择起草角色'));
                }
                else {
                    callback();
                }
            };
            return {
                vo: {},
                loading: false,
                rules: {
                    cataName : [
                        { required: true, message: "请输入栏目名称", trigger: "blur" }
                        ,{ max: 200, message: "长度请小于200", trigger: "blur" }
                    ]
                    ,cataType : [
                        { required: true, message: "请选择栏目类型", trigger: "blur" }
                    ]
                    ,cataSort : [
                        { required: true, message: "请输入排序码", trigger: "blur" }
                    ]
                    ,cataCheckflag : [
                    ]
                    ,cataCreateflag : [
                    ]
                    ,cataEnable : [
                    ]
                    ,cataCreaterole : [
                        { validator: validateCreateRole,message: "请选择起草角色", trigger: "blur" }
                    ]
                }
                ,optCataType : [{"value":"1","label":"公共栏目"},{"value":"2","label":"私有栏目"}]
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/cms/catalog/save", this.vo, "json").then(
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
                //新增
                if (this.mode == "add") {
                    this.vo = { cataParentid: this.parentId,cataType: this.cataType,parentName: this.parent,
                        cataCreaterole: ''  };
                }
                //修改
                else {
                    this.loading = true;
                    Ajax.get("/cms/catalog/get", {
                        id: this.id
                    }).then(res => {
                        this.vo = res.data;
                        this.loading = false;
                    });
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
<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="类别名称" prop="categoryName">
            <el-input v-model="vo.categoryName" autocomplete="off"
                      maxlength="20" placeholder="请输入类别名称"></el-input>
        </el-form-item>
        <el-form-item label="类别描述" prop="note">
            <el-input v-model="vo.note" autocomplete="off"
                      maxlength="100" placeholder="请输入类别描述"></el-input>
        </el-form-item>
        <el-form-item label="公共和个人内部区分" prop="category_sign">
            <el-input v-model="vo.category_sign" autocomplete="off"
                      maxlength="10" placeholder="请输入公共和个人内部区分"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        props: {
            id: String
        },
        data() {
            return {
                vo: {},
                loading: false,
                rules: {
                    categoryName : [
                        { max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,note : [
                        { max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                    ,category_sign : [
                        { max: 10, message: "长度请小于10", trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/category/save", this.vo, "json").then(
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
                    Ajax.get("/category/get", {
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
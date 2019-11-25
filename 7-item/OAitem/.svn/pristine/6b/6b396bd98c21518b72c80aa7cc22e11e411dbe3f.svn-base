<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="名称" prop="name">
            <el-input v-model="vo.name" autocomplete="off"
                      maxlength="255" placeholder="请输入名称"></el-input>
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
                    name : [
                        { required: true, message: "请输入名称", trigger: "blur" }
                        ,{ max: 255, message: "长度请小于255", trigger: "blur" }
                    ]
                    ,type : [
                    ]
                    ,size : [
                    ]
                    ,createDate : [
                    ]
                    ,user_id : [
                    ]
                    ,unit_id : [
                    ]
                    ,parentId : [
                    ]
                    ,upload_url : [
                    ]
                }
            };
        },
         methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/system/FilingCabinet/save", this.vo, "json").then(
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
                    Ajax.get("/system/FilingCabinet/get", {
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
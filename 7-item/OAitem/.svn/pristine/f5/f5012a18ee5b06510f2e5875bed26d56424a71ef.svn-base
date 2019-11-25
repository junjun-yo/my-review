<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="用户组名称" prop="groupName">
            <el-input v-model="vo.groupName" autocomplete="off"
                      maxlength="100" placeholder="请输入用户组名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="vo.description" autocomplete="off"
                      maxlength="200" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="排序码" prop="sortNo">
            <el-input-number size="mini" v-model="vo.sortNo" autocomplete="off"></el-input-number>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        props: {
            id: String,
            userId:String,
            unitId:String
        },
        data() {
            return {
                vo: {},
                loading: false,
                rules: {
                    groupName : [
                        { max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                    ,description : [
                        { max: 200, message: "长度请小于200", trigger: "blur" }
                    ]
                    ,unitId : [
                    ]
                    ,userId : [
                    ]
                    ,sortNo : [
                        { required: true, message: "请输入排序码", trigger: "blur" }
                    ]
                    ,createTime : [
                    ]
                }
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        this.vo.userId=this.userId;
                        this.vo.unitId=this.unitId;
                        Ajax.put("/system/CommonUserGroup/save", this.vo, "json").then(
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
                    Ajax.get("/system/CommonUserGroup/getCommUserGroupInfo", {
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
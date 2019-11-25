<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="部门组名称" prop="groupName">
            <el-input v-model="vo.groupName" autocomplete="off"
                      maxlength="50" placeholder="请输入部门组名称"></el-input>
        </el-form-item>
        <el-form-item label="组类型" prop="type">
            <oa-select v-model="vo.type" placeholder="请选择组类型" :options="optType" clearable/>
        </el-form-item>
        <el-form-item label="部门组描述" prop="description">
            <el-input type="textarea" :rows="5" placeholder="请输入部门组描述"
                      v-model="vo.description" autocomplete="off"
                      maxlength="100" ></el-input>
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
                        { required: true, message: "请输入部门组名称", trigger: "blur" }
                        ,{ max: 50, message: "长度请小于50", trigger: "blur" }
                    ]
                    ,type : [
                        { required: true, message: "请输入组类型", trigger: "blur" }
                    ]
                    ,description : [
                        { required: true, message: "请输入部门组描述", trigger: "blur" }
                        ,{ max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                    ,userId : [

                    ]
                    ,createDate : [
                        { required: true, message: "请输入创建时间", trigger: "blur" }
                    ]
                }
                ,optType : [{"value":"1","label":"部门"},{"value":"2","label":"单位"}]
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        this.vo.userId=this.userId;
                        this.vo.unitId=this.unitId;
                        console.log(this.vo)
                        Ajax.put("/system/CommonDeptGroup/save",this.vo,"json").then(
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
                    Ajax.get("/system/CommonDeptGroup/getCommDeptGroupInfo", {
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
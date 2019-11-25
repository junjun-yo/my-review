<template>
    <oa-table :ajax="ajaxParams" :columns="columns" showToolbar showCheck showPage
              @check="onCheck" :add="addFunc" ref="table"
            :sort="['name','untiName','deptName','personPhone','telephone','personMail','birthday']">
        <template slot-scope="{queryForm}" slot="more">
    <el-form-item label="名称">
                <el-input v-model="queryForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
    <el-form-item label="单位名称">
                <el-input v-model="queryForm.untiName" placeholder="请输入单位名称"></el-input>
            </el-form-item>
    <el-form-item label="部门名称">
                <el-input v-model="queryForm.deptName" placeholder="请输入部门名称"></el-input>
            </el-form-item>
    <el-form-item label="个人手机电话">
                <el-input v-model="queryForm.personPhone" placeholder="请输入个人手机电话"></el-input>
            </el-form-item>
    <el-form-item label="手机">
                <el-input v-model="queryForm.phone" placeholder="请输入手机"></el-input>
            </el-form-item>
    <el-form-item label="办公电话">
                <el-input v-model="queryForm.telephone" placeholder="请输入办公电话"></el-input>
            </el-form-item>
    <el-form-item label="其它电话">
                <el-input v-model="queryForm.otherPhone" placeholder="请输入其它电话"></el-input>
            </el-form-item>
    <el-form-item label="创建人">
                <el-input v-model="queryForm.creatorId" placeholder="请输入创建人"></el-input>
            </el-form-item>
    <el-form-item label="首字母拼音">
                <el-input v-model="queryForm.firstLetter" placeholder="请输入首字母拼音"></el-input>
            </el-form-item>
    <el-form-item label="区分公共和个人">
                <oa-select v-model="queryForm.addressType" placeholder="请选择区分公共和个人" :options="optAddressType" code="address" clearable/>
            </el-form-item>
        </template>
        <template slot-scope="{btns}" slot="btns">
        </template>
    </oa-table>
</template>

<script>
    import formComponent from "./component/form";
    export default {
        data() {
            return {
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/addressBook/page",
                    method: "post",
                    params: {
                        keyword : ""
                    }
                },
                //列头属性配置
                columns: [
                    {
                        label: "名称",
                        prop: "name",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.name;
                        }
                    },
                    {
                        label: "单位名称",
                        prop: "untiName",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.untiName;
                        }
                    },
                    {
                        label: "部门名称",
                        prop: "deptName",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.deptName;
                        }
                    },
                    {
                        label: "个人手机电话",
                        prop: "personPhone",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.personPhone;
                        }
                    },
                    {
                        label: "办公电话",
                        prop: "telephone",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.telephone;
                        }
                    },
                    {
                        label: "个人邮箱",
                        prop: "personMail",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.personMail;
                        }
                    },
                    {
                        label: "生日",
                        prop: "birthday",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.birthday;
                        }
                    },
                    {
                        label: "操作",
                        align: "center",
                        //单元格自定义渲染操作
                        opts: [
                            {
                                //按钮名称
                                title: "修改",
                                //回调事件，入参：（1：行数据，2：行角标）
                                click: this.editRow
                            },
                            {
                                title: "删除",
                                click: this.deleteRow
                            }
                        ]
                    }
                ]
                ,optAddressType : []
            };
        },
        methods: {
            //当showCheck为true时，勾选行时的回调事件，入参：勾选后的值
            onCheck(checks) {
                console.log(checks);
            },
            //新增方法回调
            addFunc() {
                this.$open({
                    title: "新增通讯录",
                    width: "10rem",
                    confirmText:"保存",
                    closeText:"取消",
                    component: formComponent,
                    confirm: () => {
                        this.$refs.table.reload();
                    }
                });
            },
            //修改方法回调
            editRow(row, index) {
                this.$open({
                    title: "修改通讯录",
                    width: "10rem",
                    confirmText:"保存",
                    closeText:"取消",
                    component: formComponent,
                    props: {
                        id: row.id
                    },
                    confirm: () => {
                        this.$refs.table.reload();
                    }
                });
            },
            //删除方法回调
            deleteRow(row, index) {
                this.$confirm("是否删除?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    Ajax.delete("/addressBook/delete", {
                        id: row.id
                    }).then(res => {
                        this.$message.success("删除成功");
                        this.$refs.table.reload();
                    });
                });
            }
        }
    };
</script>

<style lang='scss' scoped>
</style>
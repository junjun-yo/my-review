<template>
  <el-row>
            <el-col :span="24" >
                <el-card class="full-card" shadow="never">
                <div slot="header" class="clearfix card-header">
                    <el-row>
                    <el-col :span="24">
                        <el-button-group style="float: right; ">
                        <el-button type="primary" @click="addFunc">新增</el-button>
                        </el-button-group>
                    </el-col>
                    </el-row>
                </div>
                    <oa-table :ajax="ajaxParams" :columns="columns" showCheck :adjustHeight="-73"
                            @check="onCheck"  ref="table" :more="false"
                            :sort="['deptName','sortNo']">
                    </oa-table>
                </el-card>
            </el-col>
            </el-row>
</template>

<script>
    import formComponent from "./components/form";
    import store from "@/store";
    export default {
        props: {
            user: Object
        },
        created(){
        },
        data() {
            return {
                store,
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/system/sysUser/list",
                    method: "post",
                    params: {
                        accountId : this.user.accountId,
                        defaultFlag : 2
                    }
                },
                dept:null,
                //列头属性配置
                columns: [
                    {
                        label: "姓名",
                        prop: "userName",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.userName;
                        }
                    },
                    {
                        label: "兼职部门",
                        prop: "deptId",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.deptId;
                        }
                    },
                    {
                        label: "人员称呼",
                        prop: "appellation",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.appellation;
                        }
                    },
                    {
                        label: "排序码",
                        prop: "mobilephone",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.sortNo;
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
            };
        },
        methods: {
            //新增方法回调
            addFunc() {
                this.$open({
                    title: "新增兼职",
                    width: "10rem",
                    confirmText:"保存",
                    closeText:"取消",
                    component: formComponent,
                    props: {
                        accountId : this.user.accountId
                    },
                    confirm: () => {
                        this.$refs.table.reload();
                    }
                });
            },
            //修改方法回调
            editRow(row, index) {
                this.$open({
                    title: "修改兼职",
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
                    Ajax.delete("/system/sysUser/deletePosition", {
                        id: row.userId
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
    .el-card.is-always-shadow{
        background: #F2F6FC;
        color: #409EFF;
        border-color: #409EFF;
    }
</style>
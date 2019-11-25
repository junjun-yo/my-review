<template>
    <el-container style="height: 100%;">
        <el-aside width="300px">
            <div style="height:100%;">
                <ztree
                @click="nodeClick"
                title="部门"
                ref="deptTree"
                :url="url"
                />
            </div>
        </el-aside>

        <el-main>
            <el-row style="height: 100%;">
            <el-col :span="24" >
                <el-card class="full-card" shadow="never">
                <div slot="header" class="clearfix card-header">
                    <el-row>
                    <el-col v-if="curFlowType && curFlowType!=''" :span="24">
                        <el-breadcrumb separator="/">
                        <el-breadcrumb-item>{{curFlowType}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{curSubType}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24">
                        <el-input v-model="ajaxParams.params.userName" placeholder="姓名" clearable v-width="130"></el-input>
                        <el-input v-model="ajaxParams.params.account" placeholder="账号" clearable v-width="130"></el-input>
                        <el-input v-model="ajaxParams.params.mobilephone" placeholder="手机号" clearable v-width="130"></el-input>

                        <el-form-item label="账号状态">
                        <el-select v-model="ajaxParams.params.state" placeholder="账号状态" v-width="130">
                            <el-option label="请选择" value></el-option>
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="调动中" value="1"></el-option>
                            <el-option label="冻结" value="2"></el-option>
                        </el-select>
                        </el-form-item>


                        <el-button-group style="float: right; ">
                        <el-button type="primary" @click="addFunc">新增</el-button>
                        </el-button-group>
                    </el-col>
                    </el-row>
                </div>
                    <oa-table :ajax="ajaxParams" :columns="columns" showCheck showPage :adjustHeight="-73"
                            @check="onCheck"  ref="table" :more="false"
                            :sort="['deptName','sortNo']">
                        <template slot-scope="{row,col}" slot="render">
                            <span v-show="row.state == 1 && row.deptId != row.lastDept">
                            <el-link type="primary" @click="userReceive(row)">接收</el-link>
                            </span>
                         <!---   <span v-show="row.state == 1 && row.deptId == row.lastDept && row.lastDept != '' ">
                            <el-link type="primary" @click="cancel(row)">取消调离</el-link>
                            </span>
                          -->  <span v-show="row.state != 1">
                            <el-link type="primary" @click="editRow(row)" v-show="row.defaultFlag == 1">修改</el-link>
                            <el-divider direction="vertical"></el-divider>
                            <el-link type="primary" @click="bindRoles(row)">用户角色</el-link>
                            <el-divider direction="vertical"></el-divider>
                            <el-dropdown
                                size="medium"
                                v-show="row.defaultFlag == 1"
                            >
                                <el-link type="primary">
                                更多操作
                                <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-link>
                                <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="transferAway(row)" v-show="row.state == 0">调离</el-dropdown-item>
                                <el-dropdown-item @click.native="cancel(row)" v-show="row.state == 0">取消调离</el-dropdown-item>
                                <el-dropdown-item @click.native="receive(row)" v-show="row.state == 1">接收</el-dropdown-item>
                                <el-dropdown-item @click.native="userPosition(row)" v-show="row.state == 0">兼职</el-dropdown-item>
                                <el-dropdown-item @click.native="frozen(row)" v-show="row.state == 0">冻结</el-dropdown-item>
                                <el-dropdown-item @click.native="recover(row)" v-show="row.state == 2">恢复</el-dropdown-item>
                                <el-dropdown-item @click.native="resetPassword(row)" v-show="row.state == 0">重置密码</el-dropdown-item>
                                <el-dropdown-item divided @click.native="deleteRow(row)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            </span>
                    
                    </template>
                    </oa-table>
                </el-card>
            </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import formComponent from "./components/form";
    import positionFormComponent from "../sys_user_position";
    import store from "@/store";
    export default {
        created(){
            this.ajaxParams.params.unitId = store.state.account.sysUser.unitId
            this.url = "/system/addressBook/deptTree?unitId=" + store.state.account.sysUser.unitId;
        },
        data() {
            return {
                store,
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/system/sysUser/page",
                    method: "post",
                    params: {
                        deptName : "",
                        parentId : "",
                        unitId : ""
                    }
                },
                dept:null,
                //列头属性配置
                columns: [
                    {
                        label: "部门名称",
                        prop: "deptName",
                        align: "",
                        width: "",
                        fmt:(row)=>{
                            return row.deptName;
                        }
                    },
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
                        label: "账号",
                        prop: "account",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.account;
                        }
                    },
                    {
                        label: "手机号",
                        prop: "mobilephone",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.type;
                        }
                    },
                    {
                        label: "用户状态",
                        prop: "state",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.state == '1'? '调动中' : row.state == '2' ? "冻结中" : "正常";
                        }
                    },
                    {
                        label: "排序码",
                        prop: "sortNo",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.sortNo;
                        }
                    },
                    {
                        label: "操作",
                        align: "center",
                        render: true
                       
                    }
                ]
            };
        },
        methods: {
            //部门树点击回调
            nodeClick(nodeData) {
                this.dept = nodeData.item;
                this.ajaxParams.params.deptNo = this.dept.deptNo
                this.$refs.table.reload();
            },
            //新增方法回调
            addFunc() {
                this.$open({
                    title: "新增人员",
                    width: "10rem",
                    confirmText:"保存",
                    closeText:"取消",
                    component: formComponent,
                    props: {
                        deptId : this.dept.id
                    },
                    confirm: (data) => {
                        this.$refs.table.reload();
                    }
                });
            },
            //修改方法回调
            editRow(row, index) {
                this.$open({
                    title: "修改用户",
                    width: "10rem",
                    confirmText:"保存",
                    closeText:"取消",
                    component: formComponent,
                    props: {
                        id: row.userId,
                        parentDept: this.parentDept
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
                    Ajax.delete("/system/sysUser/delete", {
                        accountId: row.accountId
                    }).then(res => {
                        this.$message.success("删除成功");
                        this.$refs.table.reload();
                    });
                });
            },
            //用户兼职回调
            userPosition(row, index) {
                 this.$open({
                    title: "兼职信息",
                    width: "10rem",
                    component: positionFormComponent,
                    props: {
                        user: row
                    },
                    confirm: () => {
                        this.$refs.table.reload();
                    },
                    cancel: () => {
                        this.$refs.table.reload();
                    }
                });
            },
            //用户调离
            transferAway(row, index) {
                console.log(row);
                 this.$openDeptSelect({
                    allowCheckCount: 1,
                    confirm: data => {
                        if (data.id == row.deptId) {
                        this.$message.error("调离部门与当前部门一致，请重新选择！");
                        } else {
                        Ajax.put("/system/sysUser/transferAway", {
                            userId: row.userId,
                            deptId: data.id
                        }).then(res => {
                            this.$message({
                            type: "success",
                            message: "调离成功!"
                            });
                            this.$refs.table.reload();
                        });
                        }
                    }
                    });
            },
            //接收
            receive(row, index) {
                this.$confirm(`是否确认接收？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true
                })
                    .then(() => {
                    Ajax.put("/system/sysUser/receive", {
                        userId: row.userId
                    }).then(res => {
                        this.$message({
                        type: "success",
                        message: "接收成功!"
                        });
                        this.$refs.table.reload();
                    });
                    })
                    .catch(err => {
                    console.log(err);
                    });
                
            },
            //取消调离
            cancel(row) {
                this.$confirm(`是否确认取消调离？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true
                })
                    .then(() => {
                    Ajax.put("/system/sysUser/cancel", {
                        id: row.userId
                    }).then(res => {
                        this.$message({
                        type: "success",
                        message: "取消调离成功!"
                        });
                        this.$refs.table.reload();
                    });
                    })
                    .catch(err => {
                    console.log(err);
                    });
            },
            //冻结
            frozen(row) {
                this.$confirm(`是否确认冻结？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true
                })
                    .then(() => {
                    Ajax.put("/system/sysUser/frozen", {
                        accountId: row.accountId
                    }).then(res => {
                        this.$message({
                        type: "success",
                        message: "冻结成功!"
                        });
                        this.$refs.table.reload();
                    });
                    })
                    .catch(err => {
                    console.log(err);
                    });
            },
            //恢复
            recover(row) {
                this.$confirm(`是否恢复账号？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true
                })
                    .then(() => {
                    Ajax.put("/system/sysUser/recovery", {
                        accountId: row.accountId
                    }).then(res => {
                        this.$message({
                        type: "success",
                        message: "恢复成功!"
                        });
                        this.$refs.table.reload();
                    });
                    })
                    .catch(err => {
                    console.log(err);
                    });
            },
            //重置密码
            resetPassword(row) {
                this.$confirm(`是否重置密码？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true
                })
                    .then(() => {
                    Ajax.put("/system/sysUser/resetPassword", {
                        accountId: row.accountId
                    }).then(res => {
                        this.$message({
                        type: "success",
                        message: "密码重置成功!"
                        });
                    });
                    })
                    .catch(err => {
                    console.log(err);
                    });
            },
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
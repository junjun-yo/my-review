<template>
    <el-container style="height: 100%;">
        <el-aside width="200px">
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
                    <el-col :span="24">
                        <el-input placeholder="部门名称" v-model="ajaxParams.params.deptName" :style="{width:'250px',float:'left'}" class="input-with-select">
                        <template slot="prepend">
                        </template>
                        <el-button type="primary" slot="append" icon="el-icon-search" plain @click="()=>{this.$refs.table.reload()}"></el-button>
                        </el-input>
                        <el-button-group style="float: right; ">
                        <el-button type="primary" @click="addFunc">新增</el-button>
                        </el-button-group>
                    </el-col>
                    </el-row>
                </div>
                    <oa-table :ajax="ajaxParams" :columns="columns" showCheck showPage :adjustHeight="-73"
                            @check="onCheck"  ref="table" :more="false"
                            :sort="['deptName','sortNo']">
                    </oa-table>
                </el-card>
            </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import formComponent from "./components/form";
    import store from "@/store";
    export default {
        created(){
            this.ajaxParams.params.parentId = store.state.account.sysUser.unitId
            this.url = "/system/addressBook/deptTree?unitId=" + store.state.account.sysUser.unitId;
        },
        data() {
            return {
                store,
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/system/sysDept/page",
                    method: "post",
                    params: {
                        deptName : "",
                        parentId : "",
                        unitId : ""
                    }
                },
                url:"",
                parentDept:null,
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
                        label: "部门简称",
                        prop: "shortName",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.shortName;
                        }
                    },
                    {
                        label: "部门类型",
                        prop: "codePrefix",
                        align: "",
                        width: "",
                        fmt(row){
                            //row.type|dict('deptType')
                            return row.type;
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
            //部门树点击回调
            nodeClick(nodeData) {
                this.parentDept = nodeData.item;
                
                this.ajaxParams.params.parentId = this.parentDept.id
                this.$refs.table.reload();
            },
            //新增方法回调
            addFunc() {
                this.$open({
                    title: "新增部门",
                    width: "10rem",
                    confirmText:"保存",
                    closeText:"取消",
                    component: formComponent,
                    props: {
                        parentDept : this.parentDept
                    },
                    confirm: () => {
                        this.$refs.table.reload();
                    }
                });
            },
            //修改方法回调
            editRow(row, index) {
                this.$open({
                    title: "修改部门",
                    width: "10rem",
                    confirmText:"保存",
                    closeText:"取消",
                    component: formComponent,
                    props: {
                        id: row.id,
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
                    Ajax.delete("/system/sysDept/delete", {
                        id: row.id
                    }).then(res => {
                        this.$message.success("删除成功");
                        this.$refs.table.reload();
                    });
                });
            },
            setFlowType(item){
                this.ajaxParams.params.flowType = item.key;
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
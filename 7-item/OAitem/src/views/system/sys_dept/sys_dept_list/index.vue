<template>
    <el-container style="height: 100%;">
        <el-aside width="200px">
            <el-row style="height: 100%;">
                <el-col style="margin-top:10px;margin-left:10px;" :span="20">
                  <div slot="header" class="clearfix">
                      <span>部门列表</span>
                      <i
                        class="el-icon-refresh"
                        style="float: right;padding:0;font-size:20px;"
                        @click="refresh"
                      ></i>
                    </div>
                    <div style="height:100%;">
                      <ztree
                        @click="nodeClick"
                        title="部门"
                        ref="deptTree"
                        url="/system/addressBook/selectSysDeptList"
                      />
                  </div>
                </el-col>
            </el-row>
        </el-aside>
        <el-main>
            <oa-table :ajax="ajaxParams" :columns="columns" showToolbar showCheck showPage
                      @check="onCheck" :add="addFunc" ref="table" :more="false"
                      :sort="['deptName','sortNo']">
            </oa-table>
        </el-main>
    </el-container>
</template>

<script>
    import formComponent from "./component/form";
    import store from "@/store";
    export default {
        created(){
            this.ajaxParams.params.unitId = store.state.account.sysUnit.unitId;
        },
        data() {
            return {
                store,
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/common/form/type/page",
                    method: "post",
                    params: {
                        keyword : "",
                        flowType : "01",
                        unitId : ""
                    }
                },
                //列头属性配置
                columns: [
                    {
                        label: "部门名称",
                        prop: "deptName",
                        align: "",
                        width: "",
                        fmt:(row)=>{
                            return row.name;
                        }
                    },
                    {
                        label: "部门简称",
                        prop: "shortName",
                        align: "",
                        width: "",
                        fmt(row){
                            return row.name;
                        }
                    },
                    {
                        label: "部门类型",
                        prop: "codePrefix",
                        align: "",
                        width: "",
                        fmt(row){
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
            //当showCheck为true时，勾选行时的回调事件，入参：勾选后的值
            onCheck(checks) {
                console.log(checks);
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
                        unitId : this.ajaxParams.params.unitId,
                        flowType : this.ajaxParams.params.flowType
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
                    Ajax.delete("/common/form/type/delete", {
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
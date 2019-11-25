<!--复杂查询，待完善-->
<template>
    <el-container style="height: 100%;">
        <el-main>
            <el-card class="full-card" shadow="never" style="overflow-y: auto;">
                <oa-table v-if="showTable"
                          ref="table"
                          :ajax="ajaxParams"
                          ajaxType="json"
                          :columns="columns"
                          showToolbar
                          showCheck
                          showPage
                          :more="true"
                          keywordTxt="关键字检索"
                          :adjustHeight="-50"
                          showTooltip="true"
                          @check="onCheck"
                          :sort="['TASK_NAME']"
                >
                    <template slot-scope="{queryForm}" slot="more">
                        <!--<el-form-item label="自定义扩展查询">-->
                        <!--<el-input v-model="queryForm.abc" placeholder="自定义扩展查询"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="自定义扩展查询">-->
                        <!--<el-input v-model="queryForm.edf" placeholder="自定义扩展查询"></el-input>-->
                        <!--</el-form-item>-->
                    </template>
                    <!--<template slot-scope="{btns}" slot="btns">-->
                    <!--</template>-->
                    <!--<template slot-scope="{row,col}" slot="render">-->
                    <!--</template>-->
                </oa-table>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import store from "@/store";
    import workflowNode from "../node";

    export default {
        created(){
            this.ajaxParams.params.flowType = this.$route.params.flowType;
            this.ajaxParams.params.taskStatus = this.$route.params.taskStatus;
            this.querySysColumns();
        },
        data() {
            return {
                showTable: false,
                subTypes: [],
                curType: "",
                rows: [],
                store,
                workflowNode,
                sysColumns: [],
                ajaxParams: {
                    url: "/flow/task/pageWFE",
                    method: "post",
                    params: {
                        assignee : "",
                        createUnit : store.state.account.sysUser.unitId,
                        flowType: "",
                        taskStatus: "",
                        keyword : "",
                        params : {}
                    }
                },
                columns: [
                    {
                        label: "处理动作",
                        width: "110px",
                        prop: "TASK_NAME",
                        fixed: "left",
                    },
                    {
                        label: "接收时间",
                        prop: "CREATE_DATE",
                        width: "120px",
                        fmt: row => {
                            return this.$options.filters["date"](row.CREATE_DATE, "yyyy-MM-dd");
                        }
                    },
                    {
                        label: "流程名称",
                        width: "160px",
                        prop: "FLOW_NAME"
                    },
                    // {
                    //     label: "流程类型",
                    //     prop: "FLOW_TYPE",
                    //     width: "100px",
                    //     fmt: row=>{
                    //         return this.$options.filters["dict"](row.FLOW_TYPE,"flowType");
                    //     }
                    // },
                    // {
                    //     label: "任务状态",
                    //     prop: "TASK_STATUS",
                    //     align: "center",
                    //     width: "100px",
                    //     fmt: row=>{
                    //         return workflowNode.filter('taskStatus',row.TASK_STATUS);
                    //     }
                    // },
                    {
                        label: "操作",
                        align: "center",
                        width: "140px",
                        fixed: "right",
                        opts: [
                            {
                                title: "办理",
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
            onCheck(checks) {
                console.log(checks);
            },
            startFunc(row) {
                this.$confirm("是否发起一个流程["+row.flowName+"]任务?", "提示", {
                    type: "info"
                }).then(() => {
                    let url = "/flow/task/start?flowId=" + row.id + "&userId=" + store.state.account.sysUser.userId;
                    let variables = {
                        localScope: true,
                        transientVariables: {
                        },
                        variables: {
                        }
                    }
                    Ajax.put(url, variables, "json").then(res => {
                        this.$message.success("发起成功");
                    });
                });
            },
            querySysColumns(){
                Ajax.post("/common/form/syscolumn/list",{
                    flowType: "0",
                    isSearch: "1",
                    sortField: "sort",
                    sortType: "asc"
                }).then(res => {
                    this.sysColumns = res.data;
                    this.initColumns();
                });
            },
            initColumns(){
                if(this.sysColumns && this.sysColumns.length > 0){
                    for(let i in this.sysColumns){
                        this.columns.splice(this.columns.length-1,0,{
                            label: this.sysColumns[i].name,
                            prop: this.sysColumns[i].columnName,
                            width: "120px"
                        });
                        this.ajaxParams.params.params[this.sysColumns[i].columnName]="";
                    }
                }
                this.showTable = true;
                // this.$refs.table.reload();

            },
            queryFlow(){
                Ajax.post("/flow/definition/list",{
                    createUnit : store.state.account.sysUser.unitId,
                    flowStatus : "1",
                    flowType : this.flowType,
                    keyword : ""
                }).then(res => {
                    this.rows = res.data;
                });
            },
            setSubType(item){
                this.curType = item.id;
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
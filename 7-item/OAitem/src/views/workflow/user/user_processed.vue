<template>
    <el-container style="height: 100%;">
        <el-main>
            <el-card class="full-card" shadow="never" style="overflow-y: auto;">
                <oa-table
                        ref="table"
                        :ajax="ajaxParams"
                        :columns="columns"
                        showToolbar
                        showCheck
                        showPage
                        :more="true"
                        keywordTxt="标题检索"
                        :adjustHeight="-50"
                        :showTooltip="true"
                        @check="onCheck"
                        :sort="['flowName','instanceTitle','createDate']"
                >
                    <template slot-scope="{queryForm}" slot="more">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="文号" label-width="70px">
                                    <el-input v-model="queryForm.instanceFileNo" placeholder="请输入文号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="文件状态" label-width="70px">
                                    <oa-select v-model="queryForm.instanceStatus" :options="workflowNode.instanceStatus" clearable/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="创建人" label-width="70px">
                                    <!--<el-input v-model="queryForm.instanceCreateUser" placeholder="请选择创建人"></el-input>-->
                                    <user-select v-model="queryForm.instanceCreateUser" :allowCheckCount="1"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="创建时间" label-width="70px">
                                    <el-date-picker
                                            v-model="queryForm.createDateFw"
                                            type="daterange"
                                            value-format="yyyy-MM-dd"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            @change="onChangeDate">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </template>
                    <template slot-scope="{btns}" slot="btns">
                        <el-button-group>
                            <el-button :disabled="!checkRows || checkRows.length<=0" type="primary"
                                       icon="el-icon-message-solid" plain>催办
                            </el-button>
                            <el-button :disabled="!checkRows || checkRows.length<=0" type="primary"
                                       icon="el-icon-s-promotion" plain>发垂直单位
                            </el-button>
                            <el-button :disabled="!checkRows || checkRows.length<=0" type="primary"
                                       icon="el-icon-user-solid" plain>发本局人员
                            </el-button>
                            <el-button :disabled="!checkRows || checkRows.length<=0" type="primary" icon="el-icon-eleme"
                                       plain>转内门户
                            </el-button>
                        </el-button-group>
                    </template>
                    <template slot-scope="{row,col}" slot="render">
                        <el-link type="primary" v-if="col.prop=='instanceTitle'" @click="showDetails(row)">
                            {{row.instanceTitle}}
                        </el-link>
                    </template>
                </oa-table>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import store from "@/store";
    import workflowNode from "../node";
    export default {
        created() {
            this.ajaxParams.params.flowType = this.$route.params.flowType;
        },
        data() {
            return {
                store,
                workflowNode,
                ajaxParams: {
                    url: "/flow/task/processed",
                    method: "post",
                    params: {
                        assignee: store.state.account.sysUser.userId,
                        createUnit: store.state.account.sysUser.unitId,
                        flowType: "",
                        keyword: "",
                        createDateStart: "",
                        createDateEnd: ""
                    }
                },
                columns: [
                    {
                        label: "文号",
                        prop: "instanceFileNo",
                        width: "180px"
                    },
                    {
                        label: "标题",
                        prop: "instanceTitle",
                        render: true
                    },
                    {
                        label: "发送时间",
                        prop: "createDate",
                        width: "160px",
                        align: "center",
                        fmt: row => {
                            return this.$options.filters["date"](row.createDate, "yyyy-MM-dd hh:mm:ss");
                        }
                    },
                    {
                        label: "发送人",
                        prop: "createUserName",
                        align: "center",
                        width: "100px"
                    },
                    {
                        label: "当前处理人",
                        prop: "assigneeName",
                        align: "center",
                        width: "100px"
                    },
                    {
                        label: "当前环节",
                        prop: "stepName",
                        align: "center"
                    },
                    {
                        label: "状态",
                        width: "100px",
                        align: "center",
                        prop: "instanceStatus",
                        fmt: row => {
                            return this.workflowNode.filter("taskStatus", row.instanceStatus);
                        }
                    },
                    {
                        label: "操作",
                        align: "center",
                        width: "140px",
                        opts: [
                            {
                                title: "查看",
                                click: this.selectRow
                            }
                        ]
                    }
                ],
                checkRows: []
            };
        },
        methods: {
            onCheck(value) {
                this.checkRows = value;
            },
            onChangeDate(value) {
                if(value && value.length>1){
                    this.ajaxParams.params.createDateStart = value[0];
                    this.ajaxParams.params.createDateEnd = value[1];
                }
            },
            showDetails(item) {
                console.log(item);
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
<template>
    <el-row class="full">
        <el-col :span="4">
            <el-card class="full-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>栏目列表</span>
                    <i
                            class="el-icon-refresh"
                            style="float: right;padding:0;font-size:20px;"
                            @click="()=>{this.$refs.cataTree.refresh()}"
                    ></i>
                </div>
                <div style="height:100%;">
                    <ztree
                            @click="nodeClick"
                            title="栏目"
                            ref="cataTree"
                            url="/cms/document/treeListForDoc"
                            :params="treeParams"
                    />
                </div>
            </el-card>
        </el-col>
        <el-col :span="20">
            <el-card class="full-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>{{curNode.cataName}} - 文档列表</span>
                </div>
                <div>
                    <oa-table :ajax="ajaxParams" :columns="columns" showToolbar showCheck showPage
                              @check="onCheck" :add="addFunc" ref="table"
                              :sort="['docTitle','docType','docCreatedate','docTop']">
                        <template slot-scope="{queryForm}" slot="more">
                            <el-form-item label="文档标题">
                                <el-input v-model="queryForm.docTitle" placeholder="请输入文档标题"></el-input>
                            </el-form-item>
                            <el-form-item label="文档类型">
                                <oa-select v-model="queryForm.docType" placeholder="请选择文档类型" :options="optDocType"
                                           clearable/>
                            </el-form-item>
                            <el-form-item label="关键字">
                                <el-input v-model="queryForm.docKey" placeholder="请输入关键字"></el-input>
                            </el-form-item>
                        </template>
                        <template slot-scope="{btns}" slot="btns">
                        </template>
                        <template slot-scope="{row,col}" slot="render">
                            <el-tag v-if="col.prop=='docType' && row.docType == '1'" effect="dark">普通类型</el-tag>
                            <el-tag v-if="col.prop=='docType' && row.docType == '2'" effect="dark" type="success">链接类型
                            </el-tag>
                            <el-tag v-if="col.prop=='docType' && row.docType == '3'" effect="dark" type="danger">图片类型
                            </el-tag>
                            <el-tag v-if="col.prop=='docTop' && row.docTop == '1'" type="success">是</el-tag>
                            <el-tag v-if="col.prop=='docTop' && row.docTop == '0'" type="danger">否</el-tag>
                        </template>
                    </oa-table>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import formComponent from "./component/form";

    export default {
        data() {
            return {
                curNode: {},
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/cms/document/page",
                    method: "post",
                    params: {
                        keyword: "",
                        docCataid: ""
                    }
                },
                treeParams: {
                    showType: "1"
                },
                //列头属性配置
                columns: [
                    {
                        label: "文档标题",
                        prop: "docTitle",
                        align: "",
                        width: "",
                        fmt(row) {
                            return row.docTitle;
                        }
                    },
                    {
                        label: "文档类型",
                        prop: "docType",
                        align: "center",
                        width: "150",
                        render: true
                    },
                    {
                        label: "发布时间",
                        prop: "docCreatedate",
                        align: "center",
                        width: "150",
                        fmt(row) {
                            return row.docCreatedate;
                        }
                    },
                    {
                        label: "是否置顶",
                        prop: "docTop",
                        align: "center",
                        width: "150",
                        render: true
                    },
                    {
                        label: "操作",
                        align: "center",
                        width: "150",
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
                ,
                optDocType: [{"value": "-1", "label": "全部"}, {"value": "1", "label": "普通类型"}, {
                    "value": "2",
                    "label": "链接类型"
                }, {"value": "3", "label": "图片类型"}]
                ,
                optDocReadscope: [{"value": "1", "label": "全体人员"}, {"value": "2", "label": "单位内"}, {
                    "value": "3",
                    "label": "部门内"
                }]
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
                    title: "新增文档",
                    width: "10rem",
                    confirmText: "保存",
                    closeText: "取消",
                    component: formComponent,
                    props: {
                        docCataid: this.curNode.id
                    },
                    confirm: () => {
                        this.$refs.table.reload();
                    }
                });
            },
            //修改方法回调
            editRow(row, index) {
                this.$open({
                    title: "修改文档",
                    width: "10rem",
                    confirmText: "保存",
                    closeText: "取消",
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
                    Ajax.delete("/cms/document/delete", {
                        id: row.id
                    }).then(res => {
                        this.$message.success("删除成功");
                        this.$refs.table.reload();
                    });
                });
            },
            //点击栏目节点
            nodeClick(nodeData) {
                let catalog = nodeData.item;
                this.curNode = catalog;
                this.ajaxParams.params.docCataid = this.curNode.id;
            }
        }
    };
</script>

<style lang='scss' scoped>
</style>
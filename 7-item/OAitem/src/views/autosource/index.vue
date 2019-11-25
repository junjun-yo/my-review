<template>
    <el-row class="full">
        <el-col :span="24">
            <el-card class="full-card" shadow="never">
                <oa-table
                        ref="table"
                        :ajax="ajaxParams"
                        :columns="columns"
                        showToolbar
                        showCheck
                        showPage
                        :more="false"
                        keywordTxt="名称 | 类名 | 表名"
                        @check="onCheck"
                        :sort="['name','tableName','clazzName']" >
                    <template slot-scope="{btns}" slot="btns">
                        <el-button type="primary" icon="el-icon-plus" plain @click="detail()">创建</el-button>
                        <el-button type="success" icon="el-icon-share" :disabled="!exportVo.infos || exportVo.infos.length == 0" plain @click="drawer = true">生成</el-button>
                    </template>
                </oa-table>
            </el-card>
        </el-col>

        <el-drawer title="代码发布" :visible.sync="drawer" :direction="'rtl'" size="50%" >
            <div class="demo-drawer__content" style="padding: 0px 0px 10px 30px;">
                <el-form label-width="80px">
                    <el-form-item label="发布实体">
                        <el-tag v-for="tag in exportVo.infos" :key="tag.id" closable style="margin-right:8px;margin-bottom: 8px;" size="medium" @close="handleTagClose(tag)">{{tag.name}}</el-tag>
                    </el-form-item>
                    <el-form-item label="生成选择">
                        <el-checkbox-group v-model="exportVo.exportTypes">
                            <el-checkbox v-for="et in exportType" :label="et.value" :key="et.value">{{et.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="drawer = false">取 消</el-button>
                    <el-button type="primary" @click="expSource()" :loading="exportLoading">{{ exportLoading ? '处理中 ...' : '生 成' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </el-row>

</template>

<script>
    import initForm from "./components/info_form";
    export default {
        data() {
            return {
                exportLoading: false,
                drawer: false,
                exportVo: {
                    infos:[],
                    exportTypes:['model','mapper','service','rest']
                },
                exportType: [
                    {label:'实体层',value:'model'},
                    {label:'数据层',value:'mapper'},
                    {label:'服务层',value:'service'},
                    {label:'接口层',value:'rest'},
                    {label:'前端组件',value:'web'},
                    {label:'初始化表',value:'db'}
                ],
                ajaxParams: {
                    url: "/common/as/entity/page",
                    method: "post",
                    params: {
                    }
                },
                columns: [
                    { label: "对象名称", prop: "name",  width: "", align: "" },
                    { label: "类名称", prop: "clazzName", width: "", align: "" },
                    { label: "表名称", prop: "tableName", width: "", align: "" },
                    { label: "包路径", prop: "packageName", width: "", align: "" },
                    { label: "操作", align: "center",
                        //单元格自定义渲染操作
                        opts: [
                            {
                                //按钮名称
                                title: "修改",
                                icon: "el-icon-edit",
                                //回调事件，入参：（1：行数据，2：行角标）
                                click: this.detail
                            },
                            {
                                title: "删除",
                                icon: "el-icon-remove",
                                click: this.remove
                            }
                        ]
                    }
                ]
            };
        },
        created : function(){
        },
        methods: {
            onCheck(checks) {
                this.exportVo.infos.splice(0,this.exportVo.infos.length);
                for(let i in checks) {
                    this.exportVo.infos.push({id:checks[i].id,name:checks[i].name});
                }
            },
            refresh() {
                this.$refs.table.reload();
            },
            expSource() {
                if(this.exportVo) {
                    if (!this.exportVo.infos || this.exportVo.infos.length == 0) {
                        this.$message.error("未指定生成实体对象");
                        return;
                    } else if (!this.exportVo.exportTypes || this.exportVo.exportTypes.length == 0) {
                        this.$message.error("未指定生成代码方式");
                        return;
                    }
                    this.$confirm("是否发布代码？所选代码发布规则将会覆盖已有文件!", "提示", {
                        type: "warning"
                    }).then(() => {
                        this.exportLoading = true;
                        let ids = [];
                        for (let i in this.exportVo.infos) {
                            ids.push(this.exportVo.infos[i].id);
                        }
                        let params = {
                            exportType: this.exportVo.exportTypes.join(","),
                            entityIds: ids.join(",")
                        }
                        this.exportLoading = false;
                        Ajax.post("/common/as/entity/export", params).then(res => {
                            this.exportLoading = false;
                            this.drawer = false;
                            if (res.success) {
                                // this.$message.success("发布成功");
                                this.$notify({
                                    title: '成功',
                                    message: '代码生成成功',
                                    type: 'success'
                                });
                                this.refresh();
                            }else{
                                this.$notify.error({
                                    title: '失败',
                                    message: res.msg ? res.msg : '操作失败'
                                });
                            }
                        });
                    });
                }
            },
            detail(row) {
                this.$open({
                    title: row ? "["+row.name+"]编辑" : "新建实体",
                    confirmText:"保存",
                    closeText:"取消",
                    component: initForm,
                    width: "1000px",
                    props: {
                        id: row ? row.id : null
                    },
                    confirm: () => {
                        this.refresh();
                    }
                });
            },
            remove(item) {
                this.$confirm("是否删除?", "提示", {
                    type: "warning"
                }).then(() => {
                    Ajax.delete("/common/as/entity/delete", {
                        id: item.id
                    }).then(res => {
                        if (res.success) {
                            this.$message.success("删除成功");
                            this.refresh();
                        }
                    });
                });
            },
            handleTagClose(tag) {
                if(this.exportVo.infos && this.exportVo.infos.length > 1){
                    this.exportVo.infos.splice(this.exportVo.infos.indexOf(tag), 1);
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
    .el-drawer.rtl {
        padding: 0px 0px 10px 30px!important;
    }
</style>
<template>
    <oa-table :ajax="ajaxParams" :columns="columns" showToolbar showCheck showPage
              @check="onCheck" :add="addFunc" ref="table"
            :sort="[]">
        <template slot-scope="{queryForm}" slot="more">
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
                    url: "/category/page",
                    method: "post",
                    params: {
                        keyword : ""
                    }
                },
                //列头属性配置
                columns: [
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
                    title: "新增通讯录组",
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
                    title: "修改通讯录组",
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
                    Ajax.delete("/category/delete", {
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
<template>
    <div style="height: 100%">
        <el-card id="catalog-card" class="full-card" shadow="never">
            <div slot="header">
                <span>栏目列表</span>
            </div>
            <!-- dai -->
            <div class="catalog-table" v-if="search.length==0">
                <el-table
                        :data="tableData"
                        style="width: 100%;margin-bottom: 20px; padding: .2rem;"
                        row-key="id"
                        border
                        default-expand-all
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                        v-loading="tableLoading"
                >
                    <el-table-column prop="cataName" label="栏目名称"></el-table-column>
                    <el-table-column label="栏目类型" align="center">
                        <template slot-scope="{row}">
                            <el-tag effect="dark" type="success" v-if="row.cataType == 1">公有栏目</el-tag>
                            <el-tag effect="dark" type="danger" v-if="row.cataType == 2">私有栏目</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否审核" align="center">
                        <template slot-scope="{row}">
                            <el-tag type="success" v-if="row.cataCheckflag == 1">是</el-tag>
                            <el-tag type="danger" v-if="row.cataCheckflag == 0">否</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否控制起草" align="center">
                        <template slot-scope="{row}">
                            <el-tag type="success" v-if="row.cataCreateflag == 1">是</el-tag>
                            <el-tag type="danger" v-if="row.cataCreateflag == 0">否</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否启用" align="center">
                        <template slot-scope="{row}">
                            <el-tag type="success" v-if="row.cataEnable == 1">是</el-tag>
                            <el-tag type="danger" v-if="row.cataEnable == 0">否</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="{row}">
                            <el-link type="primary" @click="editCatalog(row)" v-if="row.cataParentid!=-1">编辑</el-link>
                            <el-divider direction="vertical" v-if="row.cataParentid!=-1"></el-divider>
                            <el-link type="primary" @click="removeCatalog(row.id)" v-if="row.cataParentid!=-1">删除</el-link>
                            <el-divider direction="vertical" v-if="row.cataParentid!=-1"></el-divider>
                            <el-link type="primary" @click="addCatalog(row)">新增下级</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    import Edit from "@/views/cms/cmsCatalog/component/form";
    export default {
        components: {
            Edit
        },
        data() {
            return {
                // 整个table数据
                datas: [],
                // 整个数据树 源数据
                sourceLists: [],
                // 整个数据树
                tableData: [],
                // search 的字符
                searchData: [],
                // search 数据树
                search: [],
                // search 显示
                showSearch: false,
                // loading
                tableLoading: false,
                // 搜索字符
                searchString: ""
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 递归
            recur(obj) {
                let datas = this.datas;
                for (let j = 0; j < obj.length; j++) {
                    let arr = [];
                    for (let i = 0; i < datas.length; i++) {
                        if (datas[i].cataParentid == obj[j].id && datas[i].cataParentid != -1) {
                            // arr.push(datas[i]);
                            arr.push({
                                id: datas[i].id,
                                cataName: datas[i].cataName,
                                cataType: datas[i].cataType,
                                cataCheckflag: datas[i].cataCheckflag,
                                cataCreateflag: datas[i].cataCreateflag,
                                cataEnable: datas[i].cataEnable,
                                cataParentid: datas[i].cataParentid
                            });
                        }
                    }
                    if (arr && arr.length > 0) {
                        // console.log(arr);
                        obj[j]["children"] = arr;
                        this.recur(arr);
                    }
                }
            },
            //初始化 取全部数据 保存一份源数据树sourceLists
            getData() {
                let that = this;
                Ajax.post("/cms/catalog/treeList").then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            this.datas = res.data;
                            let datas = res.data;
                            let arrBase = [];
                            for (let i = 0; i < datas.length; i++) {
                                if (datas[i].cataParentid == -1) {
                                    arrBase.push({
                                        id: datas[i].id,
                                        cataName: datas[i].cataName,
                                        cataType: datas[i].cataType,
                                        cataCheckflag: datas[i].cataCheckflag,
                                        cataCreateflag: datas[i].cataCreateflag,
                                        cataEnable: datas[i].cataEnable,
                                        cataParentid: datas[i].cataParentid
                                    });
                                }
                            }

                            this.recur(arrBase);
                            this.tableData = arrBase;
                            this.sourceLists = JSON.parse(JSON.stringify(this.tableData));
                        }

                        this.loading = false;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            // 编辑该条数据
            editCatalog(data) {
                this.$open({
                    title: "编辑栏目",
                    component: Edit,
                    width: "500px",
                    props: {
                        id: data.id,
                        mode: "edit"
                    },
                    confirm: () => {
                        this.$message({
                            message: "编辑成功",
                            type: "success"
                        });
                        this.getData();
                    }
                });
            },
            // 删除该条数据
            removeCatalog(id) {
                this.$confirm(
                    "此操作将永久删除该栏目及其下级栏目信息，如果栏目下有发布的信息则同时删除, 是否继续?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                    .then(() => {
                        this.tableLoading = true;
                        Ajax.delete("/cms/catalog/delete", {
                            id: id
                        }).then(res => {
                            if (res.success) {
                                this.$message({
                                    message: "删除成功！",
                                    type: "success"
                                });
                                this.getData();
                                this.tableLoading = false;
                            } else {
                                this.$message.error("删除失败！");
                            }
                            this.tableLoading = false;
                        });
                    })
                    .catch(() => {});
            },
            // 增加一条数据
            addCatalog(data) {
                this.$open({
                    title: "新增栏目",
                    component: Edit,
                    width: "500px",
                    props: {
                        parent: data.cataName,
                        parentId: data.id,
                        cataType: data.cataType,
                        mode: "add"
                    },
                    confirm: () => {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.getData();
                    }
                });
            },
            // 查询
            searchCatalog() {
                let data = this.datas;
                let sourceData = this.sourceLists;
                let searchLists = [];
                if (this.searchString == "") {
                    // this.tableData = sourceData;
                    this.search = [];
                    return;
                }
                // console.log("未跳出函数 进入循环判断");
                for (let i = 0; i < data.length; i++) {
                    let listName = data[i].cataName;

                    if (listName) {
                        let a = listName.indexOf(this.searchString);
                        if (a != -1 && this.searchString != "") {
                            let arr = [];
                            let fatherArr = [];
                            let parentName1 = null;
                            for (let j = 0; j < data.length; j++) {
                                if (data[j].id == data[i].cataParentid) {
                                    // console.log(data[j].name);
                                    parentName1 = data[j].cataName;
                                }
                            }
                            arr.push({
                                id: data[i].id,
                                cataName: data[i].cataName,
                                cataType: data[i].cataType,
                                cataCheckflag: data[i].cataCheckflag,
                                cataCreateflag: data[i].cataCreateflag,
                                cataEnable: data[i].cataEnable,
                                cataParentid: data[i].cataParentid,
                                parentName: parentName1,
                                color: true
                            });
                            let arr1 = JSON.parse(JSON.stringify(arr));
                            this.recur(arr);
                            // console.log(arr1, arr);
                            // 父级递归
                            function getFather(obj) {
                                let arrF = [];
                                for (let l = 0; l < data.length; l++) {
                                    // console.log(obj[0].parentId);
                                    if (data[l].id == obj[0].cataParentid && obj[0].cataParentid != -1) {
                                        // console.log(data[l]);
                                        let parentName1 = "";
                                        for (let i = 0; i < data.length; i++) {
                                            if (data[l].pId == data[i].id) {
                                                parentName1 = data[i].cataName;
                                            }
                                        }
                                        arrF.push({
                                            id: data[l].id,
                                            cataName: data[i].cataName,
                                            cataType: data[i].cataType,
                                            cataCheckflag: data[i].cataCheckflag,
                                            cataCreateflag: data[i].cataCreateflag,
                                            cataEnable: data[i].cataEnable,
                                            cataParentid: data[i].cataParentid,
                                            parentName: parentName1
                                        });
                                        arrF[0]["children"] = obj;
                                        arr1 = arrF;
                                        getFather(arrF);
                                        // console.log(arrF);
                                    } else if (obj[0].cataParentid == -1 || obj[0].id == -1) {
                                        arr1 = obj;
                                    }
                                }
                            }

                            // searchLists.push(arr);
                            getFather(arr);
                            console.log(arr1);
                            searchLists.push(arr1);
                            // console.log(searchLists);
                        }
                    }
                }
                // let a = [];
                // searchLists.forEach(item => {
                //   item.forEach(item1 => {
                //     a.push(item1);
                //   });
                // });
                // console.log(a);
                // console.log(searchLists);
                this.search = searchLists;
                // console.log(this.search);
            },
            // 搜索高亮
            tableRowClassName({ row, rowIndex }) {
                console.log(row.color, row.cataName);
                if (row.color) {
                    return "warning-row";
                }
                return "";
            }
        }
    };
</script>

<style lang='scss'>
    // 搜索高亮
    .el-table .warning-row {
        background: oldlace;
    }

    .catalog-table {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        &.search-table {
            height: auto;
        }
    }
    #catalog-card {
        & > .el-card__body {
            overflow-y: auto;
        }
    }
    .catalog-search {
        float: right;
        margin-right: 0.2rem;
        line-height: 26px;
        label {
            font-size: 15px;
            margin-right: 1px;
        }
        span {
            float: right;
            width: 2rem;
        }
    }
</style>
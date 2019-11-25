<template>
  <div style="height: 100%">
    <el-card id="module-card" class="full-card" shadow="never">
      <div slot="header">
        <span>系统菜单</span>
        <div class="module-search">
          <label for="oInputSearch">搜索：</label>
          <span>
            <el-input
              v-model="searchString"
              id="oInputSearch"
              placeholder="请输入菜单名称"
              @input="searchMenu"
            ></el-input>
          </span>
        </div>
      </div>
      <!-- dai -->
      <div class="module-table" v-if="search.length==0">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px; padding: .2rem;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          v-loading="tableLoading"
        >
          <el-table-column prop="moduleName" label="菜单名称"></el-table-column>
          <el-table-column label="菜单图标" align="center">
            <template slot-scope="{row}">
              <span :class="row.moduleImage" style="font-size:35px"></span>
            </template>
          </el-table-column>
          <el-table-column label="菜单类型" align="center">
            <template slot-scope="{row}">
              <el-tag type="warning" v-if="row.moduleType == 1">菜单</el-tag>
              <el-tag type="success" v-if="row.moduleType == 2">按钮</el-tag>
              <el-tag type="danger" v-if="row.moduleType == 3">数据</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sortId" label="排序码" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-link type="primary" @click="editMenu(row)" v-if="row.id!=-1">编辑</el-link>
              <el-divider direction="vertical" v-if="row.id!=-1"></el-divider>
              <el-link type="primary" @click="removeMenu(row.id)" v-if="row.id!=-1">删除</el-link>
              <el-divider direction="vertical" v-if="row.id!=-1"></el-divider>
              <el-link type="primary" @click="addMenu(row)">新增下级</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 搜索列表 -->
      <div class="module-table search-table" v-if="search.length>0" v-for="index in search">
        <el-table
          :data="index"
          style="width: 100%;margin-bottom: 20px; padding: .2rem;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          v-loading="tableLoading"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="moduleName" label="菜单名称"></el-table-column>
          <el-table-column label="菜单图标" align="center">
            <template slot-scope="{row}">
              <span :class="row.moduleImage" style="font-size:35px"></span>
            </template>
          </el-table-column>
          <el-table-column label="菜单类型" align="center">
            <template slot-scope="{row}">
              <el-tag type="warning" v-if="row.moduleType == 1">菜单</el-tag>
              <el-tag type="success" v-if="row.moduleType == 2">按钮</el-tag>
              <el-tag type="danger" v-if="row.moduleType == 3">数据</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sortId" label="排序码" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-link type="primary" @click="editMenu(row)">编辑</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="removeMenu(row.id)">删除</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="addMenu(row)">新增下级</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import Edit from "@/views/system/sys_module/components/cmp_edit";
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
          if (datas[i].pId == obj[j].id && datas[i].id != -1) {
            // arr.push(datas[i]);
            arr.push({
              id: datas[i].id,
              moduleFlag: datas[i].item.moduleFlag,
              moduleImage: datas[i].item.moduleImage,
              moduleName: datas[i].name,
              moduleNo: datas[i].item.moduleNo,
              moduleType: datas[i].item.moduleType,
              moduleUrl: datas[i].item.moduleUrl,
              sortId: datas[i].item.sortId,

              parentName: obj[j].moduleName,
              parentId: datas[i].item.parentId
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
      Ajax.post("/system/sysModule/searchTreeList").then(res => {
        if (res.success) {
          if (res.data && res.data.length > 0) {
            this.datas = res.data;
            let datas = res.data;
            let arrBase = [];
            for (let i = 0; i < datas.length; i++) {
              if (datas[i].id == -1) {
                arrBase.push({
                  id: datas[i].id,
                  moduleFlag: datas[i].item.moduleFlag,
                  moduleImage: datas[i].item.moduleImage,
                  moduleName: datas[i].name,
                  moduleNo: datas[i].item.moduleNo,
                  moduleType: datas[i].item.moduleType,
                  moduleUrl: datas[i].item.moduleUrl,
                  sortId: datas[i].item.sortId,

                  parentName: "根节点"
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
    editMenu(data) {
      this.$open({
        title: "编辑菜单",
        component: Edit,
        width: "500px",
        props: {
          parent: data.parentName,
          editData: data,
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
    removeMenu(id) {
      this.$confirm(
        "此操作将永久删除该菜单及其下级菜单信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.tableLoading = true;
          Ajax.delete("/system/sysModule/delInfo", {
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
    addMenu(data) {
      this.$open({
        title: "新增菜单",
        component: Edit,
        width: "500px",
        props: {
          parent: data.parentName,
          editData: data,
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
    searchMenu() {
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
        let listName = data[i].name;

        if (listName) {
          let a = listName.indexOf(this.searchString);
          if (a != -1 && this.searchString != "") {
            let arr = [];
            let fatherArr = [];
            let parentName1 = null;
            for (let j = 0; j < data.length; j++) {
              if (data[j].id == data[i].item.parentId) {
                // console.log(data[j].name);
                parentName1 = data[j].name;
              }
            }
            arr.push({
              id: data[i].id,
              moduleFlag: data[i].item.moduleFlag,
              moduleImage: data[i].item.moduleImage,
              moduleName: data[i].name,
              moduleNo: data[i].item.moduleNo,
              moduleType: data[i].item.moduleType,
              moduleUrl: data[i].item.moduleUrl,
              sortId: data[i].item.sortId,
              parentId: data[i].item.parentId,
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
                if (data[l].id == obj[0].parentId && obj[0].parentId != -1) {
                  // console.log(data[l]);
                  let parentName1 = "";
                  for (let i = 0; i < data.length; i++) {
                    if (data[l].pId == data[i].id) {
                      parentName1 = data[i].name;
                    }
                  }
                  arrF.push({
                    id: data[l].id,
                    moduleFlag: data[l].item.moduleFlag,
                    moduleImage: data[l].item.moduleImage,
                    moduleName: data[l].name,
                    moduleNo: data[l].item.moduleNo,
                    moduleType: data[l].item.moduleType,
                    moduleUrl: data[l].item.moduleUrl,
                    sortId: data[l].item.sortId,
                    parentId: data[l].item.parentId,
                    parentName: parentName1
                  });
                  arrF[0]["children"] = obj;
                  arr1 = arrF;
                  getFather(arrF);
                  // console.log(arrF);
                } else if (obj[0].parentId == -1 || obj[0].id == -1) {
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
      console.log(row.color, row.moduleName);
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

.module-table {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &.search-table {
    height: auto;
  }
}
#module-card {
  & > .el-card__body {
    overflow-y: auto;
  }
}
.module-search {
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
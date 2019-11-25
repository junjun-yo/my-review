<template>
  <el-row class="full">
    <el-col :span="4">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix card-header">
          <span>系统编码</span>
          <i
            class="el-icon-refresh"
            style="float: right;padding:0;font-size:20px;"
            @click="refreshDictTree"
          ></i>
        </div>
        <ztree
          url="/system/sysDict/searchTreeList"
          @click="nodeClick"
          title="编码"
          ref="dictTree"
          :rightClick="rightClick"
        />
      </el-card>
    </el-col>
    <el-col :span="20">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix card-header">
          <span>详细列表</span>
        </div>
        <dict-table
          :props="{parentId:curNode.id}"
          :height="curFullHeight-220"
          ref="dictTable"
          v-if="curNode.id == -1 || curNode.item.isCode == 0 "
        />
        <code-table
          :props="{ parentId:curNode.item.id,treeNo: curNode.item.treeNo}"
          :height="curFullHeight-220"
          ref="codeTable"
          v-if="curNode.item.isCode == 1"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import dictForm from "./components/dict_form";
import codeTable from "./components/code_table";
import dictTable from "./components/dict_table";
export default {
  components: {
    codeTable,
    dictTable
  },
  data() {
    return {
      curNode: {
        item: {}
      },
      tableDatas: [],
      tableLoading: false,

      rightClick: [
        {
          title: "新增节点",
          type: "root,node",
          callback: this.addDict
        },
        {
          title: "编辑节点",
          type: "node",
          callback: this.editDict
        },
        {
          title: "删除节点",
          type: "node",
          callback: this.removeDict
        }
      ]
    };
  },
  methods: {
    nodeClick(data) {
      this.curNode = {
        item: {}
      };
      this.curNode = data;
    },
    refreshDictTree() {
      this.curNode = {
        item: {}
      };
      this.$refs.dictTree.refresh();
    },
    loadTableData() {
      this.tableLoading = true;
      let params = Object.assign(
        {
          parentid: this.curNode.id
        },
        this.page
      );
      Ajax.post("/system/sysDict/searchListByParentId", params).then(res => {
        this.tableDatas = res.data;
        this.page.total = res.total;
        this.tableLoading = false;
      });
    },
    addDict(data) {
      this.$open({
        title: "新增编码",
        component: dictForm,
        props: {
          parentId: data.id,
          parentName: data.name
        },
        width: "500px",
        confirm: () => {
          this.refreshDictTree();
        }
      });
    },
    editDict(data) {
      this.$open({
        title: "编辑编码",
        component: dictForm,
        props: {
          id: data.id,
          parentId: data.id,
          parentName: data.name
        },
        width: "500px",
        confirm: () => {
          this.refreshDictTree();
        }
      });
    },
    removeDict(data) {
      this.$confirm(
        "此操作将永久删除该编码及其下级编码信息，同时编码的数据项信息也将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          Ajax.delete("/system/sysDict/delInfo", {
            id: data.id
          }).then(
            res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.refreshDictTree();
            },
            err => {}
          );
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
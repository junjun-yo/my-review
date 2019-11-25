<template>
  <div>
    <div style="margin-bottom:20px;float:right;">
      <el-button type="primary" @click="addCode">新增数据项</el-button>
    </div>
    <el-table
      :data="tableDatas"
      border
      default-expand-all
      v-loading="loading"
      row-key="id"
      :height="height"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="名称" align="left"></el-table-column>
      <el-table-column prop="code" label="编码" align="center"></el-table-column>
      <el-table-column prop="sortId" label="排序码" align="center"></el-table-column>
      <el-table-column label="有效标识" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.valid == 1">有效</span>
          <span v-if="scope.row.valid == 0">无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="editCode(scope.row)">编辑</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="addSon(scope.row)">新增子项</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="danger" @click="removeCode(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import codeForm from "./code_form";
export default {
  props: {
    height: Number,
    props: Object
  },
  watch: {
    "props.parentId": {
      deep: true,
      handler() {
        this.loadCodeTable();
      }
    }
  },
  data() {
    return {
      loading: false,
      tableDatas: [],
      rules: {
        code: [
          { required: true, message: "请输入编码", trigger: "blur" },
          {
            message: "编码只能输入数字",
            pattern: /^[0-9]\d*$/,
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value != undefined || value != "") {
                let codeList = this.tableDatas;
                let index = 0;
                //在页面中判断有没有重复
                codeList.forEach(item => {
                  if (item.code == value) {
                    index++;
                  }
                });
                if (index > 1) {
                  callback(new Error("编码重复"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sortId: [
          { required: true, message: "请输入排序码", trigger: "blur" },
          {
            message: "排序码只能输入大于0的数字",
            pattern: /^[1-9]\d*$/,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    rowKey(row) {
      if (!row.id) {
        return new Date().getTime();
      }
      return row.id;
    },
    loadCodeTable() {
      this.loading = true;
      Ajax.post("/system/sysDictItem/searchListForTableTree", {
        parentId: this.props.parentId,
        codeId: this.props.parentId,
        treeNo: this.props.treeNo
      }).then(res => {
        this.$set(this, "tableDatas", res.data);
        this.loading = false;
      });
    },
    addCode() {
      this.$open({
        title: "新增数据项",
        component: codeForm,
        width: "500px",
        props: {
          mode: "add",
          parentId: this.props.parentId,
          codeId: this.props.parentId,
          tableDatas: this.tableDatas
        },
        confirm: () => {
          this.loadCodeTable();
        }
      });
    },
    editCode(row) {
      this.$open({
        title: "编辑",
        component: codeForm,
        width: "500px",
        props: {
          mode: "edit",
          codeId: row.id,
          tableDatas: this.tableDatas
        },
        confirm: () => {
          this.loadCodeTable();
        }
      });
    },
    addSon(row) {
      this.$open({
        title: "新增子项",
        component: codeForm,
        width: "500px",
        props: {
          mode: "addSon",
          parentId: row.id,
          codeId: row.codeId,
          parentName: row.name,
          tableDatas: this.tableDatas
        },
        confirm: () => {
          this.loadCodeTable();
        }
      });
    },
    removeCode(row) {
      this.$confirm(
        "此操作将删除该数据项及其下级数据项信息，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          Ajax.delete("/system/sysDictItem/delDictItem", {
            id: row.id
          }).then(
            res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.loadCodeTable();
            },
            err => {}
          );
        })
        .catch(() => {});
    }
  },
  created() {
    this.loadCodeTable();
  }
};
</script>

<style lang='scss' scoped>
</style>
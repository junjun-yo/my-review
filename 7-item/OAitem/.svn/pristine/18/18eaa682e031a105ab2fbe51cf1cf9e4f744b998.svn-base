<template>
  <div>
    <div>
      <el-button type="primary" @click="addJianzhi" style="margin-bottom:10px;float:right">新增兼职</el-button>
    </div>
    <el-table :data="dataList" stripe :height="curFullHeight-560" border v-loading="tableLoading">
      <el-table-column label="序号" align="center">
        <template slot-scope="{$index}">{{$index+1}}</template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
      <el-table-column label="兼职部门" align="center">
        <template slot-scope="{row}">{{row.deptId|dept}}</template>
      </el-table-column>
      <el-table-column prop="appellation" label="人员称呼" align="center"></el-table-column>
      <el-table-column prop="sortNo" label="排序码" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-link type="primary" @click="editJianzhi(row)">编辑</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="removeJianzhi(row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import jianzhiForm from "./jianzhi_form";
export default {
  props: {
    accountId: String
  },
  data() {
    return {
      tableLoading: false,
      dataList: []
    };
  },
  methods: {
    loadJianzhiInfo() {
      //查询兼职列表
      Ajax.post("/system/sysUser/selectUserPositionList", {
        accountId: this.accountId,
        defaultFlag: 0
      }).then(res => {
        this.dataList = res.data;
      });
    },
    addJianzhi() {
      this.$open({
        title: "人员兼职管理",
        component: jianzhiForm,
        width: "500px",
        props: {
          mode: "add",
          accountId: this.accountId
        },
        confirm: () => {
          this.$message.success("新增成功");
          this.loadJianzhiInfo();
        }
      });
    },
    editJianzhi(row) {
      this.$open({
        title: "人员兼职管理",
        component: jianzhiForm,
        width: "500px",
        props: {
          mode: "edit",
          id: row.userId
        },
        confirm: () => {
          this.$message.success("修改成功");
          this.loadJianzhiInfo();
        }
      });
    },
    removeJianzhi(row) {
      this.$confirm("确定要删除该条记录吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          Ajax.delete("/system/sysUser/deleteUserPosition", {
            id: row.userId
          }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.loadJianzhiInfo();
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.loadJianzhiInfo();
  }
};
</script>

<style lang='scss' scoped>
</style>
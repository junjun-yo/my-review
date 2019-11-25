<template>
  <div>
    <el-table :data="tableDatas" border v-loading="tableLoading" :height="height">
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="code" label="编码" align="center"></el-table-column>
      <el-table-column label="编码类型" align="center">
        <template slot-scope="{row}">
          <el-tag type="warning" v-if="row.isCode == 0">分类</el-tag>
          <el-tag type="success" v-if="row.isCode == 1">编码</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <page :page="page" @change="loadTableData" />
  </div>
</template>

<script>
export default {
  props: {
    height: Number,
    props: Object
  },
  data() {
    return {
      tableDatas: [],
      tableLoading: false,
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  watch: {
    props() {
      this.loadTableData();
    }
  },
  methods: {
    loadTableData() {
      this.tableLoading = true;
      let params = Object.assign(
        {
          parentid: this.props.parentId
        },
        this.page
      );
      Ajax.post("/system/sysDict/searchListByParentId", params).then(res => {
        this.tableDatas = res.data;
        this.page.total = res.total;
        this.tableLoading = false;
      });
    }
  },
  created() {
    this.loadTableData();
  }
};
</script>

<style lang='scss' scoped>
</style>
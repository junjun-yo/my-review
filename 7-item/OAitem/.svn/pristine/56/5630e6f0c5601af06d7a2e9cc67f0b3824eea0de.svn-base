<template>
  <el-pagination
    style="float:right;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page.pageNumber"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="page.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="page.total"
  ></el-pagination>
</template>

<script>
export default {
  props: ["page"],
  methods: {
    handleSizeChange(val) {
      this.page.pageNumber = 1;
      this.page.pageSize = val;
      this.$emit("change");
    },
    handleCurrentChange(val) {
      this.page.pageNumber = val;
      this.$emit("change");
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
<template>
  <el-form :model="deptGroupForm" :rules="rules" ref="deptGroupForm">
    <el-form-item label="单位名称">
      <el-tag>单位名称</el-tag>
    </el-form-item>
    <el-form-item label="部门组名称" prop="name">
      <el-input v-model="deptGroupForm.name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      deptGroupForm: {},
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.deptGroupForm.validate(valid => {
        if (valid) {
          setTimeout(() => {
            this.$message.success("保存成功");
            done();
          }, 2000);
        } else {
          fail();
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
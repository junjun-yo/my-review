<template>
  <el-form
    :model="selectNode"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="节点名称" prop="name">
      <el-input v-model="selectNode.name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    selectNode: Object
  },
  data() {
    return {
      form: {},
      rules: {}
    };
  }
};
</script>

<style lang='scss' scoped>
</style>
<template>
  <el-form :model="config" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="节点名称" prop="name">
      <el-input v-model="config.name"></el-input>
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
      config: {
        ...this.selectNode
      },
      form: {},
      rules: {}
    };
  },
  methods: {
    confirm(done, fail) {
      done(this.config);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
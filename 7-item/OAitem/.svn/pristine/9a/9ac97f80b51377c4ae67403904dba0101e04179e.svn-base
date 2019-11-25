<template>
  <el-form
    :model="data"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="节点标识" prop="id">
      <el-input v-model="data.id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="节点名称" prop="name">
      <el-input v-model="data.name"></el-input>
    </el-form-item>
    <!--<el-form-item label="网关类型" prop="config.type">-->
      <!--<oa-radio v-model="data.config.type" :options="optTypes"/>-->
    <!--</el-form-item>-->
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
      rules: {
          id: [{required: true, message: "分支标识不能为空", trigger: "blur"}],
          name: [
              {required: true, message: "分支名称不能为空", trigger: "blur"}
          ],
          "config.type": [
              {required: true, message: "分支类型不能为空", trigger: "blur"}
          ]
      },
      data: {
          ...{
              config: {
                  type: "exclusive"
              }
          },
          ...this.selectNode
      },
      optTypes: [
          {label:"排他分支",value:"exclusive"},
          {label:"并行分支",value:"parallel"},
          {label:"包容分支",value:"inclusive"}
      ]
    };
  },
  created() {
      console.log(this.data);
    // this.$set(this.data.config, "type", "parallel");
  },
  methods: {
      //面板关闭处理
      confirm(done, fail) {
          this.$refs.ruleForm.validate(valid => {
              if (valid) {
                  done(this.data);
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
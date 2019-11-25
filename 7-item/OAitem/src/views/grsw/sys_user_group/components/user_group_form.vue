<template>
  <div>
    <el-form :model="form" :rules="formRules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="人员组名称" prop="groupName">
        <el-input v-model="form.groupName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import rules from "./group_rules";
export default {
  props: {
    mode: String,
    id: String,
    userId: String
  },
  mixins: [rules],
  data() {
    return {
      form: {}
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.form.validate(valid => {
        if (valid) {
          //保存操作
          Ajax.put(
            "/system/sysUserGroup/saveOrUpdateUserGroupInfo",
            this.form,
            "json"
          ).then(res => {
            if (res.success) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              done();
            }
          });
        } else {
          fail();
        }
      });
    },
    loadGroupInfo() {
      //请求用户组数据
      Ajax.post("/system/sysUserGroup/selectUserGroupInfo", {
        id: this.id
      }).then(res => {
        this.form = res.data;
      });
    }
  },
  created() {
    if (this.mode == "edit") {
      //加载用户组信息
      this.loadGroupInfo();
    }
    if (this.mode == "add") {
      this.form.userId = this.userId;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
<template>
  <div v-loading="loading">
    <el-form :model="jianzhi" ref="jianzhiForm" label-width="100px" :rules="rules">
      <el-form-item label="人员名称" prop="userName">
        <el-input
          v-model="jianzhi.sysAccount.userName"
          readonly="readonly"
          autocomplete="off"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="兼职部门" prop="deptId">
        <dept-select :allowCheckCount="1" v-model="jianzhi.sysUser.deptId" />
      </el-form-item>
      <el-form-item label="人员称呼">
        <el-input v-model="jianzhi.sysUser.appellation" autocomplete="off" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="排序码" prop="sysUser.sortNo">
        <el-input-number size="mini" v-model="jianzhi.sysUser.sortNo" autocomplete="off"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import jianzhiFormRules from "./jianzhi_form_rules";
export default {
  props: {
    mode: String,
    accountId: String,
    id: String
  },
  mixins: [jianzhiFormRules],
  data() {
    return {
      loading: false,
      jianzhi: {}
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.jianzhiForm.validate(valid => {
        if (valid) {
          //保存兼职信息
          Ajax.put(
            "/system/sysUser/saveOrUpdateUserPosition",
            this.jianzhi
          ).then(res => {
            done();
          });
        } else {
          fail();
        }
      });
    },
    loadJianzhiInfo() {
      this.loading = true;
      Ajax.post("/system/sysUser/selectUserPositionInfo", {
        accountId: this.accountId,
        id: this.id
      }).then(res => {
        if (res.success) {
          this.jianzhi = Object.assign(res.data);
          this.jianzhi.sysUser.deptId = "d4dbc73312e944bf99c6a2d8bc469d51";
          this.jianzhi.deptName = "经信委";
        }
        this.loading = false;
      });
    }
  },
  created() {
    if (this.mode == "edit" || this.mode == "add") {
      this.loadJianzhiInfo();
    }
  }
};
</script>

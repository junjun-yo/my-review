<template>
  <div v-loading="loading">
    <el-form :model="sysUser" ref="userForm" label-width="100px" :rules="rules">
      <el-form-item label="兼职部门" prop="deptId">
        <dept-select :allowCheckCount="1" v-model="sysUser.deptId" />
      </el-form-item>
      <el-form-item label="人员称呼">
        <el-input v-model="sysUser.appellation" autocomplete="off" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="排序码" prop="sortNo">
        <el-input-number size="mini" v-model="sysUser.sortNo" autocomplete="off"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id:String,
    accountId:String
  },
  data() {
    return {
      loading: false,
      sysUser: {},
      rules: {
          deptId: [
              { required: true, message: "请选择兼职部门", trigger: "blur" }
          ],
          sortNo: [
              { required: true, message: "请输入排序码", trigger: "blur" },
          ],
        }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          //保存用户信息
          Ajax.put("/system/sysUser/saveUserPosition", this.sysUser, "json").then(
            res => {
              if (res.success) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                done();
              }
            },
            err => {
              fail();
            }
          );
        } else {
          fail();
        }
      });
    }
  },
  created() {
    if (this.id != undefined) {
      this.loading = true;
      Ajax.post("/system/sysUser/get", {
        id: this.id
      }).then(res => {
        if (res.success) {
          this.sysUser = res.data;
        }
        this.loading = false;
      });
    }else{
      this.sysUser.accountId = this.accountId;
    }
  }
};
</script>

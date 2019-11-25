<template>
  <el-form :model="role" ref="roleForm" :rules="rules" v-loading="loading" label-width="80px">
    <el-input v-model="role.id" v-show="false" />
    <el-input v-model="role.unitId" v-show="false" />
    <el-input v-model="role.roleType" v-show="false" />
    <el-input v-model="role.roleLevel" value="1" v-show="false" />
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="role.roleName" autocomplete="off" maxlength="25" placeholder="请输入角色名称"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入角色描述"
        v-model="role.roleDesc"
        autocomplete="off"
        maxlength="100"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    id: String,
    unitId: String
  },
  data() {
    return {
      loading: false,
      role: {},
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleLevel: [
          { required: true, message: "请选择角色级别", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          Ajax.put("/system/sysRole/saveOrUpdateInfo", this.role,'json').then(
            res => {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              done();
            },
            err => {
              fail();
            }
          );
        } else {
          fail();
        }
      });
    },
    loadRoleInfo() {
      this.loading = true;
      Ajax.post("/system/sysRole/initInfo", {
        unitId: this.unitId,
        id: this.id
      }).then(
        res => {
          this.loading = false;
          this.role = Object.assign(res.data);
        },
        () => {}
      );
    }
  },
  created() {
    this.loadRoleInfo();
  }
};
</script>

<style lang='scss' scoped>
</style>
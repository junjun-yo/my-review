<template>
  <div v-loading="loading">
    <el-form :model="user" ref="userForm" label-width="150px" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="sysAccount.userName">
            <el-input v-model="user.sysAccount.userName" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="sysAccount.account">
            <el-input v-model="user.sysAccount.account" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="sysAccount.mobilephone">
            <el-input v-model="user.sysAccount.mobilephone" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="是否显示手机号" prop="sysAccount.mobilephoneShow">
            <el-select v-model="user.sysAccount.mobilephoneShow">
              <el-option label="显示" value="1"></el-option>
              <el-option label="不显示" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="sysAccount.sex">
            <el-select v-model="user.sysAccount.sex">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办公电话" prop="sysAccount.officephone">
            <el-input v-model="user.sysAccount.officephone" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="sysAccount.email">
            <el-input v-model="user.sysAccount.email" autocomplete="off" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="人员称呼">
            <el-input v-model="user.sysUser.appellation" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="排序码" prop="sysUser.sortNo">
            <el-input-number size="mini" v-model="user.sysUser.sortNo" autocomplete="off"></el-input-number>
          </el-form-item>
          <el-form-item label="所属部门" prop="sysUser.deptId">
            <dept-select :allowCheckCount="1" v-model="user.sysUser.deptId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="个人签名" prop="sysUser.deptId">
            <file-upload :props="sign_props" :tip="signTip" limit="1" :limitType="signLimitType" />
          </el-form-item>
          <el-form-item label="个人头像" prop="sysUser.deptId">
            <file-upload
              :props="photo_props"
              :tip="photoTip"
              limit="1"
              :limitType="photoLimitType"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import userFormRules from "./user_form_rules";
import store from "@/store";
export default {
  props: {
    userId: String,
    deptId: String,
    fileId: String
  },
  mixins: [userFormRules],
  computed: {
    signLimitType() {
      const type = store.state.dict.parameter.limitFileType_sign;
      if (type) {
        return type.paramText;
      } else {
        return "";
      }
    },
    photoLimitType() {
      const type = store.state.dict.parameter.limitFileType_photo;
      if (type) {
        return type.paramText;
      } else {
        return "";
      }
    },
    signTip() {
      if (this.signLimitType) {
        return "注意：只能上传文件类型为" + this.signLimitType + "的文件";
      } else {
        return "";
      }
    },
    photoTip() {
      if (this.photoLimitType) {
        return "注意：只能上传文件类型为" + this.photoLimitType + "的文件";
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      loading: false,
      user: {
        sysAccount: {},
        sysUser: {}
      },
      sign_props: {
        fileId: this.fileId,
        type: "sign"
      },
      photo_props: {
        fileId: this.fileId,
        type: "photo"
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          //保存用户信息
          Ajax.put("/system/sysUser/saveOrUpdateUser", this.user, "json").then(
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
    },
    loadUserInfo() {
      this.loading = true;
      Ajax.post("/system/sysUser/selectUserInfo", {
        id: this.userId,
        deptId: this.deptId
      }).then(res => {
        if (res.success) {
          this.user = Object.assign(res.data);
          this.$set(this.user.sysAccount, "accountId", this.fileId);
        }
        this.loading = false;
      });
    }
  },
  created() {
    this.loadUserInfo();
  }
};
</script>

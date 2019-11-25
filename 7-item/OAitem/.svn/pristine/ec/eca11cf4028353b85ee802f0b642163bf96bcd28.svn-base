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
            <el-input v-model="user.appellation" autocomplete="off" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="排序码" prop="sortNo">
            <el-input-number size="mini" v-model="user.sortNo" autocomplete="off"></el-input-number>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptId">
            <dept-select :allowCheckCount="1" v-model="user.deptId" :url="url"  />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="个人签名" prop="sysUser.deptId">
            <el-upload
              class="avatar-uploader"
              :action=fileUploadUrl
              :headers="headers"
              :show-file-list="false"
              :on-success="handleSignSuccess"
              :before-upload="beforeSignUpload">
              <img v-if="user.sysAccount.sign" :src="user.sysAccount.sign" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="12">
         <el-form-item label="个人头像">
           <el-upload
             class="avatar-uploader"
             :action=fileUploadUrl
             :headers="headers"
             :show-file-list="false"
             :on-success="handlePhotoSuccess"
             :before-upload="beforePhotoUpload">
             <img v-if="user.sysAccount.photo" :src="user.sysAccount.photo" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
         </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import store from "@/store";
import uploadComponent from "../components/upload";
export default {
  props: {
    id: String,
    deptId: String
  },
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
      fileUploadUrl: `${process.env.VUE_APP_BASE_API}/common/file/pubAttach/uploadBase64`,
      headers: {
        Authorization: localStorage.getItem("token")
      },
      url:"",
      loading: false,
      user: {
        sysAccount: {},
      },
      rules: {
        sysAccount: {
            userName: [
                { required: true, message: "请输入姓名", trigger: "blur" }
            ],
            account: [
                { required: true, message: "请输入账号", trigger: "blur" },
                {
                    validator: (rule, value, callback) => {
                        if (value != undefined || value != "") {
                            //新增时直接在数据库中判断重复，编辑时需要在数据库中排除掉当前的编码再判断重复
                            Ajax.get("/system/sysUser/unique", {
                                id: this.user.accountId,
                                account: this.user.sysAccount.account
                            }).then(res => {
                                if (res.success) {
                                    callback();
                                } else {
                                    callback(new Error("账号已存在"));
                                }
                            });
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur"
                }
            ],
           /* mobilephone: [
                { required: true, message: "请输入手机号", trigger: "blur" },
                {
                    message: "请输入正确的手机号码",
                    pattern: /^1\d{10}$/,
                    trigger: "blur"
                },
                {
                    validator: (rule, value, callback) => {
                        if (value != undefined || value != "") {
                            //新增时直接在数据库中判断重复，编辑时需要在数据库中排除掉当前的编码再判断重复
                            Ajax.get("/system/sysUser/unique", {
                                accountId: this.user.sysAccount.id,
                                account: this.user.sysAccount.mobilephone
                            }).then(res => {
                                if (res.success) {
                                    callback();
                                } else {
                                    callback(new Error("手机号已存在"));
                                }
                            });
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur"
                }
            ],*/
            //sex: [{ required: true, message: "请选择性别", trigger: "change" }],
            mobilephoneShow: [
                {
                    message: "请选择是否显示手机号",
                    trigger: "change"
                }
            ],
            email: [
                {
                    message: "请输入正确的邮箱地址",
                    pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                    trigger: "blur"
                }
            ]
        },
        sortNo: [{ required: true, message: "请输入排序码", trigger: "blur" }]
    }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          //保存用户信息
          Ajax.put("/system/sysUser/save", this.user, "json").then(
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
    },
    handleSignSuccess(res, file){
      this.user.sysAccount.sign = res.data.attachUrl;
    },
    beforeSignUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 、PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handlePhotoSuccess(res, file){
      this.user.sysAccount.photo = res.data.attachUrl;
    },
    beforePhotoUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 、PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  },
  created() {
    //id不为空，查询用户、账号数据
    if(this.id != undefined){
        this.formLoading = true;
        Ajax.post("/system/sysUser/get", {
          id: this.id
        }).then(res => {
          this.user = res.data;
          this.formLoading = false;
        });
      }else{
        this.user.deptId = this.deptId;
      }
      //部门选择url
      this.url = "/system/addressBook/deptTree?unitId=" + store.state.account.sysUnit.unitId;
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
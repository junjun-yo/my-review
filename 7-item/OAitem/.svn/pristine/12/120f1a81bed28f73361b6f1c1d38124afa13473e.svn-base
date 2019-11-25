<template>
  <div>
    <el-form :model="data" :rules="rules" label-width="100px" ref="oDivForm">
      <el-form-item label="父级菜单">
        <el-tag effect="dark">{{parent}}</el-tag>
      </el-form-item>
      <el-form-item label="菜单标题" prop="moduleName">
        <el-input v-model="data.moduleName" autocomplete="off" maxlength="25"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" prop="moduleType">
        <el-select v-model="data.moduleType" placeholder="请选择菜单类型">
          <el-option label="菜单" value="1"></el-option>
          <el-option label="按钮" value="2"></el-option>
          <el-option label="数据" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单标识" prop="moduleFlag">
        <el-input v-model="data.moduleFlag" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="moduleUrl">
        <el-input v-model="data.moduleUrl" autocomplete="off" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="moduleImage">
        <icon-select v-model="data.moduleImage" />
      </el-form-item>
      <el-form-item label="菜单排序" prop="sortId">
        <el-input-number
          size="mini"
          :min="1"
          :max="99999999"
          v-model="data.sortId"
          autocomplete="off"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import iconSelect from "@/components/IconSelect";
export default {
  props: ["parent", "editData", "mode"],
  components: {
    iconSelect
  },
  data() {
    return {
      data: {},
      rules: {
        moduleName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" }
        ],
        moduleType: [
          { required: true, message: "请选择菜单类型", trigger: "blur" }
        ],
        moduleFlag: [
          { required: true, message: "请输入菜单标识", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value != undefined || value != "") {
                //在数据库中判断有没有重复的
                Ajax.post("/system/sysModule/hasModuleFlag", {
                  id: this.data.id,
                  moduleFlag: value
                }).then(res => {
                  if (res.data) {
                    callback(new Error("菜单标识重复"));
                  } else {
                    callback();
                  }
                });
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        moduleUrl: [
          {
            validator: (rule, value, callback) => {
              if (value != undefined || value != "") {
                //如果菜单类型选择的是菜单，则必须要填写菜单路径，其他的类型不需要填写
                if (
                  this.data.moduleType == "1" &&
                  (this.data.moduleUrl == "" ||
                    this.data.moduleUrl == undefined)
                ) {
                  callback(new Error("请输入菜单路径"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        moduleImage: [
          { required: true, message: "请选择菜单图标", trigger: "blur" }
        ],
        sortId: [{ required: true, message: "请输入菜单排序", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击确定后的 表单验证，发送请求
    confirm(done, fall) {
      this.$refs["oDivForm"].validate(valid => {
        if (valid) {
          Ajax.put("/system/sysModule/saveInfo", this.data, "json").then(
            res => {
              if (res.success) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                done();
              }
            }
          );
        } else {
          fall();
        }
      });
    }
  },
  created() {
    if (this.mode == "edit") {
      this.data = this.editData;
    } else if (this.mode == "add") {
      this.data = { parentId: this.editData.id };
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
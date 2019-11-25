<template>
  <el-form :model="dictForm" :rules="rules" ref="dictForm" v-loading="loading" label-width="80px">
    <el-form-item label="父级编码">
      <el-tag effect="dark">{{parentName}}</el-tag>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="dictForm.name" autocomplete="off" maxlength="25"></el-input>
    </el-form-item>
    <el-form-item label="编码" prop="code">
      <el-input v-model="dictForm.code" autocomplete="off" maxlength="25"></el-input>
    </el-form-item>
    <el-form-item label="编码类型" prop="isCode">
      <el-select v-model="dictForm.isCode" placeholder="请选择编码类型" name="isCode">
        <el-option label="分类" value="0"></el-option>
        <el-option label="编码" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    parentName: String,
    parentId: String,
    id: String
  },
  data() {
    return {
      loading: false,
      dictForm: {},
      rules: {
        code: [
          { required: true, message: "请输入编码", trigger: "blur" },
          {
            message: "编码只能输入英文",
            pattern: /^[A-Za-z]+$/,
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value != undefined || value != "") {
                let id = this.dictForm.id;
                //新增时直接在数据库中判断重复，编辑时需要在数据库中排除掉当前的编码再判断重复
                Ajax.post("/system/sysDict/hasCode", {
                  id: id,
                  code: value
                }).then(
                  res => {
                    if (res.data) {
                      callback(new Error("编码重复"));
                    } else {
                      callback();
                    }
                  },
                  err => {
                    callback(new Error("编码重复"));
                  }
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        isCode: [{ required: true, message: "请选择编码类型", trigger: "blur" }]
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.dictForm.validate(valid => {
        if (valid) {
          Ajax.put("/system/sysDict/saveInfo", this.dictForm,'json').then(
            res => {
              this.$message.success("保存成功！");
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
    loadInfo() {
      this.loading = true;
      Ajax.post("/system/sysDict/showInfo", {
        id: this.id
      }).then(res => {
        this.loading = false;
        this.dictForm = res.data;
      });
    }
  },
  created() {
    this.dictForm.parentId = this.parentId;
    if (this.id) {
      this.loadInfo();
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
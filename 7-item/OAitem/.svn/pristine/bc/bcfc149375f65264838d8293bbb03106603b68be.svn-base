<template>
  <el-form :model="codeForm" :rules="rules" ref="codeForm" label-width="100px" v-loading="loading">
    <el-form-item label="父编码名称" v-if="mode == 'addSon'">
      <el-tag>{{parentName}}</el-tag>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="codeForm.name"></el-input>
    </el-form-item>
    <el-form-item label="编码" prop="code">
      <el-input v-model="codeForm.code" autocomplete="off" maxlength="25"></el-input>
    </el-form-item>
    <el-form-item label="排序码" prop="sortId">
      <el-input v-model="codeForm.sortId" autocomplete="off" maxlength="25"></el-input>
    </el-form-item>
    <el-form-item label="有效标识" prop="valid">
      <el-select v-model="codeForm.valid" placeholder="请选择有效标识">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    mode: String,
    parentId: String,
    parentName: String,
    codeId: String,
    tableDatas: Array
  },
  data() {
    return {
      loading: false,
      codeForm: {},
      rules: {
        code: [
          { required: true, message: "请输入编码", trigger: "blur" },
          {
            message: "编码只能输入数字",
            pattern: /^[0-9]\d*$/,
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value != undefined || value != "") {
                Ajax.post("/system/sysDictItem/hasCode", {
                  id: this.codeForm.id,
                  code: this.codeForm.code,
                  codeId: this.codeId
                }).then(
                  res => {
                    if (res.data) {
                      callback(new Error("编码重复"));
                    } else {
                      callback();
                    }
                  },
                  err => {
                    callback();
                  }
                );
                /* let flag = false;
                const reduce = datas => {
                  datas.forEach(data => {
                    if (data.code == value) {
                      flag = true;
                    }
                    if (data.children && data.children.length > 0) {
                      reduce(data.children);
                    }
                  });
                };
                reduce(this.tableDatas);
                if (flag) {
                  callback(new Error("编码重复"));
                } else {
                  callback();
                } */
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sortId: [
          { required: true, message: "请输入排序码", trigger: "blur" },
          {
            message: "排序码只能输入大于0的数字",
            pattern: /^[1-9]\d*$/,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.codeForm.validate(valid => {
        if (valid) {
          Ajax.put(
            "/system/sysDictItem/saveInfoByOne",
            this.codeForm,
            "json"
          ).then(
            res => {
              this.$message.success("保存成功");
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
    loadCodeInfo() {
      this.loading = true;
      Ajax.post("/system/sysDictItem/showInfo", {
        id: this.codeId
      }).then(res => {
        this.codeForm = res.data;
        this.loading = false;
      });
    }
  },
  created() {
    this.codeForm = Object.assign(
      {
        parentId: this.parentId,
        codeId: this.codeId
      },
      this.codeForm
    );
    if (this.mode == "edit") {
      this.loadCodeInfo();
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
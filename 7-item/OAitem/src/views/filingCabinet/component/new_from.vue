<template>
  <el-form :model="newForm" :rules="rules" ref="newForm" v-loading="loading" label-width="80px">
    <el-form-item label="父级文件">
      <el-tag effect="dark">{{parentName}}</el-tag>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="newForm.name" autocomplete="off" maxlength="25"></el-input>
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
      newForm: {},
      rules: {
        code: [
         
          {
            validator: (rule, value, callback) => {
              if (value != undefined || value != "") {
                let id = this.newForm.id;
                //新增时直接在数据库中判断重复，编辑时需要在数据库中排除掉当前的编码再判断重复
                Ajax.post("/system/FilingCabinet/hasName", {/* api 添加方法函数 */
                  id: id,
                  code: value
                }).then(
                  res => {
                    if (res.data) {
                      callback(new Error("名称重复"));
                    } else {
                      callback();
                    }
                  },
                  err => {
                    callback(new Error("名称重复"));
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
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.newForm.validate(valid => {
        if (valid) {
          Ajax.put("/system/FilingCabinet/save", this.newForm,'json').then(/* api 保存文件柜对象 后添加保存函数方法  */
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
      Ajax.post("/system/FilingCabinet/showInfo", { /* api 生成的获取一个文件柜对象  */
        id: this.id
      }).then(res => {
        this.loading = false;
        this.newForm = res.data;
      });
    }
  },
  created() {
    this.newForm.parentId = this.parentId;
    if (this.id) {
      this.loadInfo();
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
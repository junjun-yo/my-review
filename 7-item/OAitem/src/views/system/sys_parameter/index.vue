<template>
  <el-row class="full">
    <el-col :span="24">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix card-header">
          <span>系统参数</span>
        </div>
        <div style="float: right;margin-bottom:20px">
          <el-button type="primary" @click="addCode">新增</el-button>
          <el-button type="primary" @click="saveCode">保存</el-button>
        </div>
        <div>
          <el-form :model="codeForm" ref="codeForm" class="tableForm">
            <el-table :data="codeForm.tableDatas" border v-loading="loading">
              <el-table-column prop="paramCode" label="参数编码" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableDatas.' + scope.$index + '.paramCode'"
                    :rules="rules.paramCode"
                  >
                    <el-input v-model="scope.row.paramCode" autocomplete="off" maxlength="100"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="paramText" label="参数内容" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableDatas.' + scope.$index + '.paramText'"
                    :rules="rules.paramText"
                  >
                    <el-input v-model="scope.row.paramText" autocomplete="off" maxlength="500"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="paramRemark" label="备注" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableDatas.' + scope.$index + '.paramRemark'"
                    :rules="rules.paramRemark"
                  >
                    <el-input v-model="scope.row.paramRemark" autocomplete="off" maxlength="100"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-link type="primary" @click="removeCode(scope.$index)">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      codeForm: {
        tableDatas: []
      },
      rules: {
        paramCode: [
          { required: true, message: "请输入参数编码", trigger: "blur" },
          {
            message: "编码只能输入英文及下划线",
            pattern: /^[A-Za-z,_.]+$/,
            trigger: "blur"
          }
        ],
        paramText: [
          { required: true, message: "请输入参数内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addCode() {
      let newRow = {
        paramCode: "",
        paramText: ""
      };
      this.$set(
        this.codeForm.tableDatas,
        this.codeForm.tableDatas.length,
        newRow
      );
    },
    saveCode() {
      this.$refs.codeForm.validate(valid => {
        if (valid) {
          Ajax.put(
            "/system/sysParameter/saveInfo",
            {
              parameter: this.codeForm.tableDatas
            },
            "json"
          ).then(res => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.$emit("confirm");
          });
        } else {
          this.$message.warning("请填写完整后保存");
        }
      });
    },
    removeCode(index) {
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.codeForm.tableDatas.splice(index, 1);
        })
        .catch(() => {});
    },
    loadListCode() {
      this.loading = true;
      Ajax.post("/system/sysParameter/searchParameterList", {}).then(res => {
        this.$set(this.codeForm, "tableDatas", res.data);
        this.loading = false;
      });
    }
  },
  created() {
    this.loadListCode();
  }
};
</script>

<style lang='scss' scoped>
</style>
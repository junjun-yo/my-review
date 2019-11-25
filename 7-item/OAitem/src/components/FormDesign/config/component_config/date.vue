<template>
  <el-form label-position="top" ref="form" :model="data" :rules="rules">
    <el-form-item label="字段名称" prop="options.label">
      <el-input v-model="data.options.label"></el-input>
    </el-form-item>
    <el-form-item label="格式化">
      <el-input v-model="data.options.fmtVal" placeholder="请输入格式化表达式"></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="data.options.defVal"></el-input>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-select v-model="data.options.notNull" placeholder="是否必填">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-select v-model="data.options.readonly" placeholder="是否只读">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: {
    data: Object
  },
  components: {
    draggable
  },
  data() {
    return {
      rules: {
        "options.label": [
          { required: true, message: "请输入字段名称", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (isNaN(Number(value))) {
                callback();
              } else {
                return callback(new Error("字段名称不能为数字"));
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    handleOptionsRemove(index) {
      this.data.options.options.splice(index, 1);
    },
    handleAddColumn() {
      this.data.options.options.push({
        label: "",
        value: ""
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
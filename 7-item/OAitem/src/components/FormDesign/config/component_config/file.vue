<template>
  <el-form ref="form" :model="data" :rules="rules">
    <el-form-item label="字段名称" prop="options.label">
      <el-input v-model="data.options.label"></el-input>
    </el-form-item>
    <el-form-item label="关联文件类型" prop="options.type">
      <el-input v-model="data.options.type"></el-input>
    </el-form-item>
    <el-form-item label="关联文件ID" prop="options.fileId">
      <el-input v-model="data.options.fileId"></el-input>
    </el-form-item>
    <el-form-item label="文件大小限制" prop="options.limitSize">
      <el-input-number v-model="data.options.limitSize" style="margin:0 5px"></el-input-number>K
    </el-form-item>
    <el-form-item label="文件个数限制" prop="options.limit">
      <el-input-number v-model="data.options.limit" style="margin:0 5px"></el-input-number>
    </el-form-item>
    <el-form-item label="上传提示" prop="options.tip">
      <el-input v-model="data.options.tip"></el-input>
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
      <el-select v-model="data.options.disabled" placeholder="是否只读">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    data: Object
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
  methods: {}
};
</script>

<style lang='scss' scoped>
</style>
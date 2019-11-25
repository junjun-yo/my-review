<template>
  <el-form label-position="top">
    <el-form-item label="文本内容">
      <el-input v-model="data.options.content"></el-input>
    </el-form-item>
    <el-form-item label="布局设置">
      <el-radio-group v-model="data.options.align">
        <el-radio-button label="left">居左</el-radio-button>
        <el-radio-button label="center">居中</el-radio-button>
        <el-radio-button label="right">居右</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="data.options.fontSize" :min="16" :max="100" label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="data.options.color"></el-color-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
</style>
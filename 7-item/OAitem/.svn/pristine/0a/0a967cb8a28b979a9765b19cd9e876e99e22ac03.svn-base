<template>
  <el-row :gutter="20" style="height:100%">
    <el-col :span="16" style="height:100%">
      <render :data="data" v-model="params" />
    </el-col>
    <el-col :span="8" style="height:100%">
      <json-editor :value="json" />
    </el-col>
  </el-row>
</template>

<script>
import render from "../render";
import JsonEditor from "@/components/JsonEditor";
var beautify_js = require("js-beautify").js;

export default {
  props: {
    data: Object,
    value: Object
  },
  components: {
    render,
    JsonEditor
  },
  computed: {
    json() {
      return beautify_js(JSON.stringify(this.params), { indent_size: 2 });
    }
  },
  data() {
    return {
      params: this.value
    };
  },
  created() {}
};
</script>

<style lang='scss' scoped>
</style>
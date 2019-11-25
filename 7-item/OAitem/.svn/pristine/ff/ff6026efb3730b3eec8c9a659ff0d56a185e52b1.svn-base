<template>
  <div id="codeeditor">
    <json-editor :value="htmlTemplate" style="height: 5rem; overflow-y: auto" />
  </div>
</template>

<script>
import generate from "../render/generate_vue";
import JsonEditor from "@/components/JsonEditor";
var beautify_html = require("js-beautify").html;
export default {
  components: {
    JsonEditor
  },
  props: {
    data: Object
  },
  data() {
    return {
      htmlTemplate: ""
    };
  },
  methods: {},
  created() {
    let text = generate(this.data);
    this.htmlTemplate = beautify_html(text, { indent_size: 2 });
  }
};
</script>

<style lang='scss' scoped>
</style>
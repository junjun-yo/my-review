<template>
  <div>
    <json-editor :value="htmlTemplate" lang="json" :readonly="false" ref="jsonEditor" />
  </div>
</template>

<script>
import jsonEditor from "@/components/JsonEditor";

export default {
  components: {
    jsonEditor
  },
  props: ["data"],
  data() {
    return {
      htmlTemplate: ""
    };
  },
  methods: {
    confirm(done, fail) {
      done(JSON.parse(this.$refs.jsonEditor.getValue()));
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
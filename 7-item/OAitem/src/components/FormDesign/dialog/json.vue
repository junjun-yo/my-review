<template>
  <div>
    <json-editor :value="htmlTemplate" lang="json" />
  </div>
</template>

<script>
import jsonEditor from "@/components/JsonEditor";
export default {
  props: {
    data: Object
  },
  components: {
    jsonEditor
  },
  data() {
    return {
      htmlTemplate: JSON.stringify(this.data, null, 2)
    };
  }
};
</script>

<style lang='scss' scoped>
</style>
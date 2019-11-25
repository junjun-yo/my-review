<template>
  <div>
    <json-editor :value="htmlTemplate" lang="json" :readonly="readonly" ref="json" />
  </div>
</template>

<script>
import jsonEditor from "@/components/JsonEditor";
export default {
  props: {
    data: Object,
    readonly: {
      type: Boolean,
      default: true
    }
  },
  components: {
    jsonEditor
  },
  data() {
    return {
      htmlTemplate: JSON.stringify(this.data, null, 2)
    };
  },
  methods: {
    confirm(done, fail) {
      let d = this.$refs.json.getValue();
      done(d);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
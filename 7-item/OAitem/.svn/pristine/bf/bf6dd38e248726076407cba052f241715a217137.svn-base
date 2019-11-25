<template>
  <render :data="data" v-model="params" ref="renderForm" />
</template>

<script>
import render from "../render";

export default {
  props: {
    data: Object,
    value: Object
  },
  components: {
    render
  },
  data() {
    return {
      params: this.value
    };
  },
  methods: {
    confirm(done, fail) {
      const form = this.$refs.renderForm.formInstance;
      form.validate(valid => {
        if (valid) {
          done(this.params);
        } else {
          fail();
          return false;
        }
      });
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
</style>
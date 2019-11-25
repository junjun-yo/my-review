<template>
  <div :style="style">{{this.options.content}}</div>
</template>

<script>
export default {
  props: {
    options: [String, Object]
  },
  computed: {
    style() {
      return {
        width: "100%",
        textAlign: this.options.align,
        fontSize: this.options.fontSize + "px",
        color: this.options.color
      };
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
</style>
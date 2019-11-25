<template>
  <script id="editor" type="text/plain"></script>
</template>

<script>
import "../../../public/ueditor/ueditor.parse.js";
import "../../../public/ueditor/ueditor.config.js";
import "../../../public/ueditor/ueditor.all.js";
import "../../../public/ueditor/lang/zh-cn/zh-cn.js";

export default {
  name: "UEditor",
  props: {
    id: {
      type: String
    },
    width: Number,
    height: Number,
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      editor: null
    };
  },
  computed: {
    option() {
      return {
        width: this.width,
        height: this.height
      };
    }
  },
  watch: {
    option: {
      deep: true,
      handler() {
        if (this.width > 0 && this.height > 0) {
          this.init();
        }
      }
    }
  },
  methods: {
    init() {
      const _this = this;
      this.config = Object.assign(this.config, {
        initialFrameWidth: this.width,
        initialFrameHeight: this.height,
        minFrameWidth: 300
      });
      this.editor = UE.getEditor("editor", this.config);
      this.$emit("init", this.editor);
    }
  },
  mounted() {
    if (this.width > 0 && this.height > 0) {
      this.init();
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang='scss' scoped>
</style>
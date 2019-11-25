const { body } = document;

export default {
  data() {
    return {
      curFullHeight: this.$_getHeight()
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {},
  methods: {
    $_getHeight() {
      const rect = body.getBoundingClientRect();
      return rect.height;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        this.curFullHeight = this.$_getHeight();
      }
    }
  }
};

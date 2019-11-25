<template>
  <div :id="key" style="height:100%;"></div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    html: String,
    value: Object
  },
  data() {
    return {
      params: this.value,
      renderHtml: "",
      vm: null,
      key:
        "vue-render-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "")
    };
  },
  watch: {
    html() {
      this.$render();
    },
    params: {
      deep: true,
      handler() {
        this.$emit("input", this.params);
      }
    }
  },
  methods: {
    $render() {
      if (!this.html || !this.html.trim()) {
        return;
      }
      // ${process.env.VUE_APP_BASE_API}
      this.renderHtml = this.html.replace(
        /src="/g,
        `src="` + `https://www.baidu.com`
      );
      this.renderHtml = `<div class="${this.key}" style="width:100%;height:100%">${this.renderHtml}</div>`;

      let paramsArr = this.renderHtml.match(/"params(\.).*?"/g);
      let keys = [];
      if (paramsArr != null) {
        keys = paramsArr.map(key =>
          key.replace(/params./g, "").replace(/"/g, "")
        );
      }
      let params = {};
      keys.forEach(key => {
        params[key] = "";
      });
      params = Object.assign(params, this.params);
      let that = this;
      let component = Vue.extend({
        data() {
          return {
            params: params
          };
        },
        watch: {
          params: {
            deep: true,
            handler() {
              that.$set(
                that,
                "params",
                JSON.parse(JSON.stringify(this.params))
              );
              that.$emit("input", this.params);
            }
          }
        },
        template: this.renderHtml
      });

      let vm = new component().$mount();
      var dom = document.querySelector("#" + this.key);
      while (dom.hasChildNodes()) {
        dom.removeChild(dom.firstChild);
      }
      dom.appendChild(vm.$el);
      this.$set(this, "params", vm.params);
    }
  },
  mounted() {
    this.$render();
  }
};
</script>

<style lang='scss' scoped>
</style>
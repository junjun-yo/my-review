<template>
  <div :id="key" :class="key" style="height:100%;"></div>
</template>

<script>
import Vue from "vue";
import "../form.scss";
import { buildParams, buildDefaultVal } from "./rebuild_form";
import components from "../config";

export default {
  props: {
    element: Object,
    value: Object
  },
  data() {
    return {
      key:
        "design_render_" +
        +new Date() +
        ((Math.random() * 1000).toFixed(0) + ""),
      html: "",
      params: this.value
    };
  },
  computed: {
    generateFunc() {
      let d = {};
      components.forEach(item => {
        d[item.type] = item.generate;
      });
      return d;
    }
  },
  watch: {
    element: {
      deep: true,
      handler() {
        this.$renderCode();
      }
    },
    params: {
      deep: true,
      handler() {
        this.$emit("input", this.params);
      }
    }
  },
  methods: {
    generateHtml() {
      if (this.element.type) {
        let func = this.generateFunc[this.element.type];
        if (func) {
          return func(this.element);
        } else {
          return "";
        }
      }
    },
    buildDefaultVal() {
      let defVal = {};
      if (
        this.element.options &&
        this.element.options.label &&
        this.element.options.defVal
      ) {
        defVal[this.element.options.label] = this.element.options.defVal;
      }
      return defVal;
    },
    $renderCode() {
      let vueTemplate = this.generateHtml();
      let params = buildParams(this.element);
      let data = this.buildDefaultVal();
      params = Object.assign({}, params, this.params, data);
      const that = this;
      const component = Vue.extend({
        data() {
          return {
            params: params,
            rules: {}
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
        template: vueTemplate
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
    this.$renderCode();
  }
};
</script>

<style lang='scss' scoped>
</style>
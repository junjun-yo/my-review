<template>
  <div :id="key" :class="key" style="height:100%;"></div>
</template>

<script>
import Vue from "vue";
import "../form.scss";
import generate from "./generate_vue";
import { buildRules, buildParams, buildDefaultVal } from "./rebuild_form";

export default {
  props: {
    data: Object,
    value: Object
  },
  data() {
    return {
      key:
        "design_render_" +
        +new Date() +
        ((Math.random() * 1000).toFixed(0) + ""),
      html: "",
      params: this.value,
      formInstance: null
    };
  },
  watch: {
    data: {
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
    $renderCode() {
      let rules = buildRules(this.data);
      let vueTemplate = generate(this.data);
      let params = buildParams(this.data);
      let data = buildDefaultVal(this.data);
      params = Object.assign({}, params, this.params, data);
      const that = this;
      const component = Vue.extend({
        data() {
          return {
            params: params,
            rules: rules
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
        template: vueTemplate,
        mounted() {
          that.formInstance = this.$refs.fmForm;
        }
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
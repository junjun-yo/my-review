import Vue from "vue";

const components = require.context("./config/components", true, /index\.vue/);

const types = new Set();
components.keys().forEach((key, i) => {
  const type = key
    .replace(/\/\w+\.\w+$/, "")
    .replace(".", "")
    .replace("/", "");
  if (type) {
    types.add(type);
  }
});

let tools = Array.from(types).map(item => {
  return {
    type: item
  };
});

tools.forEach(tool => {
  components.keys().forEach((key, i) => {
    const curType = key
      .replace(/\/\w+\.\w+$/, "")
      .replace(".", "")
      .replace("/", "");
    if (tool.type == curType) {
      const value = components(key);
      Vue.component("fm-" + curType, value.default);
    }
  });
});

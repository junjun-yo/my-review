import Vue from "vue";

//组件
import table from "./table";
import date from "./date";
import select from "./select";
import checkbox from "./checkbox";
import number from "./number";
import radio from "./radio";

const elements = { table, date, select, checkbox, number, radio };

//全局注册组件
Object.keys(elements).forEach(key => {
  Vue.component("oa-" + key, elements[key]);
});

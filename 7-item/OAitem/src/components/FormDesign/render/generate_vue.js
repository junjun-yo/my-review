import components from "../config";

let generatefunc = {};
components.forEach(item => {
  generatefunc[item.type] = item.generate;
});

export default function(data) {
  let vueHtml = ``;
  vueHtml += `<el-form ref="fmForm" :model="params" :rules="rules" >`;
  vueHtml += transFormDataToVue(data);
  vueHtml += `</el-form>`;
  return vueHtml;
}

function transFormDataToVue(data) {
  let html = ``;
  if (data && data.list) {
    let comp = ``;
    data.list.forEach((item, i) => {
      if (hasGenerateFunc(item)) {
        comp +=
          item.type != "grid"
            ? `<el-form-item prop="${item.options.label}">`
            : "";
        comp += "" + generateComp(item) + "";
        comp += item.type != "grid" ? `</el-form-item>` : "";
      }
      if (data.list.length != i + 1) {
        comp += "";
      }
    });
    return comp;
  } else {
    return html;
  }
}

function hasGenerateFunc(item) {
  let func = generatefunc[item.type];
  if (func) {
    return true;
  } else {
    return false;
  }
}

function generateComp(item) {
  if (item.type) {
    let func = generatefunc[item.type];
    if (func) {
      return func(item, transFormDataToVue);
    } else {
      return "";
    }
  }
}

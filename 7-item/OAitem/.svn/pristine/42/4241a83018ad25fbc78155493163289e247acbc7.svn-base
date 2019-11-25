import generate from "./generate_vue";

export function buildRules(data) {
  let result = {};

  const dataList = data.list;

  function reduceRules(list) {
    list.forEach(element => {
      if (element.type == "grid") {
        const columns = element.columns;
        columns.forEach(item => {
          reduceRules(item.list);
        });
      } else {
        let label = element.options.label;
        if (element.rules && element.rules.length > 0) {
          result[label] = element.rules;
        }
      }
    });
  }
  reduceRules(dataList);

  return result;
}

export function buildParams(data) {
  let keys = buildParamKeys(data);
  let params = {};
  keys.forEach(key => {
    params[key] = "";
  });
  return params;
}

export function buildParamKeys(data) {
  let vueTemplate = generate(data);
  let paramsArr = vueTemplate.match(/"params(\.).*?"/g);
  let keys = [];
  if (paramsArr != null) {
    keys = paramsArr.map(key => key.replace(/params./g, "").replace(/"/g, ""));
  }
  return keys;
}

export function buildDefaultVal(data) {
  let param = {};
  if (data.list) {
    const reduce = dataList => {
      dataList.forEach(item => {
        if (item.type == "grid") {
          if (item.columns && item.columns.length > 0) {
            item.columns.forEach(col => {
              if (col.list && col.list.length > 0) {
                reduce(col.list);
              }
            });
          }
        } else {
          if (item.options && item.options.defVal && item.options.label) {
            param[item.options.label] = item.options.defVal;
          }
        }
      });
    };
    reduce(data.list);
  }
  return param;
}

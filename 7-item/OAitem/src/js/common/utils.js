const func = {
  serialize: (obj, name) => {
    var result = "";
    function serializeInternal(o, path) {
      for (let p in o) {
        var value = o[p];
        if (typeof value != "object") {
          if (typeof value == "string") {
            result +=
              "\n" +
              path +
              "[" +
              (isNaN(p) ? '"' + p + '"' : p) +
              "] = " +
              '"' +
              value.replace(/\"/g, '\\"') +
              '"' +
              ";";
          } else {
            result +=
              "\n" +
              path +
              "[" +
              (isNaN(p) ? '"' + p + '"' : p) +
              "] = " +
              value +
              ";";
          }
        } else {
          if (value instanceof Array) {
            result +=
              "\n" +
              path +
              "[" +
              (isNaN(p) ? '"' + p + '"' : p) +
              "]" +
              "=" +
              "new Array();";
            serializeInternal(
              value,
              path + "[" + (isNaN(p) ? '"' + p + '"' : p) + "]"
            );
          } else {
            result +=
              "\n" +
              path +
              "[" +
              (isNaN(p) ? '"' + p + '"' : p) +
              "]" +
              "=" +
              "new Object();";
            serializeInternal(
              value,
              path + "[" + (isNaN(p) ? '"' + p + '"' : p) + "]"
            );
          }
        }
      }
    }
    serializeInternal(obj, name);
    return result;
  }
};

export default func;

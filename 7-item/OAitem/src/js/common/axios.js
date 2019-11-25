import axios from "axios";
import router from "vue-router";
import { Message, MessageBox } from "element-ui";
import qs from "qs";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000
});

service.interceptors.request.use(
  config => {
    config.headers["Authorization"] = localStorage.getItem("token");
    return config;
  },
  error => {
    console.log(error + "::::::request");
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.success === false) {
      Message.error(res.msg);
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return Promise.resolve(res);
    }
  },
  error => {
    var originalRequest = error.config;
    if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1
    ) {
      Message.error(
        "请求超时，超时时间为：" + originalRequest.timeout / 1000 + "秒"
      );
      return Promise.reject(error);
    }

    if (error.message.indexOf("Network Error") != -1) {
      Message.error("网络异常,请检查网络或服务器状态");
      return Promise.reject(error);
    }

    const status = (error.response && error.response.status) || null;
    if (status == 401) {
      MessageBox.alert("用户验证失效，请重新登录！", "提示", {
        confirmButtonText: "确定",
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
        type: "warning",
        callback: action => {
          window.top.location = "/login";
        }
      });
      return;
    }
    if (status == 500) {
      Message({
        message: "后台异常" + error.message,
        type: "error",
        duration: 5 * 1000
      });
    } else if (status == 404) {
      Message({
        message: "请求不存在" + error.message,
        type: "error",
        duration: 5 * 1000
      });
    } else {
      Message({
        message: "请求异常" + error.message,
        type: "error",
        duration: 5 * 1000
      });
    }
    return Promise.reject(error);
  }
);

const transformParam = (param, type) => {
  if (type) {
    if (type == "json") {
      return param;
    }
  } else {
    return qs.stringify(param, { allowDots: true });
  }
};

let ajax = {
  post: function(url, param, type) {
    var params = {
      url,
      method: "POST",
      data: transformParam(param, type)
    };

    return service(params);
  },
  get: function(url, param) {
    return service({
      url,
      method: "GET",
      params: param
    });
  },
  put: function(url, param, type) {
    return service({
      url,
      method: "PUT",
      data: transformParam(param, type)
    });
  },
  delete: function(url, param) {
    var params = {
      url,
      method: "DELETE",
      params: param
    };
    return service(params);
  }
};

export default ajax;

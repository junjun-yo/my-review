import Vue from "vue";
import dialog from "./dialog.vue";

export default {
  methods: {
    $open(options) {
      if (!options.component) {
        this.$message.error("弹窗必须传入组件模板");
        throw new Error("弹窗必须传入组件模板");
      }
      let props = options.props ? options.props : {};
      const construct = Vue.extend(dialog);
      const _vm = new construct({
        data() {
          return {
            title: options.title || "标题",
            modal: true,
            closeOnPressEscape: false,
            showClose: options.showClose === false ? false : true,
            show: true,
            fullscreen: options.fullScreen || false,
            confirmLoading: false,
            props: props,
            confirmText: options.confirmText || "确定",
            closeText: options.closeText || "关闭",
            width: options.width || "50%",
            height: options.height || "auto",
            className: options.className || "",
            showCloseBtn: options.showCloseBtn === false ? false : true,
            showConfirmBtn: options.showConfirmBtn === false ? false : true,
            top: options.top || "15vh",
            callback: options.callback || false
          };
        },
        components: {
          child: options.component
        },
        methods: {
          beforeClose(done) {
            if (options.close) {
              options.close();
            }
            done();
          },
          close() {
            if (options.close) {
              options.close();
            }
            this.show = false;
          },
          confirm() {
            const that = this;
            let loading = {
              start: () => {
                that.confirmLoading = true;
                that.confirmText = "执行中...";
              },
              close: () => {
                that.confirmLoading = false;
                that.show = false;
                that.confirmText = options.confirmText || "确定";
              },
              error: () => {
                that.confirmLoading = false;
                that.confirmText = options.confirmText || "确定";
              }
            };

            if (!this.callback) {
              loading.start();
            }

            if (this.$refs[this.key].confirm) {
              this.$refs[this.key].confirm(
                data => {
                  if (!this.callback) {
                    loading.close();
                  }
                  options.confirm && options.confirm(data, loading);
                },
                () => {
                  loading.error();
                }
              );
            } else {
              options.confirm && options.confirm();
              loading.close();
            }
          },
          childConfirm(data) {
            options.confirm && options.confirm(data);
            this.show = false;
          },
          childClose() {
            this.show = false;
          }
        }
      }).$mount();
      document.getElementsByTagName("body")[0].appendChild(_vm.$el);
    }
  }
};

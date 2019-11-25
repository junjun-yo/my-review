<template>
  <el-upload
    class="file-upload-list"
    :class="customClass"
    :action="fileUploadUrl"
    :on-change="handleChange"
    :file-list="fileList"
    :headers="headers"
    :data="props"
    :on-preview="onPreview"
    :before-remove="deforeRemove"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :limit="parseInt(limit)"
    :on-remove="remove"
    :disabled="disabled"
  >
    <div slot="tip" class="el-upload__tip" :class="disabled?'upload_disabled':''">{{tip||''}}</div>
    <div :class="disabled?'upload_disabled':'upload_btn'">上传文件</div>
  </el-upload>
</template>

<script>
export default {
  props: {
    customClass: {
      type: String,
      default: ""
    },
    props: Object,
    tip: String,
    limitType: String,
    value: Array,
    limit: String,
    limitSize: Number,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileUploadUrl: `${process.env.VUE_APP_BASE_API}/common/file/pubAttach/upload`,
      headers: {
        Authorization: localStorage.getItem("token")
      },
      fileList: []
    };
  },
  watch: {
    props() {
      this.loadFileInfo();
    },
    fileList: {
      deep: true,
      handler() {
        if (this.fileList.length > 0) {
          const list = this.fileList.map(item => {
            return {
              id: item.response ? item.response.data : "",
              name: item.name
            };
          });
          this.$emit("input", list);
        } else {
          this.$emit("input", []);
        }
      }
    }
  },
  methods: {
    remove(file) {
      this.fileList = this.fileList.filter(item => {
        return item.response.data != file.response.data;
      });
    },
    onPreview(file) {
      this.$emit("click", file);
    },
    loadFileInfo() {
      if (Object.keys(this.props).length == 0) {
        return false;
      }
      Ajax.post("common/file/pubAttach/selectAttachList", this.props).then(
        ({ data }) => {
          this.fileList = data.map(item => {
            return {
              name: item.attachName,
              response: {
                data: item.id
              },
              url: item.attachUrl
            };
          });
        },
        err => {}
      );
    },
    mattchSize(file) {
      const limitSize = this.limitSize;
      if (limitSize && file.size / 1024 > limitSize) {
        return false;
      } else {
        return true;
      }
    },
    mattchFile(file) {
      const limitType = this.limitType;
      if (limitType) {
        const types = limitType.split(",");
        let testResult = /\.[^\.]+$/.exec(file.name);
        let fileType = null;
        if (testResult) {
          fileType = testResult[0];
        }
        let matched = types.filter(type => {
          return fileType == "." + type;
        }).length;
        if (matched == 0) {
          return false;
        }
      }
      return true;
    },
    beforeUpload(file) {
      const mattchFile = this.mattchFile(file);
      const mattchSize = this.mattchSize(file);

      if (mattchSize && mattchFile) {
        return true;
      } else {
        if (!mattchFile) {
          this.$message.warning("上传文件类型限制为：" + this.limitType);
        }

        if (!mattchSize) {
          this.$message.warning(
            `文件大小不能超过${this.limitSize}k,当前文件为${(
              file.size / 1024
            ).toFixed(1)}k`
          );
        }
        return false;
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，您已选择了 ${fileList.length} 个文件`
      );
    },
    deforeRemove(file, fileList) {
      if (this.mattchFile(file) && this.mattchSize(file)) {
        return this.$confirm("确认删除该文件吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              //执行删除文件方法
              Ajax.delete("/common/file/pubAttach/deleteAttachInfo", {
                id: file.response.data
              }).then(res => {
                done();
                instance.confirmButtonLoading = false;
              });
            } else {
              done();
            }
          }
        });
      } else {
        return true;
      }
    }
  },
  created() {
    this.loadFileInfo();
  }
};
</script>

<style lang="scss">
.file-upload-list {
  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    display: inline-block;
    margin-left: 10px;
  }
  .upload_disabled {
    display: none;
  }

  .upload_btn {
    text-align: center;
    cursor: pointer;
    outline: none;
    margin-top: 5px;
    background-color: #ccc;
    width: 100px;
    height: 20px;
    border-radius: 4px;
  }
}
</style>

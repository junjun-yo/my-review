<template>
 <el-row class="full">
    <el-col :span="24">
      <el-card class="full-card" shadow="never">
        <div>
          <el-table
            :data="list"
            stripe
            :height="300"
            border
            v-loading="loading"
          >
            <el-table-column prop="attachName" label="文件名" align="center"></el-table-column>
            <el-table-column label="大小" align="center">
              <template slot-scope="{row}">
                <span>{{Math.floor(row.attachSize/1024/1024*100) / 100}} MB </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100px">
              <template slot-scope="{row}">
                <el-link type="primary" @click="remove(row)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <el-upload
            class="file-upload-list"
            :class="customClass"
            :action="fileUploadUrl"
            :file-list="fileList"
            :headers="headers"
            :on-success="handleSuccess"
            :data="props"
            :on-preview="onPreview"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-progress="handleProcess"
            :limit="parseInt(limit)"
            :show-file-list="false"
            :multiple = "true"
            :disabled="disabled"
           >
          <div :class="disabled?'upload_disabled':'upload_btn'">上传文件</div>
        </el-upload>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    customClass: {
      fileType: String,
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
      fileList: [],
      list: [],
      loading: false
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
            this.list = list;
          });
        }
      }
    }
  },
  methods: {
    onPreview(file) {
      this.$emit("click", file);
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
    handleSuccess(response, file, fileList) {
      this.list.push(response.data);
      this.loading = false;
    },
    handleError(response, file, fileList) {
      this.$message.warning(
        `文件上传失败`
      );
      this.loading = false;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，您已选择了 ${this.list.length} 个文件`
      );
    },
    handleProcess(event, file, fileList){
      //上传进度
      this.loading = true;
    },
    //删除文件
    remove(row){
      this.$confirm("确认删除该文件吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            Ajax.delete("/common/file/pubAttach/delete", {
                type: row.type,
                attachUrl:row.attachUrl
            }).then(res => {
                this.$message.success("删除成功");
                this.list = this.list.filter(item => {
                  return item.attachUrl != row.attachUrl;
                });
            });
        });
    },
    confirm(done, fail) {
        done(this.list);
    },
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

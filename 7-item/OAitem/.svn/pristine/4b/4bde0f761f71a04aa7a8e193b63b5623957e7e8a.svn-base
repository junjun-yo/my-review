<template>
  <div class="file-upload">
    <div class="file-list">
      <el-table
        :data="tableDatas"
        stripe
        style="width: 100%"
        :height="250"
        header-row-class-name="table-header"
        @row-click="rowClick"
      >
        <el-table-column prop="name" label="文件名"></el-table-column>
        <el-table-column prop="size" label="文件大小" width="180">
          <template slot-scope="{row}">{{(row.size/1024).toFixed(2) + 'kb'}}</template>
        </el-table-column>
        <el-table-column label="进度" width="180" class-name="file-status-opt">
          <template slot-scope="{row}">
            <div class="status">
              <template v-if="row.status == 'fail'">
                <span style="color:red">上传失败</span>
              </template>
              <template v-else-if="row.status == 'success'">
                <span style="color:#67C23A">上传成功</span>
              </template>
              <template v-else>
                <el-progress :percentage="Math.round(row.percentage||0)"></el-progress>
              </template>
            </div>
            <div class="opt">
              <i class="el-icon-delete" @click="removeFile(row)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tool-bar">
      <el-upload
        :action="fileUploadUrl"
        :before-upload="beforeUpload"
        :on-change="handleChange"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :on-error="handleError"
        multiple
        :limit="limit"
        :show-file-list="false"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :data="props"
        :headers="headers"
      >
        <div>
          <span style="color:red;margin-right:10px;">(只能上传xx类型文件，且不超过xxkb)</span>
          <el-button size="mini" icon="el-icon-folder-add" plain type="primary">选择文件上传</el-button>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    limit: Number,
    props: Object,
    limitType: String,
    limitSize: Number,
    click: Function
  },
  data() {
    return {
      fileUploadUrl: `${process.env.VUE_APP_BASE_API}/common/file/pubAttach/upload`,
      fileList: [],
      tableDatas: [],
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  watch: {
    props() {
      this.loadFileInfo();
    }
  },
  methods: {
    rowClick(row) {
      this.click && this.click(row);
    },
    loadFileInfo() {
      if (Object.keys(this.props).length == 0) {
        return false;
      }
      Ajax.post("common/file/pubAttach/selectAttachList", this.props).then(
        ({ data }) => {
          let list = data.map(item => {
            return {
              name: item.attachName,
              response: {
                data: item.id
              },
              size: item.attachSize,
              url: item.attachUrl,
              status: "success"
            };
          });
          this.tableDatas = list;
          this.fileList = list;
        },
        err => {}
      );
    },
    beforeUpload(file) {
      const limitSize = this.limitSize;
      if (limitSize && file.size / 1024 > limitSize) {
        this.$message.warning(
          `文件大小不能超过${this.limitSize}k,当前文件为${(
            file.size / 1024
          ).toFixed(1)}k`
        );
        return false;
      }

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
          this.$message.warning("上传文件类型限制为：" + limitType);
          return false;
        }
      }
      this.tableDatas.push(file);
      return true;
    },
    handleSuccess(response, file, fileList) {
      this.changeTableData(fileList);
    },
    handleError(err, file, fileList) {
      const curList = [file];
      this.changeTableData(curList);
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      this.changeTableData(fileList);
    },
    handleProgress(event, file, fileList) {
      this.changeTableData(fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，您已选择了 ${fileList.length} 个文件`
      );
    },
    removeFile(row) {
      if (row.response != undefined) {
        //先删除数据库中的数据以及存放在服务器上的物理文件
        Ajax.delete("/common/file/pubAttach/deleteAttachInfo", {
          id: row.response.data
        }).then(res => {
          const fileList = this.fileList.filter(item => {
            return item.uid != row.uid;
          });
          this.$set(this, "fileList", fileList);
          const tdata = this.tableDatas;
          this.tableDatas = tdata.filter(item => {
            return row.uid != item.uid;
          });
        });
      }
    },
    changeTableData(fileList) {
      const tdata = this.tableDatas;
      tdata.forEach((data, i) => {
        fileList.forEach(item => {
          if (data.uid == item.uid) {
            let d = Object.assign({}, item);
            this.$set(this.tableDatas, i, d);
          }
        });
      });
    },
    confirm(done, fail) {
      try {
        const [...tdata] = this.tableDatas
          .filter(data => {
            return data.status == "success";
          })
          .map(data => {
            return {
              id: data.response.data,
              name: data.name
            };
          });
        done(tdata);
      } catch (error) {
        fail();
      }
    }
  },
  created() {
    this.loadFileInfo();
  }
};
</script>

<style lang="scss">
.file-upload {
  .file-list {
    border: 1px solid #eee;
  }
  .table-header {
    th {
      background-color: #f0f0f0;
    }
  }
  .tool-bar {
    display: inline-block;
    text-align: right;
    width: 100%;
    margin: 10px 0;
  }

  .file-status-opt {
    .status {
      width: 80%;
      display: inline-block;
    }
    .opt {
      width: 20%;
      display: none;
      text-align: right;
      i {
        color: red;
      }
    }
    &:hover {
      .opt {
        display: inline-block;
      }
    }
  }
}
</style>


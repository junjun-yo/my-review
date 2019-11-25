<template>
  <file-upload
    class="fm-file"
    :props="props"
    :tip="tip"
    limitType="jpg,doc"
    :limit="limit"
    v-model="fileList"
    :limitSize="limitSize"
    @click="fileClick"
    :disabled="disabled"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    fileId: {
      type: String,
      default: ""
    },
    value: [String, Array],
    limitSize: Number,
    limit: {
      type: String,
      default: ""
    },
    tip: {
      type: String,
      default: "上传文件自定义提示"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    props() {
      return {
        fileId: this.fileId,
        type: this.type
      };
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  watch: {
    fileList: {
      deep: true,
      handler() {
        this.$emit("input", this.fileList);
      }
    }
  },
  methods: {
    fileClick(file) {}
  }
};
</script>

<style lang='scss' >
.fm-file {
  .el-upload__tip {
    font-size: 12px;
    color: rgb(184, 182, 182) !important;
    display: inline-block;
    margin-left: 10px;
  }
  .upload_disabled {
    display: none;
  }

  .upload_btn {
    color: #fff !important;
    text-align: center;
    cursor: pointer;
    outline: none;
    margin-top: 5px;
    background-color: rgb(218, 122, 122) !important;
    width: 100px;
    height: 20px;
    border-radius: 4px;
  }
}
</style>
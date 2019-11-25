<template>
  <el-date-picker
    v-model="data"
    align="right"
    type="date"
    :value-format="format"
    :format="format"
    placeholder="请选择日期"
    :picker-options="pickerOptions"
    @change="change"
  ></el-date-picker>
</template>

<script>
export default {
  props: {
    value: String,
    format: {
      type: String,
      default: "yyyy-MM-dd"
    }
  },
  methods: {
    change() {
      this.$emit("input", this.data);
      this.$emit("change", this.data);
    }
  },
  watch: {
    value() {
      if (this.value) {
        this.data = this.value;
      } else {
        this.data = "";
      }
    }
  },
  created() {
    if (this.value) {
      this.data = this.value;
    }
  },
  data() {
    return {
      data: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang='scss' scoped>
</style>
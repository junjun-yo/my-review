<template>
  <el-input placeholder="请选择人员" v-model="choose" readonly>
    <el-button slot="append" icon="el-icon-search" @click="$userSelect" v-if="!readonly"></el-button>
  </el-input>
</template>

<script>
import userDialog from "./user-select-dialog";
export default {
  props: {
    value: [String, Array, Object],
    allowCheckCount: Number,
    readonly: {
      type: Boolean,
      default: false
    },
    allData: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    async value() {
      this.transform();
    }
  },
  data() {
    return {
      choose: ""
    };
  },
  methods: {
    $userSelect() {
      let defaultCheck = this.value;
      if (this.value && this.value.constructor == Object) {
        defaultCheck = [this.value];
      }
      this.$open({
        title: "人员选择",
        component: userDialog,
        width: "800px",
        props: {
          allowCheckCount: this.allowCheckCount,
          defaultCheck: defaultCheck
        },
        confirm: data => {
          if (this.allData === true) {
            if (this.allowCheckCount == 1) {
              this.choose = data[0].label;
              this.$emit("input", data[0]);
            } else {
              this.choose = data.map(item => item.name).join(",");
              this.$emit("input", data);
            }
          } else {
            if (this.allowCheckCount == 1) {
              this.choose = data[0].label;
              this.$emit("input", data[0].key);
            } else {
              this.choose = data.map(item => item.name).join(",");
              this.$emit("input", data.map(item => item.key));
            }
          }
          this.$emit("confirm");
        }
      });
    },
    async transform() {
      if (this.allData === true) {
      } else {
        if (this.value) {
          if (this.value.constructor == String) {
            const res = await Ajax.post("/common/cacheData/searchNameForUser", {
              id: this.value
            });
            this.choose = res.data;
          } else {
            const res = await Ajax.post("/common/cacheData/searchNameForUser", {
              id: this.value.join(",")
            });
            this.choose = res.data;
          }
        } else {
          this.choose = "";
        }
      }
    }
  },
  created() {
    this.transform();
  }
};
</script>

<style lang='scss' scoped>
</style>
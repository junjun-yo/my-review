<template>
  <div>
    <template v-if="init">
      <el-select
        v-model="selected"
        placeholder="请选择"
        v-if="!isTree"
        :multiple="multiple"
        :clearable="clearable"
        :placeholder="placeholder"
        @change="selectChange"
        style="width:100%"
        filterable
        popper-class="dict-select-popper"
      >
        <el-option v-for="item in codes" :key="item.id" :label="item.value" :value="item.key"></el-option>
      </el-select>

      <treeselect
        v-model="selected"
        :load-options="loadOptions"
        :multiple="multiple"
        :options="codes"
        v-if="isTree"
        :normalizer="normalizer"
        placeholder="请选择"
      />
    </template>
  </div>
</template>

<script>
import treeselect from "treeselect";

export default {
  props: {
    multiple: Boolean,
    clearable: Boolean,
    code: String,
    placeholder: {
        type: String,
        default: "请选择"
    },
    value: [String, Array]
  },
  components: {
    treeselect
  },
  computed: {
    selected: {
      get() {
        return this.value || undefined;
      },
      set() {}
    },
    isTree() {
      let flag = false;
      this.codes.forEach(item => {
        if (item.children && item.children.length > 0) {
          flag = true;
        }
      });
      return flag;
    }
  },
  data() {
    return {
      init: false,
      codes: []
    };
  },
  methods: {
    async loadOptions({ action }) {},
    normalizer(node) {
      return {
        id: node.key,
        label: node.value,
        children: node.children || undefined
      };
    },
    loadDictItem() {
      this.init = false;
      Ajax.post("/common/cacheData/searchDictList", {
        code: this.code
      }).then(res => {
        this.init = true;
        if (res.data) {
          this.codes = res.data;
        } else {
          this.codes = [];
        }
      });
    },
    selectChange(val) {
      this.$emit("input", val);
    }
  },
  created() {
    this.loadDictItem();
  }
};
</script>

<style lang='scss' >
.dict-select-popper {
  margin-top: 1px !important;
  .popper__arrow {
    display: none;
  }
}
</style>
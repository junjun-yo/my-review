<template>
  <div v-if="show" class="config-content">
    <component v-bind:is="data.type+'-config'" v-bind:data="data" v-if="data.type"></component>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
//动态取配置表单
let configs = {};
const components = require.context(
  "../config/component_config",
  true,
  /\.vue$/
);
components.keys().forEach((key, i) => {
  const value = components(key);
  const type = key.replace(".vue", "").replace("./", "");
  configs[type + "-config"] = value.default;
});

export default {
  components: {
    Draggable,
    ...configs
  },
  props: ["data"],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    };
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        this.validateRequired();
        return true;
      }
      return false;
    }
  },
  methods: {
    handleOptionsRemove(index) {
      if (this.data.type === "grid") {
        this.data.columns.splice(index, 1);
      } else {
        this.data.options.options.splice(index, 1);
      }
    },
    handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: "新选项",
          label: "新选项"
        });
      } else {
        this.data.options.options.push({
          value: "新选项"
        });
      }
    },
    handleAddColumn() {
      this.data.columns.push({
        span: "",
        list: []
      });
    },
    generateRule() {
      this.data.rules = [];
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key]);
        }
      });
    },
    handleSelectMuliple(value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue];
        } else {
          this.data.options.defaultValue = [];
        }
      } else {
        if (this.data.options.defaultValue.length > 0) {
          this.data.options.defaultValue = this.data.options.defaultValue[0];
        } else {
          this.data.options.defaultValue = "";
        }
      }
    },

    validateRequired(val) {
      if (this.data.options && this.data.options.notNull) {
        this.validator.required = {
          required: true,
          message: `该项为必填项`
        };
      } else {
        this.validator.required = null;
      }
      if (this.data.options && this.data.options.readonly === true) {
        this.validator.required = null;
      }

      this.generateRule();
    },

    validateDataType(val) {
      // if (!this.show) {
      //   return false;
      // }
      // if (val) {
      //   this.validator.type = {
      //     type: val,
      //     message: this.data.name + "格式不正确"
      //   };
      // } else {
      //   this.validator.type = null;
      // }
      // this.generateRule();
    },
    valiatePattern(val) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.pattern = {
          pattern: val,
          message: this.data.name + "格式不匹配"
        };
      } else {
        this.validator.pattern = null;
      }

      this.generateRule();
    }
  },
  watch: {
    "data.options.isRange": function(val) {
      if (typeof val !== "undefined") {
        if (val) {
          this.data.options.defaultValue = null;
        } else {
          if (Object.keys(this.data.options).indexOf("defaultValue") >= 0)
            this.data.options.defaultValue = "";
        }
      }
    },
    "data.options.readonly": function(val) {
      this.validateRequired(val);
    },
    "data.options.notNull": function(val) {
      this.validateRequired(val);
    },
    "data.options.dataType": function(val) {
      this.validateDataType(val);
    },
    "data.options.pattern": function(val) {
      this.valiatePattern(val);
    },
    "data.name": function(val) {
      if (this.data.options) {
        this.validateRequired(this.data.options.notNull);
        this.validateDataType(this.data.options.dataType);
        this.valiatePattern(this.data.options.pattern);
      }
    }
  }
};
</script>

<style lang="scss" >
.config-content {
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 24px);

  .el-form-item__label {
    padding: 0;
    font-weight: 500;
  }

  .el-select {
    width: 100%;
  }
  .el-form-item {
    border-bottom: solid 1px #e1e1e1;
    padding-bottom: 18px;
    margin-bottom: 10px;
  }
}
</style>

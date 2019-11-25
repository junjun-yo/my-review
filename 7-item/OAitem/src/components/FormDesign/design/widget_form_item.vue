<template>
  <el-form-item
    class="widget-view"
    v-if="element && element.key"
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
    label-width="0"
    style="min-height:50px;"
    @click.native.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type != 'grid'">
      <render :element="element" />
    </template>
    <template v-else>{{element}}</template>

    <div class="widget-view-action" v-if="selectWidget.key == element.key">
      <i class="el-icon-document-copy" @click.stop="handleWidgetClone(index)"></i>
      <i class="el-icon-delete" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key == element.key">
      <i class="el-icon-rank drag-widget"></i>
    </div>
  </el-form-item>
</template>

<script>
import render from "../render/render_component";
import components from "../config";
export default {
  props: ["element", "select", "index", "data"],
  components: {
    render
  },
  data() {
    return {
      params: {},
      selectWidget: this.select,
      html: ""
    };
  },

  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index];
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1);
      });
    },
    handleWidgetClone(index) {
      const options = JSON.parse(JSON.stringify(this.data.list[index].options));

      let cloneData = {
        ...this.data.list[index],
        options: { ...options },
        generate: { ...this.data.list[index].generate },
        key: Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999)
      };

      if (
        this.data.list[index].type === "radio" ||
        this.data.list[index].type === "checkbox"
      ) {
        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({ ...item }))
          }
        };
      }

      this.data.list.splice(index, 0, cloneData);

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1];
      });
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true
    }
  }
};
</script>

<template>
  <div class="widget-form">
    <el-form style="height:100%" label-width="0">
      <draggable
        style="height:100%"
        v-model="data.list"
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >
        <transition-group
          name="fade"
          tag="div"
          class="widget-form-list"
          :class="data.list.length == 0?'empty':''"
        >
          <template v-for="(element, index) in data.list">
            <template v-if="element.type == 'grid'">
              <el-row
                class="widget-col widget-view"
                v-if="element && element.key"
                :key="element.key"
                type="flex"
                :class="{active: selectWidget.key == element.key}"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                align="middle"
                @click.native="handleSelectWidget(index)"
              >
                <el-col
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                >
                  <draggable
                    v-model="col.list"
                    :no-transition-on-drag="true"
                    v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                    @end="handleMoveEnd"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                  >
                    <transition-group name="fade" tag="div" class="widget-col-list">
                      <template v-for="(el, i) in col.list">
                        <widget-form-item
                          v-if="el.key"
                          :key="el.key"
                          :element="el"
                          :select.sync="selectWidget"
                          :index="i"
                          :data="col"
                        ></widget-form-item>
                      </template>
                    </transition-group>
                  </draggable>
                </el-col>
                <div
                  class="widget-view-action widget-col-action"
                  v-if="selectWidget.key == element.key"
                >
                  <i class="el-icon-delete" @click.stop="handleWidgetDelete(index)"></i>
                </div>

                <div
                  class="widget-view-drag widget-col-drag"
                  v-if="selectWidget.key == element.key"
                >
                  <i class="el-icon-rank drag-widget"></i>
                </div>
              </el-row>
            </template>
            <template v-else>
              <widget-form-item
                v-if="element && element.key"
                :key="element.key"
                :element="element"
                :select.sync="selectWidget"
                :index="index"
                :data="data"
              ></widget-form-item>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import widgetFormItem from "./widget_form_item";
export default {
  name: "widget-form",
  props: ["data", "select"],
  components: {
    draggable,
    widgetFormItem
  },
  data() {
    return {
      selectWidget: null
    };
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
  },
  mounted() {
    document.body.ondrop = function(event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isFirefox) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
  },
  methods: {
    handleMoveEnd({ newIndex, oldIndex }) {},
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index];
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex;
      const to = evt.to;
      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      const options = JSON.parse(
        JSON.stringify(this.data.list[newIndex].options)
      );

      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        key,
        options: {
          ...options,
          label: this.data.list[newIndex].type + "_" + key
        }
      });

      if (this.data.list[newIndex].type === "grid") {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({ ...item })),
          options: {
            ...options,
            label: this.data.list[newIndex].type + "_" + key
          }
        });
      }

      this.selectWidget = this.data.list[newIndex];
    },
    handleWidgetColAdd($event, row, colIndex) {
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      const options = JSON.parse(
        JSON.stringify(row.columns[colIndex].list[newIndex].options)
      );

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        key,
        options: {
          ...options,
          label: row.columns[colIndex].list[newIndex].type + "_" + key
        }
      });

      this.selectWidget = row.columns[colIndex].list[newIndex];
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
    }
  }
};
</script>

<style lang='scss' >
.widget-form {
  height: 100%;
  .ghost {
    background: #f56c6c;
    border: 2px solid #f56c6c;
    position: relative;

    &::after {
      background: #f56c6c;
    }
  }

  li.ghost {
    height: 5px;
    list-style: none;
    font-size: 0;
    overflow: hidden;
  }
  .widget-form-list {
    background: #fff;
    border: 1px dashed #999;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    &.empty {
      background: url("../../../assets/form_empty.png") no-repeat;
      background-size: 80% 80%;
      background-position: center;
    }
    .widget-col-list {
      min-height: 50px;
      border: 1px dashed #ccc;
      background: #fff;
      .el-form-item__content {
        min-height: 32px;
      }
    }
    .widget-view {
      padding-bottom: 18px;
      position: relative;
      border: 1px dashed rgba(170, 170, 170, 0.7);
      background-color: rgba(236, 245, 255, 0.3);
      margin: 2px;
      .text {
        min-height: 30px;
      }

      .el-form-item__content {
        position: unset;
      }

      &.is_req {
        .el-form-item__label::before {
          content: "*";
          color: #f56c6c;
          margin-right: 4px;
        }
      }

      .widget-view-description {
        height: 15px;
        line-height: 15px;
        font-size: 13px;
        margin-top: 6px;
        color: #909399;
      }

      .widget-view-action {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 28px;
        line-height: 28px;
        background: $--color-primary;
        z-index: 9;

        i {
          font-size: 14px;
          color: #fff;
          margin: 0 5px;
          cursor: pointer;
        }
      }

      .widget-view-drag {
        position: absolute;
        left: -2px;
        top: -2px;
        bottom: -18px;
        height: 28px;
        line-height: 28px;
        background: $--color-primary;
        z-index: 9;

        i {
          font-size: 14px;
          color: #fff;
          margin: 0 5px;
          cursor: move;
        }
      }

      &:after {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: block;
      }

      &:hover {
        background: #ecf5ff;
        outline: 1px solid $--color-primary;
        outline-offset: 0px;

        &.active {
          outline: 2px solid $--color-primary;
          border: 1px solid $--color-primary;
          outline-offset: 0;
        }

        .widget-view-drag {
          display: block;
        }
      }

      &.active {
        outline: 2px solid $--color-primary;
        border: 1px solid $--color-primary;
      }

      &.ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        height: 3px;
        box-sizing: border-box;
        font-size: 0;
        content: "";
        overflow: hidden;
        padding: 0;
      }
    }
    .widget-col {
      padding-bottom: 0;
      padding: 5px;

      background-color: rgba(253, 246, 236, 0.3);

      &.active {
        outline: 2px solid #e6a23c;
        border: 1px solid #e6a23c;
      }

      &:hover {
        background: #fdf6ec;
        outline: 1px solid #e6a23c;
        outline-offset: 0px;

        &.active {
          outline: 2px solid #e6a23c;
          border: 1px solid #e6a23c;
          outline-offset: 0;
        }
      }
      .el-col {
        min-height: 50px;
      }

      &.ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        height: 3px;
        box-sizing: border-box;
        font-size: 0;
        content: "";
        overflow: hidden;
        padding: 0;
      }
      .widget-view-action.widget-col-action {
        background: #e6a23c;
      }

      .widget-view-drag.widget-col-drag {
        background: #e6a23c;
      }

      &::after {
        display: none;
      }
    }
  }
}
</style>
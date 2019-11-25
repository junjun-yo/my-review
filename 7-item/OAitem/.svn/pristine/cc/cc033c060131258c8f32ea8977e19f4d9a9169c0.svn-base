<template>
  <div>
    <el-row class="table">
      <el-col :span="12">
        <el-input placeholder></el-input>
        <el-input placeholder></el-input>
      </el-col>
      <el-col :span="12">
        <el-input placeholder></el-input>
        <el-row>
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="20">
                  <el-col :span="12"></el-col>
                  <el-col :span="12"></el-col>
                </el-row>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-input placeholder></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4" class="card">
        <draggable
          class="dragArea-aside dragArea list-group"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="aa"
          :sort="false"
          @change="log"
        >
          <div class="drag-list-item" v-for="item in list1" :key="item.name">{{ item.name }}</div>
        </draggable>
      </el-col>

      <el-col :span="16" class="card">
        <nested-draggable :datas="list2" style="height:100%" />
      </el-col>
      <el-col :span="4" class="card">
        <div>{{list2}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import NestedDraggable from "./nested";
import { list1 } from "./components";
export default {
  components: { draggable, NestedDraggable },
  data() {
    return {
      list1,
      list: [
        {
          name: "task 1",
          tasks: []
        },
        {
          name: "task 3",
          tasks: []
        },
        {
          name: "task 5",
          tasks: []
        }
      ],
      list2: []
    };
  },
  methods: {
    log: function() {
      console.log(1);
    },
    aa: function(ori) {
      return JSON.parse(JSON.stringify(ori));
    }
  }
};
</script>

<style lang='scss'>
html,
body {
  height: 100%;
}

.table {
  border: 1px solid red;
  box-sizing: border-box;
  // .el-col > * {
  //   width: 100%;
  //   min-height: 50px;
  //   position: relative;
  //   z-index:99;
  //   border: 1px solid red;
  // }

  &:last-child {
    // border: none;
  }
  & .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  & > .el-col {
    box-sizing: border-box;
    // border-right: 1px solid red;
    // border-bottom: 1px solid red;
    min-height: 50px;
    margin-left: 0 !important;
    margin-right: 0 !important;

    & > * {
      width: 100%;
      min-height: 50px;
      // border: 1px solid red;
      border-right: 1px solid red;
      border-bottom: 1px solid red;
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .el-col {
    & > * {
      width: 100%;
      min-height: 50px;
      border-right: 1px solid red;
    }
  }
}
.card {
  height: 500px;
  border: 1px solid rgb(226, 226, 226);
}

.dragArea-main {
  height: 500px;
  .list-group-item {
    padding: 20px;
    margin: 2px;
    border: 1px solid #d5e6ff;
    background-color: #f0f8ff;
  }
}
.drag-list-item {
  font-size: 12px;
  width: 48%;
  line-height: 30px;
  padding: 0 6px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1%;
  color: #333;
  border: 1px solid #d5e6ff;
  background-color: #f0f8ff;

  &:hover {
    color: #20d0cb;
    border: 1px dashed #20d0cb;
    cursor: move;
  }

  & > a {
    display: block;
    cursor: move;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;

    .icon {
      margin-right: 6px;
      margin-left: 8px;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
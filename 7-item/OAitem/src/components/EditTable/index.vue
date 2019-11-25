<template>
  <div>
    <div>
      <el-button type="primary" @click="addRow">新增</el-button>
      <el-button type="primary">提交</el-button>
    </div>
    <div style="margin-top:10px;">
      {{data}}
      <el-form :model="tableForm.data" ref="tableForm" inline>
        <el-table :data="data" style="width: 100%" border>
          <el-table-column
            :label="column.label"
            v-for="(column,index) in columns"
            :key="index"
            :prop="column.prop"
            :align="column.align"
          >
            <template slot-scope="scope">
              <el-form-item class="nomargin">
                <el-input v-model="scope.row[column.prop]" v-if="scope.row.edit === true"></el-input>
                <span v-else>{{scope.row[column.prop]}}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" v-if="this.data && this.data.length>0">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.edit" @click="editRow(scope.row)">编辑</el-button>
              <template v-else>
                <el-button type="text" @click="cancelEditRow(scope.row)">取消</el-button>
                <el-button type="text">完成</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  watch: {
    data() {
      if (this.data && this.data.length > 0) {
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          element = Object.assign(element, {
            edit: false
          });
        }
      }
    }
  },
  data() {
    return {
      columns: [
        {
          label: "地址1",
          prop: "a",
          align: "center"
        },
        {
          label: "地址2",
          prop: "b",
          align: "center"
        },
        {
          label: "地址3",
          prop: "c",
          align: "center"
        }
      ],
      tableForm: {}
    };
  },
  methods: {
    cancelEditRow(row) {
      row["edit"] = false;
    },
    editRow(row) {
      row["edit"] = !!!row["edit"];
    },
    addRow() {
      let newRow = {};
      this.columns.forEach(item => {
        newRow[item.prop] = "";
      });
      newRow["edit"] = true;
      this.data.push(newRow);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
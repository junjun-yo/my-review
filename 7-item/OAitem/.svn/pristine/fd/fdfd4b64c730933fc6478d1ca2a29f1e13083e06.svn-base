<template>
  <div class="oa-table">
    <template v-if="showToolbar === true">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline" @submit.native.prevent>
        <div class="toolbar">
          <el-form-item>
            <el-button-group>
              <el-button v-if="add" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
              <template>
                <slot name="btns"></slot>
              </template>
            </el-button-group>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button-group>
              <el-input v-model="queryForm.keyword" @keyup.enter.native="query" :placeholder="keywordTxt" style="width:200px;float:left;"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="query"></el-button>
              <el-popover placement="bottom" width="700" trigger="click" v-if="more">
                <template>
                  <el-form :inline="true"  class="demo-form-inline">
                    <slot :queryForm="queryForm" name="more"></slot>
                  </el-form>
                  <!--<el-divider></el-divider>-->
                  <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
                </template>
                <el-button slot="reference" type="primary" title="筛查条件" icon="el-icon-caret-bottom" style="padding-left:5px;padding-right:5px;"></el-button>
              </el-popover>
            </el-button-group>
            <el-button-group style="margin-left:5px;">
              <el-popover placement="bottom" width="200" trigger="click">
                <el-checkbox-group v-model="hiddenList">
                  <div v-for="(col,i) in columnsList">
                    <el-checkbox :label="col.label" :key="`${i}`">{{col.label}}</el-checkbox>
                  </div>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" title="字段筛选"></el-button>
              </el-popover>
            </el-button-group>
          </el-form-item>
        </div>
      </el-form>
    </template>
    <el-table
      :data="tableData"
      border
      :height="curFullHeight-250-(showMore&&more?69:0)  + adjustHeight"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      ref="oaTable"
      @sort-change="sortChange"
    >
      <el-table-column v-if="showCheck === true" type="selection" width="55"></el-table-column>
      <template v-for="(col,index) in columnsList" v-if="col.hidden !== true">
        <template v-if="col.fmt || (col.opts && col.opts.length>0)">
          <el-table-column
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :align="col.align"
            :fixed="col.fixed"
            :show-overflow-tooltip="showTooltip"
            :key="`${index}`"
            v-if="col.fmt"
            :formatter="formatter"
            :sortable="sort.indexOf(col.prop) != -1?'custom':false"
          ></el-table-column>

          <el-table-column
            :label="col.label"
            :width="col.width"
            :align="col.align"
            :key="`${index}`"
            :fixed="col.fixed"
            :show-overflow-tooltip="showTooltip"
            v-if="col.opts && col.opts.length>0"
          >
            <template slot-scope="{row,index}">
              <el-button
                type="text"
                :key="j"
                :icon="opt.icon ? opt.icon : ''"
                @click.prevent="opt.click(row,index)"
                v-if="!opt.hide || !opt.hide(row,index)"
                v-for="(opt,j) in col.opts"
              >{{opt.title}}</el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="col.render == true">
          <el-table-column
                  :sortable="sort.indexOf(col.prop) != -1?'custom':false"
                  :prop="col.prop"
                  :label="col.label"
                  :align="col.align"
                  :width="col.width"
                  :fixed="col.fixed"
                  :show-overflow-tooltip="showTooltip"
                  :key="`${index}`"
          >
            <template slot-scope="{row,index}">
              <slot :row="row" :col="col" name="render"></slot>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          v-else
          :sortable="sort.indexOf(col.prop) != -1?'custom':false"
          :prop="col.prop"
          :label="col.label"
          :align="col.align"
          :width="col.width"
          :fixed="col.fixed"
          :show-overflow-tooltip="showTooltip"
          :key="`${index}`"
        ></el-table-column>
      </template>
    </el-table>
    <page :page="page" style="margin:20px" v-if="showPage === true" @change="handlePageChange"/>
  </div>
</template>

<script>
import { date } from "@/js/vue/filters";
export default {
    props: {
    add: Function,
    toolbar: Array,
    url: String,
    columns: Array,
    more: {
      type: Boolean,
      default: true
    },
    keywordTxt: {
      type: String,
      default: '请输入关键字'
    },
    ajaxType: {
        type: String,
        default: undefined
    },
    showTooltip: {
        type: Boolean,
        default: false
    },
    datas: {
      type: Array,
      default: () => {
        return [];
      }
    },
    showToolbar: {
      type: Boolean,
      default: false
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Array,
      default: () => {
        return [];
      }
    },
    ajax: Object,
    showPage: {
      type: Boolean,
      default: false
    },
    adjustHeight: {
      type: Number,
      default: 0
    }
  },
  watch: {
    hiddenList: {
      deep: true,
      handler() {
        this.columnsList.forEach(item => {
          let hidden = true;
          this.hiddenList.forEach(label => {
            if (item.label == label) {
              hidden = false;
            }
          });
          item["hidden"] = hidden;
        });
      }
    },
    ajax: {
      deep: true,
      handler() {
        this.loadingDataFromServer();
      }
    },
    datas: {
      deep: true,
      handler() {
        if (this.datas && this.datas.lenth > 0) {
          this.tableData = this.datas;
        } else {
          this.tableData = [];
        }
      }
    },
    columns: {
      deep: true,
      handler() {
        if (this.columns && this.columns.length > 0) {
          this.columnsList = this.columns.map(item => {
            return Object.assign({}, item, {
              hidden: false
            });
          });
        } else {
          this.columnsList = [];
        }
      }
    }
  },
  data() {
    return {
      tableData: this.datas,
      multipleSelection: [],
      queryForm: {},
      columnsList: this.columns,
      btnList: this.btns,
      hiddenList: this.columns.map(item => {
        return item.label;
      }),
      showMore: false,
      tableLoading: false,
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      orderParam: {}
    };
  },
  methods: {
    sortChange({ column, prop, order }) {
      if (order) {
        this.orderParam["sortField"] = prop;
        if (order == "ascending") {
          this.orderParam["sortType"] = "asc";
        }
        if (order == "descending") {
          this.orderParam["sortType"] = "desc";
        }
      } else {
        this.orderParam = {};
      }
      this.loadingDataFromServer();
    },
    reload() {
      this.loadingDataFromServer();
    },
    clear() {
      this.tableData = [];
    },
    query() {
      if (this.ajax && Object.keys(this.ajax).length > 0) {
        this.page.pageNumber = 1;
        this.loadingDataFromServer();
      }
    },
    loadingDataFromServer() {
      if (this.ajax && Object.keys(this.ajax).length > 0) {
        this.tableLoading = true;
        const { url, method, params } = this.ajax;
        let param = params;
        param = Object.assign({}, this.orderParam, param, this.queryForm);
        if (this.showPage === true) {
          param = Object.assign({}, param, this.page);
        }
        console.log(param);
        Ajax[method](url, param, this.ajaxType).then(res => {
          this.tableData = res.data;
          if (res.total) {
            this.page.total = res.total;
          }
          this.tableLoading = false;
        });
      }
    },
    showMoreList() {
      this.showMore = !this.showMore;
    },
    formatter(row, column) {
      const target = this.columns.find(item => {
        return item.prop == column.property;
      });
      return target.fmt && target.fmt(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("check", this.multipleSelection);
    },
    handlePageChange() {
      this.loadingDataFromServer();
    }
  },
  created() {
    this.loadingDataFromServer();
  }
};
</script>

<style lang='scss' >
.oa-table {
  height: 100%;
  padding-top: 20px;
  .toolbar {
    padding: 0 20px;
  }
  .el-divider {
    margin: 0;
  }
}
</style>
const components = [
  //栅格式布局
  {
    type: "grid",
    name: "栅格布局",
    icon: "el-icon-s-grid",
    columns: [
      {
        span: 4,
        list: []
      },
      {
        span: 8,
        list: []
      },
      {
        span: 4,
        list: []
      },
      {
        span: 8,
        list: []
      }
    ],
    options: {
      border: true,
      gutter: 0
    },
    generate: (item, to) => {
      let comp = ``;
      comp += `<el-row type="flex" :class="${item.options.border}?'border':'noborder'" :gutter="${item.options.gutter}">`;
      item.columns.forEach(col => {
        let customClass = "";
        if (col.list && col.list.length == 1) {
          customClass += "center";
        }
        comp += `<el-col class="${customClass}" :span="${col.span}">`;
        comp += `` + to(col) + ``;
        comp += `</el-col>`;
      });
      comp += `</el-row>`;
      return comp;
    }
  },
  {
    type: "text",
    name: "纯文本",
    icon: "el-icon-tickets",
    options: {
      content: "",
      align: "center",
      fontSize: "",
      color: "red"
    },
    generate: item => {
      const options = JSON.stringify(item.options);
      let code = `<fm-text :options='${options}'/>`;
      return code;
    }
  },
  {
    type: "input",
    name: "单行文本框",
    icon: "el-icon-document-remove",
    options: {
      dataType: "varchar",
      len: "",
      defVal: "",
      notNull: true,
      readonly: false
    },
    generate: item => {
      const { placeholder, label, dataType, readonly } = item.options;
      let comp = "";
      comp += `<el-input class="fm_column" dataType="${dataType}" label="${label}" v-model="params.${label}" :readonly="${readonly}" placeholder="${placeholder ||
        ""}" ></el-input>`;
      return comp;
    }
  },
  {
    type: "textarea",
    name: "多行文本域",
    icon: "el-icon-document-remove",
    options: {
      rows: 3,
      notNull: true,
      readonly: false,
      placeholder: ""
    },
    generate: item => {
      const { placeholder, label, readonly, rows } = item.options;
      let comp = "";
      comp += `<el-input class="fm_column" type="textarea" label="${label}" :rows="${rows}" dataType="varchar" v-model="params.${label}" :readonly="${readonly}" placeholder="${placeholder ||
        ""}" ></el-input>`;

      return comp;
    }
  },
  {
    type: "radio",
    name: "单选框组",
    icon: "el-icon-thumb",
    options: {
      notNull: true,
      disabled: false,
      defVal: "",
      align: "center",
      options: [
        {
          value: "值1",
          label: "选项1"
        },
        {
          value: "值2",
          label: "选项2"
        },
        {
          value: "值3",
          label: "选项3"
        }
      ]
    },
    generate: item => {
      const { placeholder, label, disabled, options, align } = item.options;
      let comp = "";
      comp += `<div style="width:100%;text-align:${align}">`;
      comp += `<el-radio-group class="fm_column"  dataType="varchar" label="${label}" v-model="params.${label}" :disabled="${disabled}">`;
      options.forEach(option => {
        comp += `<el-radio label="${option.value}">${option.label}</el-radio>`;
      });
      comp += `</el-radio-group></div>`;
      return comp;
    }
  },
  {
    type: "checkbox",
    name: "多选框组",
    icon: "el-icon-circle-check",
    options: {
      notNull: true,
      disabled: false,
      defVal: [],
      align: "center",
      options: [
        {
          value: "值1",
          label: "选项1"
        },
        {
          value: "值2",
          label: "选项2"
        },
        {
          value: "值3",
          label: "选项3"
        }
      ]
    },
    generate: item => {
      const { placeholder, label, disabled, options, align } = item.options;
      let comp = "";
      comp += `<div style="width:100%;text-align:${align}">`;
      comp += `<el-checkbox-group class="fm_column"  dataType="varchar" label="${label}" v-model="params.${label}" :disabled="${disabled}">`;
      options.forEach(option => {
        comp += `<el-checkbox label="${option.value}">${option.label}</el-checkbox>`;
      });
      comp += `</el-checkbox-group>`;
      comp += `</div>`;
      return comp;
    }
  },
  {
    type: "select",
    name: "下拉选择框",
    icon: "el-icon-d-caret",
    options: {
      defVal: undefined,
      multiple: false,
      disabled: false,
      placeholder: "请选择",
      notNull: false,
      options: [
        {
          value: "值1",
          label: "选项1"
        },
        {
          value: "值2",
          label: "选项2"
        },
        {
          value: "值3",
          label: "选项3"
        }
      ]
    },
    generate: item => {
      const { placeholder, label, disabled, options, multiple } = item.options;

      let comp = "";
      comp += `<el-select class="fm_column" style="width:100%;"  dataType="varchar" v-model="params.${label}" label="${label}" :multiple="${multiple}" placeholder="${placeholder}" :disabled="${disabled}" >`;
      options.forEach(option => {
        comp += `<el-option label="${option.label}" value="${option.value}"></el-option>`;
      });
      comp += `</el-select>`;
      return comp;
    }
  },
  {
    type: "date",
    name: "日期选择器",
    icon: "el-icon-date",
    options: {
      defVal: "",
      readonly: false,
      placeholder: "",
      fmtVal: "yyyy-MM-dd",
      notNull: false
    },
    generate: item => {
      const { placeholder, label, readonly, fmtVal } = item.options;
      let comp = "";
      comp += `<fm-date class="fm_column"  dataType="varchar" label="${label}" style="width:100%;" v-model="params.${label}" :readonly="${readonly}" fmtVal="${fmtVal}"/>`;
      return comp;
    }
  },
  {
    type: "file",
    name: "文件选择",
    icon: "el-icon-files",
    options: {
      defVal: "",
      disabled: false,
      tip: "上传文件自定义提示",
      notNull: false,
      type: "",
      fileId: "",
      limit: "",
      limitSize: 0
    },
    generate: item => {
      const {
        tip,
        label,
        disabled,
        align,
        fileId,
        type,
        limit,
        limitSize
      } = item.options;
      let comp = "";
      comp += `<div style="width:100%;text-align:${align}">`;
      comp += `<fm-file v-model="params.${label}" type="${type}" label="${label}" fileId="${fileId}" limit="${limit}" :limitSize="${limitSize}" :disabled="${disabled}" tip="${tip}"/>`;
      comp += `</div>`;
      return comp;
    }
  }
];

export default components;

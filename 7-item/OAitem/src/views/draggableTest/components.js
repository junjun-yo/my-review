export const list1 = [
  {
    type: "input",
    name: "单行文本",
    icon: "icon-input",
    options: {
      width: "100%",
      defaultValue: "",
      required: false,
      dataType: "string",
      pattern: "",
      placeholder: "",
      disabled: false
    },
    list: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    tasks: []
  },
  {
    type: "textarea",
    name: "多行文本",
    icon: "icon-diy-com-textarea",
    options: {
      width: "100%",
      defaultValue: "",
      required: false,
      disabled: false,
      pattern: "",
      placeholder: ""
    },
    tasks: []
  },
  {
    type: "number",
    name: "计数器",
    icon: "icon-number",
    options: {
      width: "",
      required: false,
      defaultValue: 0,
      min: "",
      max: "",
      step: 1,
      disabled: false,
      controlsPosition: ""
    },
    tasks: []
  },
  {
    type: "radio",
    name: "单选框组",
    icon: "icon-radio-active",
    options: {
      inline: false,
      defaultValue: "",
      showLabel: false,
      options: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        },
        {
          value: "选项3",
          label: "选项3"
        }
      ],
      required: false,
      width: "",
      remote: false,
      remoteOptions: [],
      props: {
        value: "value",
        label: "label"
      },
      remoteFunc: "",
      disabled: false
    },
    tasks: []
  },
  {
    type: "checkbox",
    name: "多选框组",
    icon: "icon-check-box",
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: "选项1"
        },
        {
          value: "选项2"
        },
        {
          value: "选项3"
        }
      ],
      required: false,
      width: "",
      remote: false,
      remoteOptions: [],
      props: {
        value: "value",
        label: "label"
      },
      remoteFunc: "",
      disabled: false
    },
    tasks: []
  },
  {
    type: "time",
    name: "时间选择器",
    icon: "icon-time",
    options: {
      defaultValue: "21:19:56",
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: "",
      startPlaceholder: "",
      endPlaceholder: "",
      isRange: false,
      arrowControl: true,
      format: "HH:mm:ss",
      required: false,
      width: ""
    },
    tasks: []
  },
  {
    type: "date",
    name: "日期选择器",
    icon: "icon-date",
    options: {
      defaultValue: "",
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: "",
      startPlaceholder: "",
      endPlaceholder: "",
      type: "date",
      format: "yyyy-MM-dd",
      timestamp: false,
      required: false,
      width: ""
    },
    tasks: []
  },
  {
    type: "rate",
    name: "评分",
    icon: "icon-icon-test",
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    },
    tasks: []
  },
  {
    type: "color",
    name: "颜色选择器",
    icon: "icon-color",
    options: {
      defaultValue: "",
      disabled: false,
      showAlpha: false,
      required: false
    },
    tasks: []
  },
  {
    type: "select",
    name: "下拉选择框",
    icon: "icon-select",
    options: {
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: "",
      required: false,
      showLabel: false,
      width: "",
      options: [
        {
          value: "下拉框1"
        },
        {
          value: "下拉框2"
        },
        {
          value: "下拉框3"
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: "value",
        label: "label"
      },
      remoteFunc: ""
    },
    tasks: []
  },
  {
    type: "switch",
    name: "开关",
    icon: "icon-switch",
    options: {
      defaultValue: false,
      required: false,
      disabled: false
    },
    tasks: []
  },
  {
    type: "slider",
    name: "滑块",
    icon: "icon-slider",
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ""
    },
    tasks: []
  }
];
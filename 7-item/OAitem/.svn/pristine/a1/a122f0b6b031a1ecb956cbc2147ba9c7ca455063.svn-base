export default {
  data() {
    return {
      rules: {
        parentDeptName: [
          { required: true, message: "请选择上级部门", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { max: 100, message: "长度必须小于100个字符", trigger: "blur" }
        ],
        deptSort: [
          { required: true, message: "请输入排序码", trigger: "blur" }
        ],
        layerCode: [
          { required: true, message: "请选择所属层级", trigger: "blur" }
        ],
        districtState: [
          { required: true, message: "请选择是否为行政单位", trigger: "blur" }
        ],
        virtualState: [
          { required: true, message: "请选择虚拟单位", trigger: "blur" }
        ],
        nodeType: [{ required: true, message: "请选择类型", trigger: "blur" }],
        deptType: [
          { required: true, message: "请选择部门类型", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    selectChange() {
      let required = Object.assign(this.rules);
      if (this.detailItem.districtState == "0") {
        required = Object.assign(required, {
          virtualState: [
            { required: true, message: "请选择虚拟单位", trigger: "change" }
          ]
        });
      } else {
        delete required["virtualState"];
      }
      if (
        this.detailItem.districtState == "0" &&
        this.detailItem.virtualState == "0"
      ) {
        required = Object.assign(required, {
          nodeType: [
            { required: true, message: "请选择类型", trigger: "change" }
          ]
        });
      } else {
        delete required["nodeType"];
      }
      if (
        this.detailItem.districtState == "0" &&
        this.detailItem.virtualState == "0" &&
        this.detailItem.nodeType == "2"
      ) {
        required = Object.assign(required, {
          deptType: [
            { required: true, message: "请选择部门类型", trigger: "change" }
          ]
        });
      } else {
        delete required["deptType"];
      }

      this.rules = Object.assign(required);

      return (
        this.detailItem.districtState +
        this.detailItem.virtualState +
        this.detailItem.nodeType
      );
    }
  }
};

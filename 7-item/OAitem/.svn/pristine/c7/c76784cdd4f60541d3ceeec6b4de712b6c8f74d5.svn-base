<template>
  <workflow-design ref="design" v-loading="loading" v-model="jsonData" />
</template>

<script>
import workflowDesign from "@/components/WorkflowDesign/index.vue";

export default {
  props: {
    id: String,
    unitId: String,
    flowType: String,
    subTypeId: String
  },
  components: {
    workflowDesign
  },
  data() {
    return {
      formData: {},
      jsonData: {},
      loading: false
    };
  },
  methods: {
    buildCondition(stepKey,lines){//装载条件判定信息
      let conditions = [];
      for(let i in lines){
          if(stepKey!=lines[i].targetId || !lines[i].conditions || lines[i].conditions.length==0){
              continue;
          }else{
            for(let j in lines[i].conditions){
                let cond = {...lines[i].conditions[j]};
                console.log(cond);
                if(cond.group){
                    conditions.push({
                        "elType": cond.join ? "groupStart" : "groupEnd",
                        "joinType": cond.join ? cond.join=="&&"?"and":"or": null,
                        "paramName": null,
                        "paramVal": null,
                        "paramType": null,
                        "sort": j
                    });
                }else{
                    let elType = "";
                    switch (cond["el"]){
                        case "==":
                            elType = "eq";
                            break;
                        case "!=":
                            elType = "ne";
                            break;
                        case "<":
                            elType = "lt";
                            break;
                        case "<=":
                            elType = "le";
                            break;
                        case ">":
                            elType = "gt";
                            break;
                        case ">=":
                            elType = "ge";
                            break;
                    }
                    conditions.push({
                        "elType": elType,
                        "joinType": cond["join"]=="&&"?"and":"or",
                        "paramName": cond["field"],
                        "paramVal": cond["value"],
                        "paramType": cond["valueType"],
                        "sort": j
                    });
                }
            }
          }
      }
      return conditions;
    },
    buildSteps(bpmnJson) {//装载步骤信息
      let nodes = bpmnJson.nodeList;
      let lineList = bpmnJson.lineList;
      if (nodes && nodes.length > 0) {
        let steps = [];
        for (let i in nodes) {
          if (nodes[i].type == "user") {
            let step = {...nodes[i]};
            step["conditions"] = this.buildCondition(step["stepKey"],lineList);
            delete step["id"];
            delete step["name"];
            steps.push(step);
          }
        }
        return steps;
      }
      return [];
    },
    confirm(done, fail) {
      if (this.$refs.design.validate() == true) {
        let result = this.$refs.design.result();
        let param = {
          ...this.formData,
          ...result.bpmnJson.config,
          steps: this.buildSteps({ ...result.bpmnJson }),
          bpmnJson: JSON.stringify(result.bpmnJson),
          bpmnXml: result.bpmnXml
        };
        delete param["createDate"];
        // if(1==1){
        //       console.log(param);
        //       return;
        // }
        Ajax.put("/flow/definition/save", param, "json").then(
          res => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            done();
          },
          err => {
            fail();
          }
        );
      } else {
        fail();
      }
    },
    loadFlowInfo() {
      if (this.id) {
        this.loading = true;
        Ajax.get("/flow/definition/get", {
          id: this.id
        }).then(res => {
          this.loading = false;
          if (res.data) {
            this.formData = { ...res.data };
            const { bpmnJson } = res.data;
            if (bpmnJson) {
              let json = JSON.parse(bpmnJson);
              this.jsonData = { ...json };
            }
          }
        });
      } else {
        //初始化流程属性
        this.formData = {
          flowKey:
            "process-" +
            new Date().getTime() +
            ((Math.random() * 1000).toFixed(0) + ""),
          flowName: "流程-" + new Date().getTime(),
          flowType: this.flowType || "",
          subTypeId: this.subTypeId || "",
          createUnit: this.unitId || "",
          formId: "",
          flowIcon: "",
          documentation: "",
          approvalSort: "USER_ASC"
        };

        this.jsonData.config = JSON.parse(JSON.stringify(this.formData));
      }
    }
  },
  created() {
    this.loadFlowInfo();
  }
};
</script>

<style lang='scss' scoped>
</style>
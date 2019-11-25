<template>
    <el-container v-loading="readLoading()" style="height:100%;">
        <el-header style="background-color: #eef1f6;border-radius:5px;">
            <el-row style="margin-top: 15px;">
                <el-col :span="16">
                    <el-button icon="el-icon-arrow-left" @click="close">返回</el-button>
                    <el-button type="info" plain icon="el-icon-search">打印预览</el-button>
                    <el-button type="info" plain icon="el-icon-share">查看流程</el-button>
                    <el-button type="info" plain icon="el-icon-refresh-right">生成正文</el-button>
                    <el-button type="info" plain icon="el-icon-edit">意见</el-button>
                    <el-button type="info" plain v-for="btn in step.buttons" @click="clickBtn(btn)">{{btn.btnName}}</el-button>
                </el-col>
                <el-col :span="8" style="text-align: right;">
                    <el-button type="success" plain icon="el-icon-paperclip" @click="save" :loading="saveing">保存</el-button>
                    <el-button type="primary" plain icon="el-icon-s-promotion" @click="subSave" :loading="saveing">
                        <label v-if="instanceId && step.isLast==0">发送</label>
                        <label v-if="instanceId && step.isLast==1">完成</label>
                        <label v-if="!instanceId">发起</label>
                    </el-button>
                    <el-button v-if="instanceId" type="warning" plain icon="el-icon-arrow-left" :loading="saveing">回退</el-button>
                    <el-button v-if="instanceId && step.isFrist!=1" type="danger" plain icon="el-icon-warning" :loading="saveing">取回</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-container style="height: 100%;">
            <el-aside class="app-aside" :class="isCollapse ? 'collapse' : 'nocollapse'"
                      style="height:100%;background-color: #f2f2f2;position: relative;overflow-x: hidden;">
                <label style="display: none;">{{flow.flowName}}</label>
                <el-tabs style="margin: 20px;">
                    <el-tab-pane label="相关附件" style="background-color: #ffffff;padding:10px;">
                        <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-plus"></i>新增</el-button>
                        <div v-for="o in 4" :key="o" class="text item">
                            <el-link>{{'列表内容 ' + o }}</el-link>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="审批意见" style="background-color: #ffffff;padding:10px;">
                        <el-row>
                            <el-col :span="24">
                                <el-radio-group style=" padding: 3px 0" v-model="reverse" size="mini">
                                <el-radio-button :label="true">时间倒序</el-radio-button>
                                <el-radio-button :label="false">时间正序</el-radio-button>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="24">
                                <el-timeline :reverse="reverse" style="margin-top: 20px;">
                                    <el-timeline-item v-for="approval in assigneeApprovals" :timestamp="$options.filters['date'](approval.completeDate, 'yyyy-MM-dd hh:mm')" placement="top" type="success">
                                        <h4>{{approval.approval}}</h4>
                                        <p>{{approval.userName}} <el-tag type="info" size="mini" style="float:right;">{{approval.taskName}}</el-tag></p>
                                    </el-timeline-item>
                                </el-timeline>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <div class="collapse-btn" @click="isCollapse=!isCollapse" :class="{'colse':!isCollapse}">
                <i v-if="isCollapse" class="el-icon-caret-left"></i>
                <i v-if="!isCollapse" class="el-icon-caret-right"></i>
            </div>
            <el-main style="">
                <render v-if="widgetForm" :data="widgetForm" v-model="submitVariables.flowVariables.variables" />

                <el-row>
                    <el-col :span="4">instance:</el-col>
                    <el-col :span="20">{{instance}}</el-col>
                    <el-col :span="4">step:</el-col>
                    <el-col :span="20">{{step}}</el-col>
                    <el-col :span="4">submitVariables:</el-col>
                    <el-col :span="20">{{submitVariables}}</el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import render from "@/components/FormDesign/render";
import assigneesDialog from "./assigneesDialog";
import store from "@/store";
export default {
    props: {
        taskId: String,
        flowId: String,
        stepKey: String,
        formId: String,
        instanceId: String,
        fmId: String
    },
    components: {
        render
    },
    computed: {

    },
    data() {
        return {
            store,
            reverse:true,
            loadingFLow:false,
            loadingInstance:false,
            loadingStep:false,
            loadingForm:false,
            loadingFormData:false,
            saveing:false,
            isCollapse: true,
            data: Object,
            formInfo: null,     //表单设计对象
            widgetForm: null,   //表单设计对象json
            step: Object,       //当前步骤对象
            flow: Object,       //当前流程对象
            instance: Object,   //当前流程实例对象
            assigneeApprovals:[],   //处理人意见记录
            submitVariables: {
                assignee: {
                    approval: "",
                    taskId: "",
                    userId: store.state.account.sysUser.userId
                },
                flowVariables: {
                    localScope: false,
                    transientVariables: {},
                    variables: {}
                },
                nextStep: null,
                toAssignees: null
            }
        };
    },
    watch:{
    },
    methods:{
        readLoading:function(){
            if(this.loadingFlow === true
                || this.loadingStep === true
                || this.loadingInstance ===true
                || this.loadingForm === true
                || this.loadingFormData === true){
                return true;
            }else{
                return false;
            }
        },
        loadFlow() {        //读取当前流程定义对象信息
            this.loadingFlow = true;
            Ajax.get("/flow/definition/get",{
                id: this.flowId
            }).then(res => {
                this.loadingFlow = false;
                this.flow = res.data;
            }).catch(err => {
                this.loadingFlow = false;
            });
        },
        loadInstance() {
            this.loadingInstance = true;
            Ajax.get("/flow/instance/get",{
                instanceId: this.instanceId
            }).then(res => {
                this.loadingInstance = false;
                this.instance = res.data;
            }).catch(err => {
                this.loadingInstance = false;
            });
        },
        loadStep() {        //读取当前流程步骤对象
            this.loadingStep = true;
            Ajax.get("/flow/definition/step/get",{
                flowId: this.flowId,
                stepKey: this.stepKey ? this.stepKey : null
            }).then(res => {
                this.loadingStep = false;
                this.step =res.data;
            }).catch(err => {
                this.loadingStep = false;
            });
        },
        loadNextStep() {    //根据当前表单内容判定下一步节点
            if(this.step.nextStep && this.step.nextStep!=""){
                let url = "/flow/definition/step/getNextStep?flowId="+this.flowId+"&stepKeys="+this.step.nextStep;
                Ajax.post(url, this.submitVariables.flowVariables, "json").then(res => {
                    console.log(res);
                }).catch(err =>{

                });
            }else{
                this.$message.error("没有读取到下级可选步骤");
            }
        },
        loadFormInfo() {    //读取当前表单定义对象信息
            this.loadingForm = true;
            Ajax.post("/common/form/get", {
                id: this.formId
            }).then(res => {
                this.loadingForm = false;
                this.formInfo = res.data;
                let form = JSON.parse(this.formInfo.content);
                this.widgetForm = form;
            }).catch(err => {
                this.loadingForm = false;
            });
        },
        loadFormData(){     //读取当前表单实例数据信息
            this.loadingFormData = true;
            Ajax.get("/common/form/data/get", {
                formId: this.formId,
                fmId: this.fmId
            }).then(res => {
                this.loadingFormData = false;
                if(res.data && res.data.length>0){
                    // this.formData = res.data[0];
                    this.submitVariables.flowVariables.variables = res.data[0];
                }
            }).catch(err => {
                this.loadingFormData = false;
            });

        },
        loadAssigneeApprovals(){        //读取当前实例下的审批意见
            Ajax.post("/flow/instance/assignees", {
                instanceId: this.instanceId,
                completeStatus: 1
            }).then(res => {
                this.assigneeApprovals = res.data;
            });
        },
        selectAssignee(){   //选择执行人
             this.$openUserSelect({
                allowCheckCount: 1, //只能选一个的参数
                defaultCheck: undefined, //多个值接收数组
                confirm: data => {
                    //多个为id的数组，一个为id的字符串
                    console.log(data);
                    this.submitVariables.toAssignees = data;
                }
            });
        },
        async save(){       //保存流程表单数据(保存草稿)
            this.saveing = true;
            Ajax.put("/flow/task/save",this.submitVariables,"json").then(
                res => {
                    this.$message({
                        message: "保存成功！",
                        type: "success"
                    });
                    this.$emit("confirm");
                    this.saveing = false;
                }
            ).catch(err => {
                this.saveing = false;
            });
        },
        subSave(){      //提交流程表单
            if(1==1){
                this.loadNextStep();
            }
            if(!this.submitVariables.toAssignees){
                this.$openUserSelect({
                    confirm: data => {
                        this.submitVariables.toAssignees = data.join(",");
                        this.complete();
                    }
                });
            }else{
                this.complete();
            }
            // this.$emit("confirm");
        },
        complete(){     //完成流程表单
            // this.$open({
            //     title: "提交表单",
            //     width: "1000px",
            //     confirmText:"提交",
            //     closeText:"取消",
            //     component: assigneesDialog,
            //     props: {
            //         params: this.submitVariables,
            //         step: this.step,
            //         taskId: this.taskId
            //     },
            //     confirm: () => {
            //
            //     }
            // });
            this.saveing = true;
            Ajax.put("/flow/task/complete",this.submitVariables,"json").then(
                res => {
                    this.$message({
                        message: "操作完成！",
                        type: "success"
                    });
                    this.saveing = false;
                    this.$emit("confirm");
                }
            ).catch(err => {
                this.saveing = false;
            });
        },
        close(){
            this.$emit("close");
        },
        clickBtn(btn){  //自定义按钮点击处理
            alert(btn.btnKey);
        }
    },
    created() {
        if(this.formId){
            //读取任务相关表单定义信息
            this.loadFormInfo();
            if(this.fmId){
                //读取表单数据实例对象
                this.loadFormData();
            }
        }
        //判断是否已存在任务，不存在则是新建
        if(this.taskId){
            //设置当前任务操作参数
            this.submitVariables.assignee.taskId = this.taskId;
        }
        if(this.instanceId){
            //读取该任务对应流程实例信息
            this.loadInstance();
            //读取该任务流程实例的审批记录和附件信息
            this.loadAssigneeApprovals();

        }
        if(this.flowId){
            this.loadFlow();
            this.loadStep();
        }
    }
};
</script>

<style scoped lang="scss">
    .collapse {
        overflow-y: auto;
         width: 300px !important;
         transition: width 0.2s;
     }
    .nocollapse {
        overflow-y: hidden;
        width: 15px !important;
        transition: width 0.2s;

     }
    .collapse-btn{
        cursor: pointer;
        position: absolute;
        left: 320px;
        top: 140px;
        height: 80px;
        width: 15px;
        background: #f2f2f2;
        text-align: center;
        line-height: 80px;
        vertical-align: middle;
        border-radius: 0px 8px 8px 0px;
        border: 1px solid #eef1f6;
        border-right: none;
        z-index:1;
        transition: left 0.2s;
        &i{
         width:15px;
         }
    }
    .collapse-btn.colse{
        left:35px!important;
    }
</style>
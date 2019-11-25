<template>
    <el-container style="height: 100%;">
        <el-aside width="160px" v-if="$route.params.showSubType=='true'">
            <el-row style="height: 100%;">
                <el-col style="margin-top:10px;margin-left:10px;" :span="20" v-for="(item,index) in subTypes" :key="item.key">
                    <a @click="setSubType(item)" :href="'#'+item.id" style="text-align: center;">
                        <el-card style="cursor: pointer;" :shadow="item.id == curType ? 'always' : 'hover'">
                            <span ><i :class="item.icon" style="width: 100%;font-size: 32px;"></i>{{item.name}}</span>
                        </el-card>
                    </a>
                </el-col>
            </el-row>
        </el-aside>
        <el-main>
            <el-card class="full-card" shadow="never" style="overflow-y: auto;">
                <ul class="ul" v-if="$route.params.showSubType=='true'" style="margin-bottom: 500px;">
                    <li style="margin-top:10px;margin-left:10px;" :id="item.id" :span="20" v-for="(item,index) in subTypes" :key="item.id" >
                        <h2>{{item.name}}</h2>
                        <ul class="flowPanel">
                            <li v-for="(flow,index) in rows" v-if="item.id == flow.subTypeId" @click="startFunc(flow)">
                                <i class="el-icon-share"></i>{{flow.flowName}}
                            </li>
                        </ul>
                    </li>
                    <li style="margin-top:10px;margin-left:10px;" >
                        <h2>其他</h2>
                        <ul class="flowPanel">
                            <li v-for="(flow,index) in rows" v-if="!flow.subTypeId || flow.subTypeId==''" @click="startFunc(flow)">
                                <i :class="flow.flowIcon ? flow.flowIcon : 'el-icon-share'"></i>{{flow.flowName}}
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="ul" v-if="$route.params.showSubType!='true'" style="margin-bottom: 500px;">
                    <li style="margin-top:10px;margin-left:10px;" >
                        <h2>{{flowType | dict('flowType')}}流程</h2>
                        <ul class="flowPanel">
                            <li v-for="(flow,index) in rows" @click="startFunc(flow)">
                                <i :class="flow.flowIcon ? flow.flowIcon : 'el-icon-share'"></i>{{flow.flowName}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import store from "@/store";
    import workflowForm from "../components/form"

    export default {
        mounted(){
            this.flowType = this.$route.params.flowType;
            if(this.$route.params.showSubType=='true'){
                this.querySubType();
            }
            if(this.$route.params.flowType){
                this.queryFlow();
            }
        },
        data() {
            return {
                subTypes: [],
                curType: "",
                rows: [],
                flowType: "",
                store
            };
        },
        methods: {
            onCheck(checks) {
                console.log(checks);
            },
            showDetails(item) {console.log(item);
                this.$open({
                    title:  "新建流程["+item.flowName+"]",
                    component: workflowForm,
                    fullScreen: true,
                    showConfirmBtn: false,
                    showCloseBtn: false,
                    showClose: true,
                    props: {
                        flowId: item.id,
                        formId: item.formId
                    },
                    confirm: () => {
                        // this.$refs.table.reload();
                    }
                });
            },
            startFunc(row) {
                if(1==1){
                    this.showDetails(row);
                    return;
                }
                this.$confirm("是否发起一个流程["+row.flowName+"]任务?", "提示", {
                    type: "info"
                }).then(() => {
                    let title = row.flowName + "_实例"+new Date().getTime();
                    let url = "/flow/task/start?flowId=" + row.id + "&userId=" + store.state.account.sysUser.userId + "&title="+title;
                    let variables = {
                        localScope: true,
                        transientVariables: {
                        },
                        variables: {
                            "标题" : "标题要长长长长长长长长长长长长长长长长长长长长长长",
                            "标题2": "标题2标题2标题2标题2标题2标题2标题2",
                            "SOHO": "sosososososososososososososos"
                        }
                    }
                    Ajax.put(url, variables, "json").then(res => {
                        console.log(res);
                        this.$message.success("发起成功");
                    });
                });
            },
            querySubType(){
                Ajax.post("/flow/subType/list",{
                    flowType: this.flowType
                }).then(res => {
                    this.subTypes = res.data;
                });
            },
            queryFlow(){
                Ajax.post("/flow/definition/list",{
                    createUnit : store.state.account.sysUser.unitId,
                    flowStatus : "1",
                    flowType : this.flowType,
                    keyword : ""
                }).then(res => {
                    this.rows = res.data;
                });
            },
            setSubType(item){
                this.curType = item.id;
            }
        }
    };
</script>

<style lang='scss' scoped>
    .el-card.is-always-shadow{
        background: #F2F6FC;
        color: #409EFF;
        border-color: #409EFF;
    }
    .ul{
        list-style: none;
        width: 100%;
        float: left;
    }
    .ul h2{
        padding: 10px;
        font-size: 16px;
        border-left: 3px solid #409EFF;
        background-color: #F2F6FC;
        width: 100%;
        float: left;
    }
    .ul>li{
        float: left;
        width: 100%;
    }
    .flowPanel{
        list-style: none;
        float: left;
        width: 100%;
        padding: 20px 20px 0px 20px;
    }
    .flowPanel li{
        width: 120px;
        height: 120px;
        background: #f5f5f5;
        text-align: center;
        border-radius: 8px;
        border: 1px solid #efefef;
        float:left;
        font-size: 16px;
        font-weight: bold;
        color: #0199e0;
        padding: 15px;
        margin-right: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        i{
            font-size: 52px;
            width:100%;
        }
        &:hover,&:focus{
            background: #0199e0;
            color:#ffffff;
        }
    }
</style>
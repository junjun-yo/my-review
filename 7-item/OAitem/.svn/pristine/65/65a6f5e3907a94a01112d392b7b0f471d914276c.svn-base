<template>
    <el-container style="height: 100%;">
        <el-main style="">
            <el-row>
                <el-col :span="24" v-if="1 == step.property.isFreedom">
                    <div>
                        <label style="margin-right: 20px;">可选下级节点:</label>
                        <el-radio-group v-model="submitVariables.nextStep" size="mini">
                            <el-radio-button label="1">备选节点1</el-radio-button>
                            <el-radio-button label="2">备选节点2</el-radio-button>
                            <el-radio-button label="3">备选节点3</el-radio-button>
                        </el-radio-group>
                    </div>
                </el-col>
                <el-col :span="8" style="height:300px;">
                    <ztree
                            title="部门"
                            ref="deptTree"
                            url="/system/addressBook/selectSysDeptList"
                            disableClick
                            multiple
                            @check="onCheck"
                            :cascade="cascade"
                            :allowCheckCount="allowCheckCount"
                            :defaultCheck="defaultCheck"
                    />
                </el-col>
                <el-col :span="8">
                    <ul>
                        <li v-for="o in 4" :key="o">备选人员{{0}}</li>
                    </ul>
                </el-col>
                <el-col :span="8">
                    <ul>
                        <li v-for="o in 4" :key="o">已选人员{{0}}</li>
                    </ul>
                </el-col>
                <el-col :span="24">{{task}}</el-col>
                <el-col :span="24">
                    {{submitVariables}}
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import store from "@/store";
    export default {
        props: {
            taskId: String,
            params: Object,
            step: Object
        },
        data() {
            return {
                store,
                nextStep:[],        //下一步需要执行的节点(需要验证判断接口)
                steps:[],           //可选的节点(读取当前任务后的节点项)
                task:Object,        //当前任务对象
                submitVariables: this.params
            };
        },
        watch: {
            submitVariables: {
                deep: true,
                handler() {
                    this.$emit("input", this.params);
                }
            }
        },
        methods: {
            getTask(){
                Ajax.get("/flow/task/get",{
                    id: this.taskId
                }).then(res => {
                    this.task = res.data;
                }).catch(err => {
                });
            }
        },
        created() {
            console.log(this.step);
            if(this.taskId){
                this.getTask();
            }
        }
    };
</script>

<style lang='scss' scoped>
</style>
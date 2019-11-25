<template>
    <div>
        <el-form :model="config" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="条件标题">
                        <el-input v-model="config.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="设置条件">
                        <oa-select v-model="conditionType" :options="optConditionTypes" style="width:80px;"
                                   @change="onChangeConditionType"/>
                        <oa-select v-if="conditionType=='form'" v-model="conditionField" :options="structs"
                                   style="width:120px;" placeholder="请选择字段"
                                   optKey="id" optLabel="name" optValue="name"/>
                        <oa-select v-model="conditionEl" :options="optConditionEls" style="width:100px;"/>
                        <el-input v-model="conditionLabel" style="width:200px;" @change="onChangeConditionLabel">
                            <el-select v-model="valueType" slot="prepend" style="width:80px;">
                                <el-option label="字符" value="string"></el-option>
                                <el-option label="数字" value="number"></el-option>
                            </el-select>
                            <el-button v-if="conditionType=='user' || conditionType=='dept'" slot="append"
                                       icon="el-icon-search" @click="searchValue"></el-button>
                        </el-input>
                        <el-button type="primary" icon="el-icon-plus" plain style="margin-left:10px;"
                                   @click="addCondition">添加
                        </el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-table :data="config.conditions" height="350" style="width: 100%">
                        <el-table-column label="连接条件" width="120">
                            <template slot-scope="scope">
                                <oa-select v-if="showJoin(scope.row,scope.$index)" v-model="scope.row.join"
                                           :options="[{label:'并且',value:'&&'},{label:'或者',value:'||'}]"
                                           style="width:80px;"/>

                                <el-button v-if="scope.$index==0" type="primary" icon="el-icon-plus" plain @click="addGroup">分组</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="表达式">
                            <template slot-scope="scope">
                                <font v-if="!scope.row.group" class="el">{{toUel(scope.row)}}</font>
                                <font v-if="scope.row.group" class="group">{{toUel(scope.row)}}</font>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button v-if="scope.$index>0" type="info" size="mini" plain circle icon="el-icon-top"
                                           @click="toUp(scope.row,scope.$index)"></el-button>
                                <el-button v-if="scope.$index<config.conditions.length-1" type="info" size="mini" plain
                                           circle icon="el-icon-bottom"
                                           @click="toDown(scope.row,scope.$index)"></el-button>
                                <el-button type="danger" size="mini" plain circle icon="el-icon-close"
                                           @click="remove(scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-form>
        {{buildEl()}}
    </div>
</template>

<script>
    export default {
        props: {
            lineData: Object,
            structs: Array
        },
        data() {
            return {
                config: {
                    ...{
                        uel: "",
                        conditions: []
                    },
                    ...this.lineData
                },
                rules: {},
                conditionType: 'form',
                conditionField: "",
                conditionEl: "==",
                conditionValue: "",
                conditionLabel: "",
                valueType: "string",
                optConditionTypes: [
                    {value: "user", label: "人员"},
                    {value: "role", label: "角色"},
                    {value: "dept", label: "部门"},
                    {value: "form", label: "表单"}
                ],
                optConditionEls: [
                    {value: "==", label: "等于"},
                    {value: "!=", label: "不等于"},
                    {value: "<", label: "小于"},
                    {value: "<=", label: "小于等于"},
                    {value: ">", label: "大于"},
                    {value: ">=", label: "大于等于"}
                ]
            };
        },
        methods: {
            confirm(done, fail) {
                console.log(this.config);
                done(this.config);
            },
            addCondition() {
                if (this.conditionField && this.conditionValue && this.conditionEl) {
                    let condition = {
                        field: this.conditionField,
                        el: this.conditionEl,
                        value: this.conditionValue,
                        label: this.conditionLabel,
                        valueType: this.valueType,
                        join: "&&"
                    };
                    this.config.conditions.push(condition);
                    this.resetCondition();
                }
            },
            addGroup(){
                let groupStart = {
                    group:"(",
                    join: "&&"
                };
                let groupEnd = {
                    group:")"
                };
                this.config.conditions.splice(1,0,groupStart);
                this.config.conditions.splice(2,0,groupEnd);
            },
            toUel(item) {
                if (item.group){
                    return item.group;
                }else{
                    if (item.valueType == 'number') {
                        return " " + item.field + " " + item.el + " " + item.label + " ";
                        // return "${ " + item.field + " " + item.el + " " + item.label + " }";
                    } else {
                        return " " + item.field + " " + item.el + " '" + item.label + "'";
                        // return "${ " + item.field + " " + item.el + " '" + item.label + "' }";
                    }
                }
            },
            buildEl(){
                let str = "";
                if(this.config.conditions && this.config.conditions.length > 0) {
                    str = "<![CDATA[ ${ ";
                    for (var i in this.config.conditions) {
                        let c = this.config.conditions[i];
                        if (!c.group) {
                            if (this.showJoin(c, i)) {
                                str += " " + c.join;
                            }
                            str += this.toUel(c);
                        } else {
                            if (this.showJoin(c, i)) {
                                str += " " + c.join;
                            }
                            str += " " + c.group;
                        }
                    }
                    str += " } ]]>";
                }
                this.config.uel = str;
                return str;
            },
            showJoin(item,index){
                if(index==0){
                    return false;
                }else{
                    if(item.group){
                        if(!item.join){
                            return false;
                        }
                    }else{
                        if(this.config.conditions[index-1].group && this.config.conditions[index-1].join){
                            return false;
                        }
                    }
                }
                return true;
            },
            resetCondition() {
                this.conditionField = "";
                this.conditionValue = "";
                this.conditionLabel = "";
            },
            onChangeConditionType(value) {
                this.resetCondition();
                switch (value) {
                    case "user":
                        this.conditionField = "sys_当前用户";
                        break;
                    case "role":
                        this.conditionField = "sys_当前角色";
                        break;
                    case "dept":
                        this.conditionField = "sys_当前部门";
                        break;
                }
            },
            onChangeConditionLabel(value) {
                switch (this.conditionType) {
                    case "form":
                        this.conditionValue = value;
                        break;
                }
            },
            searchValue() {
                switch (this.conditionType) {
                    case "user":
                        this.$openUserSelect({
                            allData: true,
                            allowCheckCount: 1,
                            confirm: data => {
                                this.conditionValue = data.key;
                                this.conditionLabel = data.label;
                            }
                        });
                        break;
                    case "dept":
                        this.$openDeptSelect({
                            allowCheckCount: 1,
                            confirm: data => {
                                this.conditionValue = data.id;
                                this.conditionLabel = data.name;
                            }
                        });
                        break;
                }
            },
            remove(item) {
                this.config.conditions.splice(this.config.conditions.indexOf(item), 1);
            },
            //上移按钮对象
            toUp(item, index) {
                console.log(item + index);
                if (index > 0) {
                    let tmpItem = this.config.conditions[index - 1];
                    this.$set(this.config.conditions, index - 1, item);
                    this.$set(this.config.conditions, index, tmpItem);
                }
            },
            //下移按钮对象
            toDown(item, index) {
                console.log(item + index);
                if (index < this.config.conditions.length - 1) {
                    let tmpItem = this.config.conditions[index + 1];
                    this.$set(this.config.conditions, index + 1, item);
                    this.$set(this.config.conditions, index, tmpItem);
                }
            }
        },
        mounted() {
            console.log(this.structs);
        }
    };
</script>

<style lang='scss' scoped>
    .group{
        font-weight: bold;
        color: red;
    }
    .el{
        padding-left:20px;
        color: blue;
    }
</style>
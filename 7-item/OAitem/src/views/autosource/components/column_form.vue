<template>
    <div >
        <el-form :model="vo" :rules="rules" label-width="80px" ref="voForm">
            <el-row class="full">
                <el-col :span="12">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="vo.name" autocomplete="off" maxlength="30" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="属性名称" prop="fieldName">
                        <el-input v-model="vo.fieldName" autocomplete="off" maxlength="30" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="字段类型" prop="columnType">
                        <el-select v-model="vo.columnType" placeholder="请选择">
                            <el-option v-for="item in columnTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="字段长度" prop="maxLength">
                        <oa-number v-model="vo.maxLength" :min="1" :max="1000"></oa-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="字段精度">
                        <oa-number v-model="vo.minLength" :disabled="vo.columnType!=='numeric'" :min="0" :max="8"></oa-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否必填" style="margin-bottom: 19px;">
                        <el-switch v-model="vo.notNull" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="组件类型" prop="commonType">
                        <el-select v-model="vo.commonType" placeholder="请选择">
                            <el-option v-for="item in commonTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="查询类型" prop="searchType">
                        <el-select v-model="vo.searchType" placeholder="请选择">
                            <el-option v-for="item in searchTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="列表显示" style="margin-bottom: 19px;">
                        <el-switch v-model="vo.showList" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="默认值">
                        <el-input v-model="vo.defaultVal" autocomplete="on" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="排序号" prop="sort">
                        <oa-number v-model="vo.sort" :min="0" :max="999"></oa-number>
                    </el-form-item>
                </el-col>
                <el-col v-if="vo.columnType=='bigint' || vo.columnType=='int' || vo.columnType=='numeric' " :span="8">
                    <el-form-item label="最小值" prop="minValue">
                        <oa-number v-model="vo.minValue" :min="-9999" :max="999999999"></oa-number>
                    </el-form-item>
                </el-col>
                <el-col v-if="vo.columnType=='bigint' || vo.columnType=='int' || vo.columnType=='numeric' " :span="8">
                    <el-form-item label="最大值" prop="maxValue">
                        <oa-number v-model="vo.maxValue" :min="-9999" :max="999999999"></oa-number>
                    </el-form-item>
                </el-col>
                <el-col v-if="vo.commonType == 'select' || vo.commonType == 'multiselect'" :span="16">
                    <el-form-item label="字典项">
                        <el-input v-model="vo.dictKey" autocomplete="on" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-if="vo.commonType == 'select' || vo.commonType == 'multiselect'" :span="24">
                    <el-form-item label="选项">
                        <el-col :span="12">
                            <el-input placeholder="请输入选项值" v-model="inputValue" class="input-with-select"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入选项文本" v-model="inputLabel" class="input-with-select">
                                <el-button slot="append" icon="el-icon-plus" @click="addOption()"></el-button>
                            </el-input>
                        </el-col>

                        <el-table style="width:100%;" height="220" :data="vo.options">
                            <el-table-column label="值" prop="value"></el-table-column>
                            <el-table-column label="文本" prop="label"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="{row}">
                                    <el-link type="primary" @click="removeOption(row)" icon="el-icon-delete" :underline="false">删除</el-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>

    export default {
        props: {
            vo : {options:[]}
        },
        data() {
            var sqlkeys = "table,from,insert,update,delete,select,values,exec,execute,truncate,drop";
            var validateSqlKey = (rule, value, callback) => {
                let keys = sqlkeys.split(",");
                for(let i in keys){
                    if(value.toLowerCase() === keys[i]){
                        callback(new Error('请不要使用数据库sql关键字!'));
                        return;
                    }
                }
                callback();
            };
            var javakeys = "class,package,import,public,private,protected,string,int,integer,boolean,float,date" +
                "long,void,return,true,false,static,const,final,if,else,switch,for,while,enum";
            var validateJavaKey = (rule, value, callback) => {
                let keys = javakeys.split(",");
                for(let i in keys){
                    if(value.toLowerCase() === keys[i]){
                        callback(new Error('请不要使用数据库java关键字!'));
                        return;
                    }
                }
                callback();
            };
            return {
                rules: {
                    name: [
                        { required: true, message: "名称不能为空", trigger: "blur" }
                    ],
                    fieldName: [
                        { required: true, message: "属性名称不能为空", trigger: "blur" },
                        { validator: validateSqlKey, trigger: 'blur' },
                        { validator: validateJavaKey, trigger: 'blur' }
                    ],
                    columnType: [
                        { required: true, message: "请选择字段类型", trigger: "blur" }
                    ],
                    maxLength: [
                        { required: true, message: "字段长度不能为空", trigger: "blur" }
                    ],
                    commonType: [
                        { required: true, message: "请选择组件类型", trigger: "blur" }
                    ],
                    searchType: [
                        { required: true, message: "请选择查询类型", trigger: "blur" }
                    ]
                },
                columnTypes : [
                    {label:'字符',value:'varchar'},
                    {label:'整数',value:'int'},
                    {label:'长整数',value:'bigint'},
                    {label:'小数',value:'numeric'},
                    {label:'日期',value:'datetime'},
                    {label:'大文本',value:'text'}
                ],
                commonTypes : [
                    {label:'文本框',value:'text'},
                    {label:'文本域',value:'textarea'},
                    {label:'数字',value:'number'},
                    {label:'日期',value:'datetime'},
                    {label:'下拉框',value:'select'},
                    {label:'多选',value:'multiselect'},
                    {label:'开关',value:'onoff'},
                    {label:'隐藏域',value:'hidden'},
                    {label:'文件',value:'file'},
                    {label:'图片',value:'img'}
                ],
                searchTypes : [
                    {label:'不查询',value:'NOT'},
                    {label:'精确查询',value:'FULL'},
                    {label:'模糊查询',value:'LIKE'}
                ],
                inputValue : '',
                inputLabel : ''
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        if(this.vo.options){
                            this.vo.options = JSON.stringify(this.vo.options);
                        }
                        done({...this.vo});
                    } else {
                        fail();
                    }
                });
            },
            addOption() {
                if(!this.vo.options) {
                    this.$set(this.vo,"options",[]);
                }
                if(!this.inputValue || !this.inputLabel){
                    this.$message.error("值或文本不能为空");
                    return;
                }
                this.vo.options.push({
                    value : this.inputValue,
                    label : this.inputLabel
                });
                this.inputValue = '';
                this.inputLabel = '';
            },
            removeOption(opt) {
                this.vo.options.splice(this.vo.options.indexOf(opt), 1);
            }
        },
        created() {
            //初始化
            if(this.vo){
                if(!this.vo.columnType)this.$set(this.vo,'columnType','varchar');
                if(!this.vo.maxLength)this.$set(this.vo,'maxLength',100);
                if(!this.vo.minLength)this.$set(this.vo,'minLength', 0);
                if(!this.vo.commonType)this.$set(this.vo,'commonType','text');
                if(!this.vo.searchType)this.$set(this.vo,'searchType','NOT');

                if(this.vo.options){
                    this.vo.options = JSON.parse(this.vo.options);
                }
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
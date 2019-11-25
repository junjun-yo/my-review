<template>
    <div v-loading="formLoading">
        <el-form :model="vo" :rules="rules" label-width="80px" ref="voForm">
            <el-row class="full">
                <el-col :span="8">
                    <el-form-item label="对象名称" prop="name">
                        <el-input v-model="vo.name" autocomplete="off" maxlength="30" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="类名称" prop="clazzName">
                        <el-input v-model="vo.clazzName" autocomplete="off" maxlength="30" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="表名称" prop="tableName">
                        <el-input v-model="vo.tableName" autocomplete="off" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="包路径" prop="packageName">
                        <el-input v-model="vo.packageName" autocomplete="on" maxlength="100" show-word-limit>
                            <template slot="prepend">com.kttsoft.api.</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="访问路径" prop="mappingPath">
                        <el-input v-model="vo.mappingPath" autocomplete="off" maxlength="100" show-word-limit>
                            <template slot="prepend">/api/</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="full">
                <el-col :span="24">
                    <el-button icon="el-icon-plus" @click="addColumn()" plain></el-button>
                </el-col>
                <el-col :span="24">
                    <el-table :data="vo.columns" height="360" border style="width: 100%">
                        <el-table-column prop="sort" label="序号" width="50" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="字段名称" width="180" align="center">
                        </el-table-column>
                        <el-table-column prop="fieldName" label="类属性名" width="180" align="center">
                        </el-table-column>
                        <el-table-column label="字段类型" width="80" align="center">
                            <template slot-scope="{row}">
                                <span v-if="row.columnType == 'bigint'">长整数</span>
                                <span v-if="row.columnType == 'int'">整数</span>
                                <span v-if="row.columnType == 'numeric'">小数</span>
                                <span v-if="row.columnType == 'varchar'">字符</span>
                                <span v-if="row.columnType == 'datetime'">日期</span>
                                <span v-if="row.columnType == 'text'">大文本</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="特性" align="center">
                            <template slot-scope="{row}">
                                <el-tag type="info" v-if="row.commonType == 'text'" >文本框</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'textarea'" >文本域</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'number'" >数字</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'datetime'" >日期</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'select'" >下拉框</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'multiselect'" >多选</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'onoff'" >开关</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'hidden'" >隐藏域</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'file'" >文件</el-tag>
                                <el-tag type="info" v-if="row.commonType == 'img'" >图片</el-tag>
                                <el-tag type="primary" v-if="row.notNull == 1" >必填</el-tag>
                                <el-tag type="success" v-if="row.showList == 1" >列表</el-tag>
                                <el-tag type="warning" v-if="row.searchType == 'FULL'" >精确</el-tag>
                                <el-tag type="warning" v-if="row.searchType == 'LIKE'" >模糊</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="{row}">
                                <el-link type="primary" @click="editColumn(row)" icon="el-icon-edit" :underline="false">编辑</el-link>
                                <el-divider direction="vertical"></el-divider>
                                <el-link type="primary" @click="removeColumn(row)" icon="el-icon-delete" :underline="false">删除</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>

    import colForm from "./column_form";

    export default {
        props: {
            id: String
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
            return {
                vo: {},
                formLoading: false,
                rules: {
                    name: [
                        { required: true, message: "实体名称不能为空", trigger: "blur" }
                    ],
                    clazzName: [
                        { required: true, message: "类名不能为空", trigger: "blur" }
                    ],
                    tableName: [
                        { required: true, message: "表名不能为空", trigger: "blur" },
                        { validator: validateSqlKey, trigger: 'blur' }
                    ],
                    packageName: [
                        { required: true, message: "包路径不能为空", trigger: "blur" }
                    ],
                    mappingPath: [
                        { required: true, message: "访问路径不能为空", trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        if(this.vo.columns && this.vo.columns.length > 0){
                            for(let i in this.vo.columns){
                                this.vo.columns[i].id = '';
                            }
                        }
                        Ajax.put("/common/as/entity/save", this.vo,"json").then(
                            res => {
                                this.$message.success("保存成功");
                                done();
                            }
                        );
                    } else {
                        fail();
                    }
                });
            },
            addColumn(){
                this.editColumn({});
            },
            editColumn(row){
                this.$open({
                    title: "编辑字段",
                    component: colForm,
                    width: "900px",
                    props: {
                        vo: {...row}
                    },
                    confirm: (col) => {
                        if(this.vo.columns && this.vo.columns.length>0){
                            for(let i in this.vo.columns) {
                                if((this.vo.columns[i].id && this.vo.columns[i].id!='' && this.vo.columns[i].id === col.id ) ||
                                    (this.vo.columns[i].name === col.name)){
                                    this.vo.columns.splice(i,1,col);
                                    return;
                                }
                            }
                        }
                        this.vo.columns.push(col);
                        //同步状态
                    }
                });
            },
            removeColumn(row){
                this.vo.columns.splice(this.vo.columns.indexOf(row), 1);
            }
        },
        created() {
            if(this.id && this.id != ''){
                this.formLoading = true;
                Ajax.get("/common/as/entity/get", {
                    id: this.id
                }).then(res => {
                    this.vo = res.data;
                    this.formLoading = false;
                });
            }else{
                this.vo = {
                    columns:[]
                };
            }
        }
    };
</script>

<style lang='scss' scoped>

</style>
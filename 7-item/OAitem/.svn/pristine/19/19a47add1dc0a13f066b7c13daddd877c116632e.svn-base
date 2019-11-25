<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-row class="full">
            <el-col :span="12">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="vo.name" autocomplete="off" maxlength="30" show-word-limit></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="表字段" prop="columnName">
                    <el-input v-model="vo.columnName" autocomplete="off" maxlength="30" show-word-limit></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="字段类型" prop="dataType">
                    <el-select v-model="vo.dataType" placeholder="请选择">
                        <el-option v-for="item in dataType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="字段长度" prop="len">
                    <el-input-number v-model="vo.len" :min="1" :max="1000"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="字段精度">
                    <el-input-number v-model="vo.decLen" :disabled="vo.dataType!='decimal' " :min="0" :max="8"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="是否必填" style="margin-bottom: 19px;">
                    <el-switch v-model="vo.notNull" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="是否查询" prop="isSearch" style="margin-bottom: 19px;">
                    <el-switch v-model="vo.isSearch" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="列表显示" style="margin-bottom: 19px;">
                    <el-switch v-model="vo.isHidden" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="默认值">
                    <el-input v-model="vo.defVal" autocomplete="on" maxlength="50" show-word-limit></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="字典编码">
                    <el-input v-model="vo.dicKey" autocomplete="on" maxlength="50" show-word-limit></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="排序号">
                    <el-input-number v-model="vo.sort" :min="0" :max="999"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col v-if="vo.dataType=='bigint' || vo.dataType=='int' || vo.dataType=='decimal' " :span="8">
                <el-form-item label="最小值" prop="minVal">
                    <el-input-number v-model="vo.minVal" :min="-9999" :max="999999999"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col v-if="vo.dataType=='bigint' || vo.dataType=='int' || vo.dataType=='decimal' " :span="8">
                <el-form-item label="最大值" prop="maxVal">
                    <el-input-number v-model="vo.maxVal" :min="0" :max="999999999"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="所属类型">
                    <oa-select v-model="vo.flowType" placeholder="请选择所属分类" code="flowType" :options="[{label:'通用',value:'0'}]"></oa-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        props: {
            id: String,
            flowType: String
        },
        data() {
            return {
                vo: {},
                loading: false,
                rules: {
                    flowType : [
                        { required: true, message: "请选择流程类型", trigger: "blur" }
                        ,{ max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,name : [
                        { required: true, message: "请输入类型名称", trigger: "blur" }
                        ,{ max: 50, message: "长度请小于50", trigger: "blur" }
                    ]
                    ,columnName : [
                        { required: true, message: "请输入表字段", trigger: "blur" }
                        ,{ max: 50, message: "长度请小于50", trigger: "blur" }
                    ]
                    ,dataType : [
                        { required: true, message: "请选择字段类型", trigger: "blur" }
                    ]
                    ,len : [
                        { required: true, message: "请输入字段长度", trigger: "blur" }
                    ]
                }
                ,dataType : [
                    {label:'字符',value:'varchar'},
                    {label:'整数',value:'int'},
                    {label:'长整数',value:'bigint'},
                    {label:'小数',value:'decimal'},
                    {label:'日期',value:'datetime'},
                    {label:'大文本',value:'text'}
                ]
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/common/form/syscolumn/save", this.vo, "json").then(
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
                });
            },
            initForm() {
                if (this.id) {
                    this.loading = true;
                    Ajax.post("/common/form/syscolumn/get", {
                        id: this.id
                    }).then(res => {
                        this.vo = res.data;
                        this.loading = false;
                    });
                } else {
                    this.vo.flowType = this.flowType;
                }
            }
        },
        created() {
            this.initForm();
        }
    };
</script>

<style lang='scss' scoped>
</style>
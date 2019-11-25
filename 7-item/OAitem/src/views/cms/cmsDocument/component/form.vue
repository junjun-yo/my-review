<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="文档标题" prop="docTitle">
            <el-input v-model="vo.docTitle" autocomplete="off"
                      maxlength="100" placeholder="请输入文档标题"></el-input>
        </el-form-item>
        <el-form-item label="文档类型" prop="docType">
            <oa-select v-model="vo.docType" placeholder="请选择文档类型" :options="optDocType"/>
        </el-form-item>
        <el-form-item label="关键字" prop="docKey">
            <el-input v-model="vo.docKey" autocomplete="off"
                      maxlength="100" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="docCreatedate">
            <oa-date v-model="vo.docCreatedate" />
        </el-form-item>
        <el-form-item label="阅读范围" prop="docReadscope">
            <oa-radio v-model="vo.docReadscope" :options="optDocReadscope"/>
        </el-form-item>
        <el-form-item label="是否置顶" prop="docTop">
            <el-switch v-model="vo.docTop" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="链接地址" prop="docLinkurl" v-if="vo.docType == '2'">
            <el-input v-model="vo.docLinkurl" autocomplete="off"
                      maxlength="1000" placeholder="请输入链接地址"></el-input>
        </el-form-item>
        <el-form-item label="文档内容" prop="docContent" v-if="vo.docType != '2'">
            <el-input type="textarea" :rows="5" placeholder="请输入文档内容"
                      v-model="vo.docContent" autocomplete="off"
                      maxlength="100" ></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import editor from "../../../../components/Ueditor";
    export default {
        props: {
            id: String,
            docCataid: String
        },
        data() {
            var validateLinkurl = (rule, value, callback) => {
                //当前栏目需要控制起草，则必需选择起草的角色
                if (this.vo.docType == '2' && (value == '' || value == null)) {
                    callback(new Error('请输入链接地址'));
                }
                else {
                    callback();
                }
            };
            return {
                vo: {},
                loading: false,
                rules: {
                    docTitle : [
                        { required: true, message: "请输入文档标题", trigger: "blur" }
                        ,{ max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                    ,docType : [
                        { required: true, message: "请选择文档类型", trigger: "blur" }
                    ]
                    ,docKey : [
                        { max: 100, message: "关键字长度请小于100", trigger: "blur" }
                    ]
                    ,docCreatedate : [
                        { required: true, message: "请输入发布时间", trigger: "blur" }
                    ]
                    ,docReadscope : [
                        { required: true, message: "请选择阅读范围", trigger: "blur" }
                    ]
                    ,docTop : [
                        { required: true, message: "请选择是否置顶", trigger: "blur" }
                    ]
                    ,docLinkurl : [
                        { validator: validateLinkurl, message: "请输入链接地址", trigger: "blur" },
                        { message: "请输入有效的链接地址", pattern: /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, trigger: "blur" }
                    ]
                    ,docContent : [
                    ]
                }
                ,optDocReadscope: [{label: "全体人员", value: "1"},{label: "单位内", value: "2"},{label: "部门内", value: "3"}]
                ,optDocType : [{"value":"1","label":"普通类型"},{"value":"2","label":"链接类型"},{"value":"3","label":"图片类型"}]
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/cms/document/save", this.vo, "json").then(
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
                    Ajax.get("/cms/document/get", {
                        id: this.id
                    }).then(res => {
                        this.vo = res.data;
                        this.loading = false;
                    });
                }
                else {
                    this.vo = { docCataid: this.docCataid,docCreatedate: this.$options.filters["date"](new Date(), "yyyy-MM-dd"), docReadscope: "1", docType: "1"  };
                    console.log(this.vo);
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
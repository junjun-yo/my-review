<template>
    <el-form :model="vo" ref="voForm" :rules="rules" v-loading="loading" label-width="120px">
        <el-form-item label="名称" prop="name">
            <el-input v-model="vo.name" autocomplete="off"
                      maxlength="30" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="称呼" prop="salutation">
            <el-input v-model="vo.salutation" autocomplete="off"
                      maxlength="30" placeholder="请输入称呼"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="untiName">
            <el-input v-model="vo.untiName" autocomplete="off"
                      maxlength="100" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="vo.deptName" autocomplete="off"
                      maxlength="30" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="个人手机电话" prop="personPhone">
            <el-input v-model="vo.personPhone" autocomplete="off"
                      maxlength="11" placeholder="请输入个人手机电话"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
            <el-input v-model="vo.phone" autocomplete="off"
                      maxlength="11" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" prop="telephone">
            <el-input v-model="vo.telephone" autocomplete="off"
                      maxlength="11" placeholder="请输入办公电话"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱" prop="personMail">
            <el-input v-model="vo.personMail" autocomplete="off"
                      maxlength="20" placeholder="请输入个人邮箱"></el-input>
        </el-form-item>
        <el-form-item label="商务邮件" prop="businessMail">
            <el-input v-model="vo.businessMail" autocomplete="off"
                      maxlength="20" placeholder="请输入商务邮件"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
            <el-input v-model="vo.fax" autocomplete="off"
                      maxlength="20" placeholder="请输入传真"></el-input>
        </el-form-item>
        <el-form-item label="其它电话" prop="otherPhone">
            <el-input v-model="vo.otherPhone" autocomplete="off"
                      maxlength="11" placeholder="请输入其它电话"></el-input>
        </el-form-item>
        <el-form-item label="其他邮件" prop="otherMail">
            <el-input v-model="vo.otherMail" autocomplete="off"
                      maxlength="20" placeholder="请输入其他邮件"></el-input>
        </el-form-item>
        <el-form-item label="商务地址" prop="businessAddress">
            <el-input v-model="vo.businessAddress" autocomplete="off"
                      maxlength="50" placeholder="请输入商务地址"></el-input>
        </el-form-item>
        <el-form-item label="商务邮编" prop="businessPostcode">
            <el-input v-model="vo.businessPostcode" autocomplete="off"
                      maxlength="10" placeholder="请输入商务邮编"></el-input>
        </el-form-item>
        <el-form-item label="个人邮编" prop="personPostcode">
            <el-input v-model="vo.personPostcode" autocomplete="off"
                      maxlength="10" placeholder="请输入个人邮编"></el-input>
        </el-form-item>
        <el-form-item label="个人地址" prop="personAddress">
            <el-input v-model="vo.personAddress" autocomplete="off"
                      maxlength="40" placeholder="请输入个人地址"></el-input>
        </el-form-item>
        <el-form-item label="公司网站" prop="companyWeb">
            <el-input v-model="vo.companyWeb" autocomplete="off"
                      maxlength="20" placeholder="请输入公司网站"></el-input>
        </el-form-item>
        <el-form-item label="个人网站" prop="personWeb">
            <el-input v-model="vo.personWeb" autocomplete="off"
                      maxlength="20" placeholder="请输入个人网站"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
            <oa-date v-model="vo.birthday" />
        </el-form-item>
        <el-form-item label="创建人" prop="creatorId">
            <el-input v-model="vo.creatorId" autocomplete="off"
                      maxlength="32" placeholder="请输入创建人"></el-input>
        </el-form-item>
        <el-form-item label="首字母拼音" prop="firstLetter">
            <el-input v-model="vo.firstLetter" autocomplete="off"
                      maxlength="2" placeholder="请输入首字母拼音"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
            <el-input v-model="vo.note" autocomplete="off"
                      maxlength="100" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="区分公共和个人" prop="addressType">
            <oa-select v-model="vo.addressType" placeholder="请选择区分公共和个人" :options="optAddressType" code="address" clearable/>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        props: {
            id: String
        },
        data() {
            return {
                vo: {},
                loading: false,
                rules: {
                    name : [
                        { required: true, message: "请输入名称", trigger: "blur" }
                        ,{ max: 30, message: "长度请小于30", trigger: "blur" }
                    ]
                    ,salutation : [
                        { max: 30, message: "长度请小于30", trigger: "blur" }
                    ]
                    ,untiName : [
                        { max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                    ,deptName : [
                        { max: 30, message: "长度请小于30", trigger: "blur" }
                    ]
                    ,personPhone : [
                        { max: 11, message: "长度请小于11", trigger: "blur" }
                    ]
                    ,phone : [
                        { max: 11, message: "长度请小于11", trigger: "blur" }
                    ]
                    ,telephone : [
                        { required: true, message: "请输入办公电话", trigger: "blur" }
                        ,{ max: 11, message: "长度请小于11", trigger: "blur" }
                    ]
                    ,personMail : [
                        { max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,businessMail : [
                        { max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,fax : [
                        { max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,otherPhone : [
                        { max: 11, message: "长度请小于11", trigger: "blur" }
                    ]
                    ,otherMail : [
                        { max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,businessAddress : [
                        { max: 50, message: "长度请小于50", trigger: "blur" }
                    ]
                    ,businessPostcode : [
                        { max: 10, message: "长度请小于10", trigger: "blur" }
                    ]
                    ,personPostcode : [
                        { max: 10, message: "长度请小于10", trigger: "blur" }
                    ]
                    ,personAddress : [
                        { max: 40, message: "长度请小于40", trigger: "blur" }
                    ]
                    ,companyWeb : [
                        { max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,personWeb : [
                        { max: 20, message: "长度请小于20", trigger: "blur" }
                    ]
                    ,birthday : [
                    ]
                    ,creatorId : [
                        { max: 32, message: "长度请小于32", trigger: "blur" }
                    ]
                    ,firstLetter : [
                        { max: 2, message: "长度请小于2", trigger: "blur" }
                    ]
                    ,note : [
                        { max: 100, message: "长度请小于100", trigger: "blur" }
                    ]
                    ,addressType : [
                        { required: false, message: "请输入区分公共和个人", trigger: "blur" }
                    ]
                }
                ,optAddressType : []
            };
        },
        methods: {
            confirm(done, fail) {
                this.$refs.voForm.validate(valid => {
                    if (valid) {
                        Ajax.put("/addressBook/save", this.vo, "json").then(
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
                    Ajax.get("/addressBook/get", {
                        id: this.id
                    }).then(res => {
                        this.vo = res.data;
                        this.loading = false;
                    });
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
export default {
    data() {
        return {
            rules: {
                sysAccount: {
                    userName: [
                        { required: true, message: "请输入姓名", trigger: "blur" }
                    ],
                    account: [
                        { required: true, message: "请输入账号", trigger: "blur" },
                        {
                            validator: (rule, value, callback) => {
                                // if (this.mode == 'edit') {
                                //     callback();
                                //     return
                                // }
                                if (value != undefined || value != "") {
                                    //新增时直接在数据库中判断重复，编辑时需要在数据库中排除掉当前的编码再判断重复
                                    Ajax.post("/system/sysUser/checkAccountUnique", {
                                        accountId: this.user.sysAccount.accountId,
                                        account: this.user.sysAccount.account
                                    }).then(res => {
                                        if (res.success) {
                                            callback();
                                        } else {
                                            callback(new Error("账号已存在"));
                                        }
                                    });
                                } else {
                                    callback();
                                }
                            },
                            trigger: "blur"
                        }
                    ],
                    mobilephone: [
                        { required: true, message: "请输入手机号", trigger: "blur" },
                        {
                            message: "请输入正确的手机号码",
                            pattern: /^1\d{10}$/,
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (value != undefined || value != "") {
                                    //新增时直接在数据库中判断重复，编辑时需要在数据库中排除掉当前的编码再判断重复
                                    Ajax.post("/system/sysUser/checkMobilephoneUnique", {
                                        accountId: this.user.sysAccount.accountId,
                                        account: this.user.sysAccount.mobilephone
                                    }).then(res => {
                                        if (res.success) {
                                            callback();
                                        } else {
                                            callback(new Error("手机号已存在"));
                                        }
                                    });
                                } else {
                                    callback();
                                }
                            },
                            trigger: "blur"
                        }
                    ],
                    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
                    mobilephoneShow: [
                        {
                            required: true,
                            message: "请选择是否显示手机号",
                            trigger: "change"
                        }
                    ],
                    email: [
                        {
                            message: "请输入正确的邮箱地址",
                            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                            trigger: "blur"
                        }
                    ]
                },
                sysUser: {
                    sortNo: [{ required: true, message: "请输入排序码", trigger: "blur" }]
                }
            }
        }
    }
}
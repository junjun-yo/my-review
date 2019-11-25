export default {
    data() {
        return {
            formRules: {
                groupName: [
                    { required: true, message: '请输入人员组名称', trigger: 'blur' },
                ],
            }
        }
    }
}
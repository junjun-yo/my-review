<template>
    <oa-table
            :ajax="ajaxParams"
            :columns="columns"
            showCheck
            @check="onCheck"
            ref="table"
              >
    </oa-table>
</template>

<script>
    export default {
        props:{
            creatorId:String
        },
        data(){
            return {
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/maildir/dirNameList",
                    method: "post",
                    params: {
                        creatorId: this.creatorId
                    }
                },
                //列头属性配置
                columns: [
                    {
                        label: "文件名称",
                        prop: "dirName",
                        align: "center",
                        width: "",
                        fmt(row){
                            return row.dirName;
                        }
                    }
                ],
                checks:[],
                params:[]
            }
        },
        methods:{
            onCheck(checks) {
                this.checks=checks;
            },
            confirm(done, fail) {
                for(let i = 0;i<this.checks.length;i++){
                    this.params.push({
                        creatorId: this.creatorId,
                        dirName:this.checks[i].dirName
                    })
                }
                //删除文件夹
                //查询文件夹内所有的文件
                Ajax.post("/mailbox/dirMailList",{
                    creatorId: this.creatorId,
                    dirName: this.checks[0].dirName
                }).then(res =>{
                    // for(let i=0;i<res.data.length;i++){
                    //     res.data[i].fileSaveType = "5";
                    // }
                    Ajax.delete("/maildir/deleteDirByName",
                        {
                            creatorId: this.creatorId,
                            dirName:this.checks[0].dirName
                        }
                       /* this.params*/,"json"
                        ).then(
                        res => {
                            if (res.success) {
                                this.$message.success("操作成功");
                                done();
                            }
                        },
                        err => {
                            fail();
                        }
                    );

                    // Ajax.put("/mailbox/setFileSaveType",res.data,"json").then(()=>{
                    //     Ajax.delete("/maildir/deleteDirByName",{dirName:this.checks[0].dirName}).then(
                    //         res => {
                    //             if (res.success) {
                    //                 this.$message.success("操作成功");
                    //                 done();
                    //             }
                    //         },
                    //         err => {
                    //             fail();
                    //         }
                    //     );
                    // })
                });
            }
        }
    }
</script>

<style scoped>

</style>
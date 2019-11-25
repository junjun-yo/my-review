<template>
    <div>
        <div style="margin:20px auto 10px 10px">
            <el-button type="primary" @click="deleteMail">删除</el-button>

            <el-dropdown style="margin-left: 10px">

                <el-button type="primary">
                    标记为<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="setFlagStar(1)">星标</el-dropdown-item>
                    <el-dropdown-item @click.native="setFlagStar(0)">取消星标</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown style="margin-left: 10px">
                <el-button type="primary">
                    移动到<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="dir in dirList" @click.native="moveTo(dir)">{{dir.dirName}}</el-dropdown-item>
                    <el-dropdown-item @click.native="NewAndMove">新建并移动</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown style="margin-left: 10px">
                <el-button type="primary">
                    导出<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="downloadAll">全部</el-dropdown-item>
                    <el-dropdown-item @click.native="downloadExcel">指定数据</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
            <oa-table :ajax="ajaxParams" :columns="columns"  showCheck showPage
                      @check="onCheck"  ref="table"
                      :sort="['createDate']">
                <template slot-scope="{queryForm}" slot="more">
                </template>

                <template slot-scope="{row,col}" slot="render">
                    <div v-if="col.prop=='title'">
                        <el-link v-if="row.title!=''||row.title!=undefined" @click="openMail(row)">{{row.title}}</el-link>
                    </div>
                    <div v-if="col.prop=='fileType'">
                        <li v-if="row.fileType==1"
                            @click="openMail(row)"
                            class="el-icon-message"
                            style="font-size: 25px;color:#F7BA2A;cursor: pointer;"
                        ></li>
                        <li v-if="row.fileType==0"
                            @click="openMail(row)"
                            class="el-icon-message"
                            style="font-size:25px;color:#F7BA2A;cursor: pointer;"
                        ></li>
                    </div>
                    <div v-if="col.prop=='star'">
                        <i  v-if="row.star=='1'"
                            @click="setFlagStarRow(row)"
                            class="el-icon-star-on"
                            style="font-size:25px;color:#F7BA2A"
                        ></i>
                        <i  v-if="row.star=='0'"
                            @click="setFlagStarRow(row)"
                            class="el-icon-star-off"
                            style="font-size:20px;"
                        ></i>
                    </div>
                </template>

            </oa-table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //表格异步请求数据参数
                ajaxParams: {
                    url: "/mailbox/sentList",
                    method: "post",
                    params: {
                        senderId:this.$store.state.account.sysUser.userId
                    }
                },
                //列头属性配置
                columns: [
                    {
                        label: "文件状态",
                        prop: "fileType",
                        align: "center",
                        width: "",
                        render:true
                    },
                    {
                        label: "文件标题",
                        prop: "title",
                        align: "center",
                        width: "",
                        render:true
                    },
                    {
                        label: "发送者",
                        prop: "username",
                        align: "center",
                        width: "",
                        fmt(row){
                            return row.username;
                        }
                    },
                    {
                        label: "接收者",
                        prop: "receiverName",
                        align: "center",
                        width: "",
                        fmt(row){
                            return row.receiverName;
                        }
                    },
                    {
                        label: "时间",
                        prop: "createDate",
                        align: "center",
                        width: "",
                        fmt: row => {
                            return this.$options.filters["date"](row.createDate, "yyyy-MM-dd");
                        }
                    },
                    {
                        label: "星标",
                        prop: "star",
                        align: "center",
                        width: "",
                        render:true
                    }
                ],
                checks:[],
                dirList:[],
                params:[]
            }
        },
        methods:{
            onCheck(checks) {
                this.checks=checks;
                console.log(this.checks);
            },
            openMail(row){
                this.$router.push({path:'/mailbox/open_mail',query:{mail:row}});
                row.fileType = "1";
                Ajax.put("/mailbox/setFileType",
                    [row]
                    ,"json").then(res => {
                    this.$refs.table.reload();
                });
            },
            deleteMail() {
                this.$confirm("是否删除?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    for(let i=0;i<this.checks.length;i++){
                        this.checks[i].mailLocation = "4";
                    }
                    Ajax.put("/mailbox/updateMailInfo",this.checks,"json").then(() =>{
                        this.$message.success("删除成功");
                        this.$refs.table.reload();
                    });
                });
            },
            //设置星标
            setFlagStar(data){
                for(let i=0;i<this.checks.length;i++){
                    this.checks[i].star = data;
                }
                Ajax.put("/mailbox/updateMailInfo",this.checks,"json").
                then(()=>{
                    this.$refs.table.reload();
                });
            },
            setFlagStarRow(row){
                 row.star = (row.star == "1")?"0":"1";
                Ajax.put("/mailbox/updateMailInfo",[row],"json").
                then(()=>{
                    // this.$refs.table.reload();
                });
            },
            NewAndMove(){
                this.$prompt('请输入文件夹名称','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消'
                }).then((value)=>{
                    for(let i=0;i<this.checks.length;i++){
                        this.checks[i].myDir = value.value;
                    }
                    Ajax.put("/mailbox/updateMailInfo",this.checks,"json").then(()=>{
                    for(let i=0;i<this.checks.length;i++){//保存到文件夹
                        this.params[0]={
                            dirName:value.value,
                            creatorId:this.$store.state.account.sysUser.userId,
                            mailId:this.checks[i].id,
                            mailReceiverId:""
                        };
                    }
                    Ajax.put("/maildir/saveDirs",this.params,"json").then(()=>{
                        this.$message({
                            message:"成功!!!",
                            type:"success"
                        });
                        this.$refs.table.reload();
                    });
                    });
                });
            },
            moveTo(dir){
                for(let i=0;i<this.checks.length;i++){
                    // this.checks[i].sendType = "2";
                    // this.checks[i].fileSaveType = dir.dirName;
                    this.checks[i].myDir = dir.dirName;
                }
                //对获得的id进行处理
                Ajax.put("/mailbox/updateMailInfo",this.checks,"json").then(()=>{


                for(let i=0;i<this.checks.length;i++){//保存到文件夹
                         this.params[0]={
                             dirName:dir.dirName,
                             creatorId:this.$store.state.account.sysUser.userId,
                             mailId:this.checks[i].id,
                             mailReceiverId:""
                         };
                }
                Ajax.put("/maildir/saveDirs",this.params,"json").then(()=>{
                    this.$message({
                        message:"成功!!!",
                        type:"success"
                    });
                    this.$refs.table.reload();
                    });
                });
            },
            downloadAll(){
                Ajax.get("/mailbox/sentList",{
                    sendType:"1",
                    senderId:this.$store.state.account.sysUser.userId
                },"json").then(res =>{
                    Ajax.put("/mailbox/downloadExcel",res.data,"json").then(()=>{
                        this.$message({
                            message:"成功",
                            type:"success"
                        });
                        this.$refs.table.reload();
                    });
                });
            },
            downloadExcel(){
                Ajax.put("/mailbox/downloadExcel",this.checks,"json").then(()=>{
                    this.$message({
                        message:"成功",
                        type:"success"
                    });
                    this.$refs.table.reload();
                });
            }
        },
        created() {
            Ajax.post("/maildir/dirNameList",{creatorId:this.$store.state.account.sysUser.userId}).then(res =>{
                this.dirList = res.data
            })
        }
    }
</script>

<style scoped>
    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>

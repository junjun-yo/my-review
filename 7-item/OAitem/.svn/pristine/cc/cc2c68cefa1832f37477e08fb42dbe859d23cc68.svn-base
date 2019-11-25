<template>
    <div style="margin-bottom: 20px;margin-left: 10px; margin-top: 20px">
        <el-button type="primary" style="margin-left: 10px" @click="changeModel">回复</el-button>
        <el-button type="primary" style="margin-left: 10px" @click="back">返回</el-button>
        <el-divider></el-divider>
        <div>
            <div>
                <div>
                     <h4>{{title}}
                             <span  v-if="flagStar=='1'"
                                 class="el-icon-star-on"
                                 style="font-size:25px;color:#F7BA2A"
                             ></span>
                             <span  v-if="flagStar=='0'"
                                 class="el-icon-star-off"
                                 style="font-size:20px;color:#58666e"
                             ></span>
                     </h4>
                </div>
                <div style="margin-top: 10px">
                    发件人:<span style="margin-left: 10px">{{username}}</span>
                </div>
                <div style="margin-top: 10px">
                    时&nbsp;间:<span style="margin-left: 10px">{{createDate}}</span>
                </div>
            </div>
        <el-divider></el-divider>
           <div>
               <p style="margin-left: 20px;margin-right: 20px" v-html="content">{{content}}</p>
           </div>
            <el-divider></el-divider>
            <el-button type="primary" @click="back()">取消</el-button>
            <el-button type="primary" @click="" style="margin-left: 10px;" @click="changeModel">切换到完整模式</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title:"",
                username:"",
                createDate:"",
                content:"",
                flagStar:""
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            },
            changeModel(){
                let mail = this.$route.query.mail;
                this.$router.push({path:'/mailbox/open_mail/complete',query:{mail:mail}});
            },
        },
        created() {
            let mail = this.$route.query.mail;
            this.title = mail.title;
            this.username = mail.username;
            this.createDate = this.$options.filters["date"](mail.createDate, "yyyy-MM-dd")
            this.content = mail.content;
            this.flagStar = mail.flagStar;
        }
    }
</script>

<style scoped>

</style>
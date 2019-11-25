<template>
    <div style="margin: 30px">
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="primary" @click="sent">已送</el-button>
    </div>
</template>

<script>
    export default {
        methods:{
            back(){
                this.$router.go(-1);
            },
            sent(){
                this.$router.push({path:'/mailBox/sent_mail'});
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <script id="ue" type="text/plain"></script>
</template>

<script>
    export default {
        // name: "UE",
        props:{
            defaultMsg:{
                type:String
            },
            config:{
                type:Object
            }
        },
        data(){
            return{
                editor:null
            }
        },
        methods:{
            getContentHtml(){
                return this.editor.getContent();
            },
            getContentTxt(){
                return this.editor.getContentTxt();
            }
        },
        mounted() {
           this.$nextTick(()=>{
                this.editor=UE.getEditor("ue",this.config);
            });
          //  const  _this=this;
          //   this.editor=UE.getEditor("ue",this.config);
          /*  this.editor.addListener("ready",function(){
                _this.editor.setContent(_this.defaultMsg);
            })*/
          console.log("加载ueditor组件.....")
        },
        beforeDestroy() {
            this.editor.destroy();
            console.log("销毁ueditor组件...")
        }

    }
</script>

<style scoped>

</style>
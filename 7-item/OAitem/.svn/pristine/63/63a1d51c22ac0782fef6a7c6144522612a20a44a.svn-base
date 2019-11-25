<template>
    <div>
        <el-row>
            <el-col :span="24" style="height:400px;">
                <transfer v-model="chooses"
                             :data="data"
                             :height="400"
                             :allowCheckCount="allowCheckCount"
                             :titles="['角色列表','已选择']"
                             :props="transferProp">
                </transfer>
            </el-col>
            <el-col :span="24">{{allowCheckCount}}</el-col>
        </el-row>
    </div>
</template>

<script>
    import store from "@/store";
    import transfer from "@/components/Transfer";
    export default {
        props: {
            allowCheckCount: Number,
            defaultCheck: [String, Array]
        },
        components: {
            transfer
        },
        watch: {
        },
        data() {
            return {
                store,
                transferProp: {
                    key: "id",
                    label: "name"
                },
                data: [],
                value: [],
                chooses: []
            };
        },
        methods: {
            confirm(done, fail) {
                const data = this.chooses.map(item => {
                    return {
                        key: item.key,
                        label: item.label
                    };
                });
                done(data);
            },
            loadRole(){
                Ajax.post("/system/addressBook/selectUserTreeList", {
                    showType: "2"
                }).then(res => {
                    this.data = res.data;
                });
            },
            async transform() {
                if(this.defaultCheck){
                    if(this.defaultCheck.constructor == String){
                        let ids = this.defaultCheck;
                        const res = await Ajax.post("/common/cacheData/searchNameForRole", {
                            id: ids
                        });
                        let keys = ids.split(",");
                        let labels = res.data.split(",");
                        this.chooses = [];
                        for(let i in keys){
                            this.chooses.push({key:keys[i],label:labels[i]});
                        }
                    }else{
                        this.chooses = this.defaultCheck;
                    }
                }
            }
        },
        created() {
            this.loadRole();
            this.transform();
        }
    };
</script>

<style lang='scss' scoped>

</style>
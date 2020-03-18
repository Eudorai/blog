<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
<!--                    <wbc-sharelist></wbc-sharelist>-->
                </el-col>
                <el-col :sm="24"  :md="8" >
                    <RightList></RightList>
                </el-col>
            </el-row>
        </div>
        
    </div>
</template>

<script>
    import Header from '../components/Header'
    import RightList from '../components/RightList'

    export default {
        name: "Home",
        components:{
            Header, RightList
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>

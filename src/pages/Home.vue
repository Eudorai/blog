<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-row :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <ShareList></ShareList>
                </el-col>
                <el-col :sm="24" :md="8">
                    <RightList></RightList>
                </el-col>
            </el-row>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import ShareList from '../components/ShareList'
    import RightList from '../components/RightList'
    import Footer from '../components/Footer'

    export default {
        name: "Home",
        components: {
            Header, ShareList, RightList, Footer
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>

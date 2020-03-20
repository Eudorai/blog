<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-row :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <ShareDetail></ShareDetail>
                    <ShareComment></ShareComment>
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
    import RightList from '../components/RightList'
    import ShareDetail from '../components/ShareDetail'
    import ShareComment from '../components/ShareComment'
    import Header from '../components/Header'
    import Footer from '../components/Footer'

    export default {
        name: "ArticleDetail",
        components: {
            RightList, ShareDetail, ShareComment, Header, Footer
        }
    }
</script>

<style scoped>

</style>

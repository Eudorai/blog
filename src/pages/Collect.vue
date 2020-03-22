<template>
    <div>
        <Header></Header>

        <CollectList></CollectList>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import CollectList from '../components/CollectList'
    import Footer from '../components/Footer'

    export default {
        name: "Collect",
        components: {
            Header, CollectList, Footer
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
        <Header></Header>

        <div class="container">
            <el-row :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <!-- 赞赏 -->
                    <div class="tRewardBox tcommonBox">
                        <header>
                            <h1>赞赏</h1>
                        </header>
                        <section>
                            <div class="">
                                <img src="../assets/img/reward.png" alt="" class="maxW">
                            </div>
                            <h1>@赞赏说明：</h1>
                            <p>
                                若无特殊说明，赞赏之款项用于给我补充大脑（*/∇＼*）
                            </p>
                            <p>如果我给你带来过欢乐，或者对你有所帮助，欢迎赞赏支持:)</p>
                            <hr>
                            <h1>@赞赏方式：</h1>
                            <el-row :gutter="30">
                                <el-col :span="12" class="donate-item">
                                    <div class="donate-tip">
                                        <img src="../assets/img/pay01.jpeg">
                                        <span>微信扫一扫，向我赞赏</span>
                                    </div>
                                </el-col>
                                <el-col :span="12" class="donate-item">
                                    <div class="donate-tip">
                                        <img src="../assets/img/pay02.jpeg" style="height: 152px">
                                        <span>支付宝扫一扫，向我赞赏</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </section>
                    </div>
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
    import Footer from '../components/Footer'
    import RightList from '../components/RightList'

    export default {
        name: "Reward",
        components: {
            Header, RightList, Footer
        }
    }
</script>

<style scoped>
    .tRewardBox section {
        padding-bottom: 20px;
    }

    .tRewardBox section h1 {
        margin: 10px 0;
        font-size: 25px;
        font-weight: 700;
        /*text-align: center;*/
        line-height: 30px;
    }

    .tRewardBox section p {
        margin: 10px 0;
        line-height: 24px;
    }

    .tRewardBox section hr {
        background: #ccc;
        margin-bottom: 30px;
    }

    .tRewardBox .donate-item {
        text-align: right;
        color: #44b549;

    }

    .tRewardBox .donate-item:last-child {
        text-align: left;
        color: #00a0e9;
    }

    .tRewardBox .donate-item img {
        width: 100%;
        display: block;
        height: auto;
    }

    .tRewardBox .donate-item div {
        display: inline-block;
        width: 150px;
        padding: 0 6px;
        text-align: center;
        box-sizing: border-box;
    }

    .tRewardBox .donate-item div span {
        display: inline-block;
        width: 100%;
        margin: 10px 0;
        text-align: center;
    }

</style>

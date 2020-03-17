<template>
    <div class="right-list">
        <section>
            <div class="r1-head">
                <img src="../assets/img/avatar02.jpg" alt="">
                <h1>
                    <span>女王</span>Eudora
                </h1>
            </div>
            <div class="r1-body">
                <p>有问题联系我？</p>
                <div class="catch-me">
                    <div class="">
                        <el-tooltip class="item" content="Github" placement="top">
                            <a :href="catchMeObj.git" target="_blank"><i class="fa fa-fw fa-github"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="QQ" placement="top">
                            <a :href="catchMeObj.qq" target="_blank"><i class="fa fa-fw fa-qq"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="微信" placement="top">
                            <a :href="catchMeObj.wechat" target="_blank"><i class="fa fa-fw fa-wechat"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="更多" placement="top">
                            <a href="/about"><i class="el-icon-more"></i></a>
                        </el-tooltip>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "RightList",
        data() {
            return {
                catchMeObj: { //个人信息
                    git: 'https://github.com/Eudorai',
                    qq: '../assets/img/qq.jpg',
                    wechat: '../assets/img/wechat.jpeg',
                },
            }
        }
    }
</script>

<style scoped>
    .right-list {
        position: relative;
    }

    .right-list section {
        transition: all 0.2s linear;
        position: relative;
        background: #fff;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
    }

    .right-list section:hover {
        transform: translate(0, -2px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    }

    .right-list .r1-head {
        text-align: center;
        border-radius: 4px 4px 0 0;
        position: relative;
        /*box-shadow: inset 0 -70px 100px -50px rgba(0,0,0,.5);*/
    }

    .right-list .r1-head img {
        width: 100%;
        min-height: 100px;
    }

    .right-list .r1-head h1 {
        position: absolute;
        bottom: 5px;
        margin: 0 0 0 -65px;
        font-size: 20px;
        letter-spacing: 0.5px;
        color: #fff;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, .7);
        font-weight: 700;
        width: 130px;
        left: 50%;
    }

    .right-list .r1-head h1 span {
        opacity: 0.5;
    }


    .right-list .r1-body p {
        font-size: 14px;
        margin: 5px 0 8px 0;
        font-weight: 700;
        text-align: center;
    }

    .right-list .r1-body .catch-me {
        text-align: center;
    }

    .right-list .r1-body .catch-me a {
        display: inline-block;
        margin-bottom: 7px;
        position: relative;
        text-decoration: none;
        outline: none;
    }

    .right-list .r1-body .catch-me a:hover i {
        color: #fff;
        background: #F4692C;
    }

    .right-list .r1-body .catch-me a i {
        display: inline-block;
        font-size: 18px;
        width: 42px;
        height: 42px;
        line-height: 42px;
        border-radius: 42px;
        color: rgba(0, 0, 0, 0.5);
        background: rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        font-style: normal;
        margin: 0 3.2px;
    }


</style>

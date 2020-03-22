<template>
    <!-- 有问题联系我+点赞数 -->
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
                    </div>
                </div>
            </div>
        </section>

        <section class="rs2" @click="loveMeFun">
            <p>
                Do you like me?
            </p>
            <div class="">
                <i :class="loveMe?'heart active':'heart'"></i>
                <span>{{likeNum}}</span>
            </div>
        </section>
    </div>
</template>

<script>
    import {showLikeData,GetLike} from '../utils/server.js'

    export default {
        name: "RightList",
        created(){
            const that = this;
            showLikeData(function(data){
                that.likeNum = data;
            })
        },
        data() {
            return {
                catchMeObj: { //个人信息
                    git: 'https://github.com/Eudorai',
                    qq: 'http://localhost:3000/uploads/qq.jpg',
                    wechat: 'http://localhost:3000/uploads/wechat.jpeg',
                },
                loveMe: false,
                likeNum: 0,//do you like me 点击量
            }
        },
        methods: {
            //do you love me  点击
            loveMeFun: function () {
                const that = this;
                if (!this.loveMe) {
                    GetLike(function () {
                        that.likeNum += 1;
                    });
                }
                this.loveMe = true;
                let timer = setTimeout(function () {
                    that.loveMe = false;
                    clearTimeout(timer);
                }, 3000)
            },
        },
    }
</script>

<style scoped>
    .right-list {
        position: relative;
    }

    /*.right-list section{*/
    /*    top: 24px;*/
    /*    position: sticky;*/
    /*}*/

    .right-list section {
        transition: all 0.2s linear;
        position: relative;
        background: #fff;
        padding: 15px;
        margin-bottom: 24px;
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
        background: #97dffd;
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

    /*************do you like me*******************/
    .right-list .rs2{
        /*padding:10px 0 4px 0;*/
        min-height: 100px;
    }

    .right-list .rs2 p{
        color:#DF2050;
        cursor: pointer;
        font-size: 20px;
        margin-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        margin-top:10px;
        font-weight: 500;
    }
    .right-list .rs2 div{
        color:#DF2050;
        cursor: pointer;
        text-align: center;
        font-size: 40px;
        position: absolute;
        width:100%;
        height:100px;
        line-height: 100px;
        left:0;
        top:30px;
    }

    .right-list .rs2 div i.heart{
        display: inline-block;
        text-align: center;
        width: 100px;
        height: 100px;
        margin-left: -20px;
        margin-top:-5px;
        background: url(../assets/img/heart.png) 0 0 no-repeat;
        cursor: pointer;
        -webkit-transition: background-position 1s steps(28);
        transition: background-position 1s steps(28);
        -webkit-transition-duration: 0s;
        transition-duration: 0s;
        vertical-align: middle;
    }
    .right-list .rs2 div i.heart:hover{
        transform: scale(1.15);
        -webkit-transform: scale(1.15);
    }
    .right-list .rs2 div i.heart.active{
        -webkit-transition-duration: 1s;
        transition-duration: 1s;
        background-position: -2800px 0;
    }
    .right-list .rs2 div span{
        margin-left: -30px;
    }


</style>

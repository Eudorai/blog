<template>
    <div class="detailBox tcommonBox">
        <span class="s-round-date">
            <span class="month" v-html="showInitDate(detailObj.create_time,'month')+'月'"></span>
            <span class="day" v-html="showInitDate(detailObj.create_time,'date')"></span>
        </span>
        <header>
            <h1>{{detailObj.title}}</h1>
            <h2>
                <span class="timeBox">
                    <i class="fa fa-fw fa-user"></i>发表于 <span>{{create_time}}</span>
                </span>
                <i class="fa fa-fw fa-comments"></i>活捉 {{detailObj.comment_count}} 条评论 •
                <span class="rateBox">
                    <i class="fa fa-fw fa-heart"></i>{{likeCount}}点赞
                    <i class="fa fa-fw fa-star"></i>{{collectCount}}收藏
                </span>
            </h2>
        </header>
        <div class="article-content">
            <p v-html="detailObj.content"></p>
        </div>
        <div class="dshareBox bdsharebuttonbox" data-tag="share_1">
            分享到:
            <a href="javascript:void(0);" class="ds-weibo fa fa-fw fa-weibo" data-cmd="tsina"></a>
            <a href="javascript:void(0);" class="ds-qq fa fa-fw fa-qq" data-cmd="tqq"></a>
            <a href="javascript:void(0);" class="ds-wechat fa fa-fw fa-wechat" data-cmd="weixin"></a>
            <div class="dlikeColBox">
                <div class="dlikeBox" @click="likeCollectHandle(0)">
                    <i :class="likeArt?'fa fa-fw fa-heart':'fa fa-fw fa-heart-o'"></i>点赞 | {{likeCount}}
                </div>
                <div class="dcollectBox" @click="likeCollectHandle(1)">
                    <i :class="collectArt?'fa fa-fw fa-star':'fa fa-fw fa-star-o'"></i>收藏 | {{collectCount}}
                </div>
            </div>
        </div>
        <div class="donate">
            <div class="donate-word">
                <span @click="pdonate=!pdonate">赞赏</span>
            </div>
            <el-row :class="pdonate?'donate-body':'donate-body donate-body-show'" :gutter="30">
                <el-col :span="12" class="donate-item">
                    <div class="donate-tip">
                        <img src="../assets/img/pay01.jpeg"/>
                        <span>微信扫一扫，向我赞赏</span>
                    </div>
                </el-col>
                <el-col :span="12" class="donate-item">
                    <div class="donate-tip">
                        <img src="../assets/img/pay02.jpeg"/>
                        <span>支付宝扫一扫，向我赞赏</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {getArticleInfo, getArtLikeCollect, initDate} from '../utils/server.js'

    export default {
        name: "ShareDetail",
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'routeChange'
        },
        created() { //生命周期函数
            this.routeChange();
        },
        data() {
            return {
                aid: '',//文章ID
                detailObj: '',//返回文章详情数据
                likeArt: false,//是否点赞
                likeCount: 400,//点赞数量
                collectCount: 500,//收藏数量
                collectArt: false,//是否收藏
                hasLogin: false,//是否已经登录
                userId: '',//用户id
                userInfo: '',//用户信息
                pdonate: true,//打开赞赏控制,
                create_time:''
            }
        },
        methods: {
            showInitDate: function (date, full) {//年月日的编辑
                // console.log(detailObj.create_time,date,full);
                return initDate(date, full);
            },

            routeChange: function () {
                let that = this;
                that.aid = that.$route.params.id;//获取传参的aid
                //判断用户是否存在
                if (localStorage.getItem('userInfo')) {
                    that.hasLogin = true;
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    that.userId = that.userInfo._id;
                    // console.log(that.userInfo);
                } else {
                    that.hasLogin = false;
                }
                //获取详情接口
                getArticleInfo(that.aid, that.userId, function (msg) {
                    // console.log('文章详情',msg);
                    that.detailObj = msg;
                    that.likeCount = msg.like ? msg.like.length : 0;
                    that.collectCount = msg.collect ? msg.collect.length : 0;
                    that.likeArt = msg.user_like;
                    that.collectArt = msg.user_collect;
                    that.create_time = initDate(that.detailObj.create_time, 'all');
                })
            },

            likeCollectHandle: function (isLike) {//用户点赞0,用户收藏1
                let that = this;
                if (localStorage.getItem('userInfo')) {//判断是否登录
                    let tip = '';

                    getArtLikeCollect(that.userId, that.aid, isLike, function () {
                        //获取详情接口
                        getArticleInfo(that.aid, that.userId, function (msg) {
                            // console.log('文章详情',msg);
                            that.likeCount = msg.like ? msg.like.length : 0;
                            that.collectCount = msg.collect ? msg.collect.length : 0;
                            that.likeArt = msg.user_like;
                            that.collectArt = msg.user_collect;

                            //收藏
                            if (isLike === 1) {
                                if (that.collectArt) {
                                    tip = '已收藏';
                                } else {
                                    tip = '已取消收藏';
                                }
                            } else {
                                //点赞
                                if (that.likeArt) {
                                    tip = '已点赞';
                                } else {
                                    tip = '已取消点赞';
                                }
                            }
                            that.$message({
                                message: tip,
                                type: 'success'
                            });
                        });

                    })
                } else {//未登录 前去登录。
                    that.$confirm('登录后即可点赞和收藏，是否前往登录页面?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {//确定，跳转至登录页面
                        //储存当前页面路径，登录成功后跳回来
                        localStorage.setItem('logUrl', that.$route.fullPath);
                        that.$router.push({path: '/login?login=1'});
                    }).catch(() => {//取消关闭弹窗

                    });
                }
            },

        },
    }
</script>

<style scoped>
    /*分享图标*/
    .dshareBox {
        margin-top: 40px;
        position: relative;
    }

    .dshareBox a {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        font-size: 18px;
        border-radius: 50%;
        line-height: 32px;
        text-align: center;
        vertical-align: middle;
        margin: 4px;
        background: #fff;
        transition: background 0.6s ease-out;
    }

    .dshareBox .ds-weibo {
        border: 1px solid #ff763b;
        color: #ff763b;
    }

    .dshareBox .ds-weibo:hover {
        color: #fff;
        background: #ff763b;
    }

    .dshareBox .ds-qq {
        color: #56b6e7;
        border: 1px solid #56b6e7;
    }

    .dshareBox .ds-qq:hover {
        color: #fff;
        background: #56b6e7;
    }

    .dshareBox .ds-wechat {
        color: #7bc549;
        border: 1px solid #7bc549;
    }

    .dshareBox .ds-wechat:hover {
        color: #fff;
        background: #7bc549;
    }

    .dshareBox .ds-wechat:hover {
        opacity: 1;
        visibility: visible;
    }

    /*点赞 收藏*/
    .dlikeColBox {
        display: inline-block;
        float: right;
        margin-top: 4px;
    }

    .dlikeBox, .dcollectBox {
        display: inline-block;
        padding: 0 10px;
        height: 30px;
        color: #e26d6d;
        line-height: 31px;
        border-radius: 35px;
        border: 1px solid #e26d6d;
        cursor: pointer;
    }

    /*赞赏*/
    .donate-word {
        margin: 24px 0;
        text-align: center;
    }

    .donate-word span {
        display: inline-block;
        width: 80px;
        height: 34px;
        line-height: 34px;
        color: #fff;
        background: #e26d6d;
        margin: 0 auto;
        border-radius: 4px;
        cursor: pointer;
    }

    .donate-body {
        display: none;
    }

    .donate-body-show {
        display: block;
    }

    .donate-item {
        text-align: right;
    }

    .donate-item:last-child {
        text-align: left;
    }

    .donate-item img {
        width: 100%;
        display: block;
        height: 152px;
    }

    .donate-item div {
        display: inline-block;
        width: 150px;
        padding: 0 6px;
        box-sizing: border-box;
        text-align: center;
    }

    .donate-item div span {
        display: inline-block;
        width: 100%;
        margin: 10px 0;
        text-align: center;
    }

    .donate-body .donate-item:first-of-type div {
        color: #44b549;
    }

    .donate-body .donate-item:nth-of-type(2) div {
        color: #00a0e9;
    }


</style>

<template>
    <div class="tmsgBox" ref="tmsgBox">
        <div class="tmsg-respond" ref="respondBox">
            <h3>发表评论</h3>
            <form class="">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="说点什么呢``"
                        v-model="textarea">
                </el-input>
                <el-row class="tmsg-r-info">
                    <el-col :span="24" class="info-submit">
                        <p class="tcolors-bg" @click="sendMsg">{{sendTip}}</p>
                    </el-col>
                </el-row>
            </form>
        </div>
        <div class="tmsg-comments" ref="listDom">
            <a href="#" class="tmsg-comments-tip">活捉 {{commentList?commentList.length:0}} 条评论</a>
            <div class="tmsg-commentshow">
                <ul class="tmsg-commentlist">
                    <li class="tmsg-c-item" v-for="(item,index) in commentList.slice((currPage - 1) * pageSize, currPage * pageSize)"
                        :key="'common'+index">
                        <article class="">
                            <header>
                                <img :src="item.avatar|IMG" alt="">
                                <div class="i-name">
                                    {{item.nickname}}
                                </div>
                                <div class="i-time">
                                    <time>{{item.time}}</time>
                                </div>
                            </header>
                            <section>
                                <p>{{item.content}}</p>
                            </section>
                        </article>
                    </li>

                </ul>
            </div>
        </div>

        <!-- 分页器 -->
        <div style="text-align: center">
            <pagination :list="commentList" @sizeChange="handleSizeChange"
                        @currentChange="handleCurrentChange"></pagination>
        </div>
    </div>
</template>

<script>
    import {setArticleComment, ArticleComment} from '../utils/server.js'
    import Pagination from '../components/Pagination'

    export default {
        name: "ShareComment",
        components:{
            Pagination
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'routeChange'
        },
        created() { //生命周期函数
            // console.log(this.$route);
            this.routeChange();
        },
        data() {
            return {
                textarea: '',//文本框输入内容
                commentList: [],//评论列表数据
                aid: 0,//文章id
                userInfo: '',//用户信息
                nickname: '',//用户昵称
                avatar:'',//用户头像
                sendTip: '发送~',
                hasLogin: false,

                //分页器
                pageSize: 10,     //每页数据条数
                currPage: 1       //页码
            }
        },
        methods: {
            routeChange: function () {//重新加载
                this.showCommentList();
            },

            //发送留言
            sendMsg: function () {//留言
                let that = this;
                if (that.textarea) {
                    if (that.hasLogin) {
                        setArticleComment(that.textarea, that.nickname,that.avatar, that.aid, function () {
                            //   console.log(msg);
                            that.sendTip = '咻~~';
                            that.textarea = '';
                            that.routeChange();
                            let timer02 = setTimeout(function () {
                                that.sendTip = '发送~';
                                clearTimeout(timer02);
                            }, 1000)
                        })
                    } else {
                        that.$confirm('登录后即可点赞和收藏，是否前往登录页面?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {//确定，跳转至登录页面
                            //储存当前页面路径，登录成功后跳回来
                            localStorage.setItem('logUrl', that.$route.fullPath);
                            that.$router.push({path: '/Login?login=1'});
                        }).catch(() => {

                        });
                    }

                } else {
                    that.sendTip = '内容不能为空~';
                    let timer = setTimeout(function () {
                        that.sendTip = '发送~';
                        clearTimeout(timer);
                    }, 3000)
                }
            },

            showCommentList: function () {//评论列表
                let that = this;
                that.aid = that.$route.params.id;
                //判断当前用户是否登录
                if (localStorage.getItem('userInfo')) {
                    that.hasLogin = true;
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    that.nickname = that.userInfo.nickname;
                    that.avatar = that.userInfo.avatar;
                    //   console.log(that.userInfo);
                } else {
                    that.hasLogin = false;
                }
                ArticleComment(that.aid, function (result) {//查询列表
                    that.commentList = result.reverse();
                })
            },

            //分页器
            //每页数据条数改变时
            handleSizeChange(val) {
                this.pageSize = val;
            },
            //当前页码改变时
            handleCurrentChange(val) {
                this.currPage = val;
            },
        }
    }
</script>

<style scoped>
    .tmsgBox {
        position: relative;
        background: #fff;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
    }

    .tmsg-respond h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .tmsg-respond h3 small {
        font-size: smaller;
        cursor: pointer;
    }

    .tmsg-respond textarea {
        background: #f4f6f7;
        height: 100px;
        margin-bottom: 10px;
    }

    /*用户输入表单*/
    .tmsg-r-info {
        margin: 10px 0;
    }

    .tmsg-r-info input {
        height: 30px;
        border-radius: 4px;
        background: #f4f6f7;
    }

    .tmsg-r-info .info-submit {
        margin: 10px 0;
        text-align: center;
    }

    .tmsg-r-info .info-submit p, .tmsg-commentshow h1 {
        background: #97dffd;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        /*transition: all .3s ease-in-out;*/
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .tmsg-r-info .info-submit p:hover {
        background: #00A7E0;
        opacity: 0.6;
    }

    /*评论列表*/
    .tmsg-comments .tmsg-comments-tip {
        display: block;
        border-left: 2px solid #b4bccc;
        padding: 0 10px;
        margin: 24px 0;
        font-size: 20px;
        color: #00A7E0;
    }

    .tmsg-commentlist {
        margin-bottom: 20px;
    }

    .tmsg-commentshow > .tmsg-commentlist {
        border-bottom: 1px solid #e5eaed;
    }

    .tmsg-c-item {
        border-top: 1px solid #e5eaed;
    }

    .tmsg-c-item article {
        margin: 12px 0;
    }

    .tmsg-c-item article header {
        margin-bottom: 10px;
    }

    .tmsg-c-item article header img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        float: left;
        transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        margin-right: 15px;
        object-fit: cover;
    }

    .tmsg-c-item article header img:hover {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }

    .tmsg-c-item article header .i-name {
        font-size: 14px;
        margin: 5px 8px 7px 0;
        color: #444;
        font-weight: bold;
        display: inline-block;
    }

    .tmsg-c-item article header .i-time {
        color: #aaa;
        font-size: 12px;
    }

    .tmsg-c-item article section {
        margin-left: 80px;
    }

    .tmsg-c-item article section p img {
        vertical-align: middle;
    }

    .tmsg-c-item article section .tmsg-replay {
        margin: 10px 0;
        font-size: 12px;
        color: #64609E;
        cursor: pointer;
    }


</style>

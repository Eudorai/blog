<template>
    <!-- 收藏列表 -->
    <div>
        <div class="container">
            <el-row>
                <div class="likeBoxTitle">
                    <h1><i class="fa fa-wa fa-star"></i>收藏的文章</h1>
                </div>
                <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'like'+index">
                    <span class="s-round-date">
                        <span class="month">{{showInitDate(item.create_time,'month')}}月</span>
                        <span class="day">{{showInitDate(item.create_time,'date')}}</span>
                    </span>
                    <header>
                        <h1>
                            <a :href="'/detail/'+item._id" target="_blank">
                                {{item.title}}
                            </a>
                        </h1>
                        <h2>
                            <i class="fa fa-fw fa-user"></i>发表于
                            <i class="fa fa-fw fa-clock-o"></i>{{showInitDate(item.create_time,'newDate')}} •
                            <i class="fa fa-fw fa-comments"></i>活捉 {{item.comment_count}} 条 •
                            <span class="rateBox">
                                <i class="fa fa-fw fa-heart"></i>{{item.like?item.like.length:0}}点赞 •
                                <i class="fa fa-fw fa-star"></i>{{item.collect?item.collect.length:0}}收藏
                            </span>
                        </h2>
                    </header>

                    <div class="article-content">
                        <p v-html="item.content"></p>
                    </div>

                    <div class="viewdetail">
                        <a class="cancelbtn tcolors-bg" href="javascript:void(0);"
                           @click="cancelCollect(item._id)">取消收藏</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a class="tcolors-bg" :href="'/detail/'+item._id" target="_blank">
                            阅读全文>>
                        </a>
                    </div>
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
    import {initDate, getCollectList, getArtLikeCollect} from '../utils/server.js'

    export default {
        name: "CollectList",
        watch: {
            // 如果路由有变化，会再次执行该方法

            '$route': 'routeChange',//路由变换
            '$store.state.keywords': 'routeChange'//搜索关键词变换

        },
        created() { //生命周期函数
            // console.log(this.$route);
            this.routeChange();
        },
        data() {
            return {
                articleList: '',//文章列表
                articleName: '',//文章标题关键词
                userInfo: {},//用户信息
                userId: '',//用户id
            }
        },
        methods: {
            showInitDate: function (oldDate, full) {
                return initDate(oldDate, full)
            },
            routeChange: function () {
                this.showLikeCollectList();
            },
            showLikeCollectList: function () {//展示数据
                let that = this;
                if (localStorage.getItem('userInfo')) {
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    that.userId = that.userInfo._id;
                    // console.log(that.userInfo);
                }
                that.articleName = that.$store.state.keywords;
                // console.log(that.classId);
                getCollectList(that.articleName, (result) => {
                    that.articleList = result;
                })
            },
            //取消收藏
            cancelCollect: function (id) {
                let that = this;
                // console.log(id);
                getArtLikeCollect(that.userId, id, 1, function () {
                    // console.log('取消成功',msg);
                    that.routeChange();
                })
            },
        }
    }
</script>

<style scoped>
    .likeBoxTitle {
        text-align: center;
        padding: 16px 0;
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 24px;
        background: #fff;
        border-radius: 5px;
    }

    .likeBoxTitle h1 {
        font-weight: 700;
    }

    .likeBoxTitle h1 i {
        color: #DF2050;
        margin-right: 10px;
        font-size: 25px;
    }

    .cancelbtn {
        background: #ddd;
    }

</style>

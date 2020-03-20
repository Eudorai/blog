<template>
    <!-- 文章列表 -->
    <div>
        <el-row class="sharelistBox">
            <el-col :span="24" class="s-item tcommonBox"
                    v-for="(item,index) in articleList.slice((currPage - 1) * pageSize, currPage * pageSize)"
                    :key="'article'+index">
                <span class="s-round-date">
                    <span class="month" v-html="showInitDate(item.create_time,'month')+'月'"></span>
                    <span class="day" v-html="showInitDate(item.create_time,'date')"></span>
                </span>
                <header>
                    <h1 @click="toDetail(item._id)">
                        {{item.title}}
                    </h1>
                    <h2>
                        <span class="timeBox">
                            <i class="fa fa-fw fa-user"></i>发表于
                            <i class="fa fa-fw fa-clock-o"></i>
                            <span v-html="showInitDate(item.create_time,'all')">{{showInitDate(item.create_time,'all')}}</span>
                        </span>
                        <i class="fa fa-fw fa-eye"></i>{{item.browse_count}} 次围观 •
                        <i class="fa fa-fw fa-comments"></i>活捉 {{item.comment_count}} 条评论 •
                        <span class="rateBox">
                            <i class="fa fa-fw fa-heart"></i>{{item.like_count?item.like_count:0}}点赞 •
                            <i class="fa fa-fw fa-star"></i>{{item.collect_count?item.collect_count:0}}收藏
                        </span>
                    </h2>
                </header>
                <div class="article-content">
                    <p>{{item.body}}</p>
                </div>
                <div class="viewdetail">
                    <a class="tcolors-bg" @click="toDetail(item._id)">
                        阅读全文>>
                    </a>
                </div>
            </el-col>

            <!-- 分页器 -->
            <el-col style="display: flex;justify-content: center">
                <pagination :list="articleList" @sizeChange="handleSizeChange"
                            @currentChange="handleCurrentChange"></pagination>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import {ShowArticleAll, initDate} from '../utils/server.js'
    import Pagination from '../components/Pagination'

    export default {
        name: "ShareList",
        components: {
            Pagination
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'routeChange',
            '$store.state.keywords': 'routeChange'
        },
        created() { //生命周期函数
            // console.log(this.$route);
            this.routeChange();
        },
        data() {
            return {
                articleList: [],
                //分页器
                pageSize: 10,     //每页数据条数
                currPage: 1       //页码
            }
        },
        methods: {
            routeChange: function () {
                this.showSearchShowList();
            },
            showInitDate: function (oldDate, full) {
                // console.log(oldDate,full);
                return initDate(oldDate, full)
            },
            showSearchShowList: function () {//展示数据
                let that = this;
                that.keywords = that.$store.state.keywords;//获取传参的keywords
                // console.log(that.classId);

                //初始化
                ShowArticleAll(that.keywords, (result) => {
                    // console.log(result);
                    const msg = result.data;
                    window.console.info(msg.length);
                    that.articleList = msg;
                    // console.log(that.artId);
                })
            },

            //查看文章详情
            toDetail(id) {
                this.$router.push({
                    name: 'ArticleDetail',
                    params: {
                        id: id
                    }
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
    /*文章列表*/
    .sharelistBox {
        font-size: 15px;
    }

    .s-item {
        transition: all 0.2s ease-in;
    }

    .s-item:hover {
        transform: translate(0, -1px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    }

</style>

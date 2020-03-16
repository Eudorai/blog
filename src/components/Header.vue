<template>
    <div>
        <div class="headBack">
            <el-row class="container">
                <el-col :span="24">
                    <div class="headBox">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                                 @select="handleSelect"
                                 :router="true">
                            <el-menu-item index="/home"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>
                            <el-menu-item index="/reward"><i class="fa fa-wa fa-cny"></i> 赞赏</el-menu-item>
                            <el-menu-item index="/message"><i class="fa fa-wa fa-pencil"></i> 留言板</el-menu-item>
                            <el-menu-item index="/about"><i class="fa fa-wa fa-vcard"></i> 关于</el-menu-item>
                            <div index="" class="pcsearchbox">
                                <i class="el-icon-search pcsearchicon"></i>
                                <div class="pcsearchinput" :class="input?'hasSearched':''">
                                    <el-input placeholder="搜索" icon="search" v-model="input"
                                              :on-icon-click="searchEnterFun"
                                              @keyup.enter.native="searchEnterFun" @change="searchChangeFun">
                                    </el-input>
                                </div>
                            </div>
                            <div class="userInfo">
                                <div v-show="!hasLogin" class="nologin">
                                    <a href="javascript:void(0);" @click="loginFun(1)">登录&nbsp;</a>|
                                    <a href="javascript:void(0);" @click="loginFun(0)">&nbsp;注册</a>
                                </div>
                                <div v-show="hasLogin" class="haslogin">
                                    <i class="fa fa-fw fa-user-circle userImg"></i>
                                    <ul class="haslogin-info">
                                        <li>
                                            <a href="#/user">个人中心</a>
                                        </li>
                                        <li>
                                            <a href="#/like?like=1">喜欢列表</a>
                                        </li>
                                        <li>
                                            <a href="#/like?like=2">收藏列表</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" @click="userLogout">退出登录</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-menu>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {
        LoginOut,
    } from '../utils/server.js'

    export default {
        name: "Header",
        data() {
            return {
                userInfo: '', //用户信息
                hasLogin: false, //是否已登录
                activeIndex: '/', //当前选择的路由模块
                input: '', //input输入内容
            }
        },
        methods: {
            routeChange: function () {
                var that = this;
                this.activeIndex = this.$route.path === '/' ? '/Home' : this.$route.path;
                if (localStorage.getItem('userInfo')) { //存储用户信息
                    that.hasLogin = true;
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    // console.log(that.userInfo);
                } else {
                    that.hasLogin = false;
                }
                if ((this.$route.name === "Share" || this.$route.name === "Home") && this.$store.state.keywords) {
                    this.input = this.$store.state.keywords;
                } else {
                    this.input = '';
                    this.$store.state.keywords = '';
                }
            },
            //菜单选择
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            //input change 事件
            searchChangeFun(e) {
                console.log(e);
                if (this.input === '') {
                    this.$store.state.keywords = '';
                    this.$router.push({path: '/'});
                }
            },
            //input 输入 enter
            searchEnterFun: function (e) {
                const keyCode = window.event? e.keyCode:e.which;
                console.log('CLICK', this.input, keyCode);
                console.log('回车搜索', keyCode, e);
                if (this.input) {
                    this.$store.state.keywords = this.input;
                    //todo
                    this.$router.push({path: '/Share?keywords=' + this.input});
                }
            },
            loginFun: function (msg) { //用户登录和注册跳转
                localStorage.setItem('logUrl', this.$route.fullPath);
                console.log(666,this.$router.currentRoute.fullPath);
                //注册
                if (msg == 0) {
                    this.$router.push({
                        path: '/login?login=0'
                    });
                } else {
                    //登录
                    this.$router.push({
                        path: '/login?login=1'
                    });
                }
            },
            // 用户退出登录
            userLogout: function () {
                var that = this;
                this.$confirm('是否确认退出?', '退出提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(that.$route.path);
                    LoginOut(localStorage.getItem('accessToken'), function (result) {
                        console.log(result);
                        if (localStorage.getItem('userInfo')) {
                            localStorage.removeItem('userInfo');
                            that.haslogin = false;
                            //    that.$router.replace({path:that.$route.fullPath});
                            window.location.reload();
                            that.$message({
                                type: 'success',
                                message: '退出成功!'
                            });
                        }
                        if (that.$route.path === '/UserInfo') {
                            that.$router.push({
                                path: '/'
                            });
                        }
                    })
                }).catch(() => {
                    //
                });

            },
        },
    }
</script>

<style scoped>

</style>

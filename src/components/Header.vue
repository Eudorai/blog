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
                            <el-menu-item index="/collect"><i class="fa fa-wa fa-heart"></i> 收藏</el-menu-item>
                            <el-menu-item index="/reward"><i class="fa fa-wa fa-cny"></i> 赞赏</el-menu-item>
                            <div index="" class="pcsearchbox">
                                <i class="el-icon-search pcsearchicon"></i>
                                <div class="pcsearchinput" :class="input?'hasSearched':''">
                                    <el-input placeholder="搜索" prefix-icon="search" v-model="input" size="small"
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

        <div class="headImgBox">
            <div class="h-information">
                <img src="../assets/img/avatar.jpeg" alt="">
                <h2 class="h-description">
                    "Write the Code. Change the World."
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios'
    import {
        LoginOut,
        AboutMeData
    } from '../utils/server.js'

    export default {
        name: "Header",
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'routeChange'
        },
        data() {
            return {
                userInfo: '', //用户信息
                hasLogin: false, //是否已登录
                activeIndex: '/', //当前选择的路由模块
                input: '', //input输入内容
            }
        },
        created() { //生命周期函数
            let that = this;
            this.routeChange();
            //关于我的信息
            AboutMeData(function (msg) {
                // console.log('关于我',msg);
                that.$store.state.aboutMeObj = msg;
            })
            // axios.get('http://localhost:3000/blog/api/articles/'+'5e71bff0a1cb0803813ea8d2').then(num=>{
            //     window.console.info(num);
            // })
        },
        methods: {
            routeChange: function () {
                let that = this;
                this.activeIndex = this.$route.path === '/' ? '/home' : this.$route.path;
                if (localStorage.getItem('userInfo')) { //存储用户信息
                    that.hasLogin = true;
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    // console.log(that.userInfo);
                } else {
                    that.hasLogin = false;
                }
                if (this.$route.name === "Home" && this.$store.state.keywords) {
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
                const keyCode = window.event ? e.keyCode : e.which;
                console.log('CLICK', this.input, keyCode);
                console.log('回车搜索', keyCode, e);
                if (this.input) {
                    this.$store.state.keywords = this.input;
                    //todo
                    this.$router.push({path: '/Share?keywords=' + this.input});
                }
            },
            loginFun: function (msg) { //用户登录和注册跳转
                //储存当前页面路径，登录成功后跳回来
                localStorage.setItem('logUrl', this.$route.fullPath);
                console.log(666, this.$router.currentRoute.fullPath);
                //注册
                if (msg === 0) {
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
                let that = this;
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
                        if (that.$route.path === '/user') {
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
    .headBack {
        width: 100%;
        background: rgba(40, 42, 44, 0.6);
        /*margin-bottom:30px;*/
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 100;
    }

    .el-row {
        padding: 0 50px;
    }

    .headBox li.is-active {
        /*background: #48456C;*/
        background: rgba(73, 69, 107, 0.7);
    }

    .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
        border-bottom: none !important;
    }

    .headBox .el-menu {
        background: transparent;
        border-bottom: none !important;
    }

    .headBox .el-menu-demo li.el-menu-item,
    .headBox .el-menu--horizontal .el-submenu .el-submenu__title {
        height: 38px;
        line-height: 38px;
        border-bottom: none !important;
    }

    .headBox .el-submenu li.el-menu-item {
        height: 38px;
        line-height: 38px;
    }

    .headBox li .fa-wa {
        vertical-align: baseline;
        color: #fff;
    }

    .headBox ul li.el-menu-item,
    .headBox ul li.el-menu-item.is-active,
    .headBox ul li.el-menu-item:hover,
    .headBox .el-submenu div.el-submenu__title,
    .headBox .el-submenu__title i.el-submenu__icon-arrow {
        color: #fff;
    }

    .headBox .el-menu--horizontal .el-submenu > .el-menu {
        top: 38px;
        border: none;
        padding: 0;
    }

    .headBox > ul li.el-menu-item:hover,
    .headBox > ul li.el-submenu:hover .el-submenu__title {
        background: #48456C;
        border-bottom: none;
    }

    .headBox > ul .el-submenu .el-menu,
    .headBox > ul .el-submenu .el-menu .el-menu-item {
        background: #48456C;
    }

    .headBox > ul .el-submenu .el-menu .el-menu-item {
        min-width: 0;
    }

    .headBox > ul .el-submenu .el-menu .el-menu-item:hover {
        background: #64609E;
    }

    /*搜索框*/
    .headBox .pcsearchbox {
        padding: 0;
        max-width: 170px;
        /*min-width: 30px;*/
        height: 100%;
        line-height: 38px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        outline: none;
    }

    .headBox .pcsearchbox:hover .pcsearchinput {
        opacity: 1;
        visibility: visible;
    }

    .headBox .pcsearchbox i.pcsearchicon {
        color: #fff;
        padding-left: 10px;
    }

    .headBox .pcsearchbox .pcsearchinput {
        width: 180px;
        padding: 10px 20px 10px 20px;
        background: rgba(40, 42, 44, 0.6);
        border-radius: 0 0 2px 2px;
        position: absolute;
        right: 0;
        top: 38px;
        opacity: 0;
        visibility: hidden;
        transform-origin: right;
        transition: all 0.3s ease-out;
    }

    .headBox .pcsearchbox .hasSearched {
        opacity: 1;
        visibility: visible;
    }

    .headBox .pcsearchbox .el-input {
        width: 100%;
    }

    .headBox .el-input__inner {
        height: 30px;
        background: #fff;
        border: 1px solid #333;
        border-radius: 2px;
        padding-right: 10px;
    }

    .headBox .userInfo {
        height: 100%;
        line-height: 38px;
        position: absolute;
        right: 30px;
        top: 0;
        color: #fff;
    }

    .headBox .userInfo a {
        color: #fff;
        font-size: 13px;
        transition: all 0.2s ease-out;
    }

    .headBox .userInfo a:hover {
        color: #48456C;
    }

    .headBox .nologin {
        text-align: right;
    }

    .headBox .haslogin {
        text-align: right;
        position: relative;
        min-width: 80px;
        cursor: pointer;
    }

    .headBox .haslogin:hover ul {
        visibility: visible;
        opacity: 1;
    }

    .headBox .haslogin ul {
        background: rgba(40, 42, 44, 0.6);
        padding: 5px 10px;
        position: absolute;
        right: 0;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease-out;
    }

    .headBox .haslogin ul li {
        border-bottom: 1px solid #48456C;
    }

    .headBox .haslogin ul li:last-child {
        border-bottom: 1px solid transparent;
    }

    /*头部背景图*/
    .headImgBox {
        background: url("../assets/img/bg.jpg") center 40% no-repeat;
        height: 700px;
        position: relative;
        width: 100%;
        background-size: cover;
        margin-bottom: 24px;
    }

    /*头像*/
    .h-information {
        text-align: center;
        width: 70%;
        margin: auto;
        position: relative;
        top: 470px;
        padding: 40px 0;
        font-size: 16px;
        opacity: 0.98;
        background: rgba(230, 244, 249, 0.8);
        border-radius: 5px;
        z-index: 1;
    }

    .h-information img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        object-fit: cover;
    }

    .h-information img:hover {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }

    .h-information h2 {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 700;
        background: linear-gradient(to right, #DF2050, blue);
        -webkit-background-clip: text;
        color: transparent;
    }


</style>

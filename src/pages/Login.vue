<template>
    <div class="login">
        <div class="container">
            <h1 class="loginTitle">
                <a href="#">Eudora 的博客</a>
            </h1>
            <!-- 登录注册 -->
            <div class="">
                <!-- 登录 -->
                <div v-if="login===1" class="loginBox">
                    <div class="lr-title">
                        <h1>登录</h1>
                        <p>
                            新用户<a href="/login?login=0" class="tcolors">注册</a>
                        </p>
                    </div>
                    <el-input
                            type="email"
                            placeholder="邮箱"
                            v-model="email">
                    </el-input>
                    <el-alert
                            v-show="emailErr"
                            title="邮箱格式错误"
                            type="error"
                            show-icon :closable="false">
                    </el-alert>
                    <el-input
                            type="password"
                            placeholder="密码"
                            @keyup.enter.native="loginEnterFun"
                            v-model="password">
                    </el-input>
                    <el-alert
                            v-show="passwordErr"
                            title="密码格式错误"
                            type="error"
                            show-icon :closable="false">
                    </el-alert>
                    <h3><a href="">忘记密码？</a></h3>
                    <div class="lr-btn tcolors-bg" @click="gotoHome">登录</div>
                    <div class="otherLogin">
                        <a href="javascript:void(0)"><i class="fa fa-fw fa-wechat"></i></a>
                        <a href="javascript:void(0)"><i class="fa fa-fw fa-qq"></i></a>
                        <a href="javascript:void(0)"><i class="fa fa-fw fa-weibo"></i></a>
                    </div>
                </div>

                <!-- 注册 -->
                <div v-else class="registerBox">
                    <div class="lr-title">
                        <h1>注册</h1>
                        <p>
                            已有账号<a href="/login?login=1" class="tcolors">登录</a>
                        </p>
                    </div>
                    <el-input
                            type="text"
                            placeholder="用户名"
                            v-model="nusername">
                    </el-input>
                    <el-alert
                            v-show="nusernameErr"
                            title="用户名错误"
                            type="error"
                            show-icon :closable="false">
                    </el-alert>
                    <el-input
                            type="email"
                            placeholder="邮箱"
                            v-model="nemail">
                    </el-input>
                    <el-alert
                            v-show="nemailErr"
                            title="邮箱格式错误"
                            type="error"
                            show-icon :closable="false">
                    </el-alert>
                    <el-input
                            type="password"
                            placeholder="密码:6-12位英文、数字、下划线"
                            v-model="npassword">
                    </el-input>
                    <el-alert
                            v-show="npasswordErr"
                            title="密码格式错误"
                            type="error"
                            show-icon :closable="false">
                    </el-alert>
                    <el-input
                            type="password"
                            placeholder="确认密码"
                            @keyup.enter.native="registerEnterFun"
                            v-model="npassword2">
                    </el-input>
                    <el-alert
                            v-show="npassword2Err"
                            title="重复密码有误"
                            type="error"
                            show-icon :closable="false">
                    </el-alert>
                    <div class="lr-btn tcolors-bg" @click="newRegister">注册
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {UserLogin, getRegister, AboutMeData} from '../utils/server.js'

    export default {
        name: "Login",
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'routeChange'
        },
        created() { //生命周期函数
            this.routeChange();
        },
        data() {
            return {
                login: 0,//登录or注册
                email: '',//邮箱
                password: '',//密码
                emailErr: false,//登录邮箱错误
                passwordErr: false,//登录密码错误

                nusername: '',//新用户注册昵称
                nemail: '',//新用户注册邮箱
                npassword: '',//新用户注册密码
                npassword2: '',//新用户注册重复密码

                nusernameErr: false,//新用户注册用户名错误
                nemailErr: false,//新用户注册邮箱错误
                npasswordErr: false,//新用户注册密码错误
                npassword2Err: false,//新用户注册重复密码错误

            }
        },
        methods: {
            routeChange: function () {
                this.login = this.$route.query.login === undefined ? 1 : parseInt(this.$route.query.login);//获取传参的login
            },

            loginEnterFun: function (e) {
                let keyCode = window.event ? e.keyCode : e.which;
                // console.log('回车登录',keyCode,e);
                if (keyCode === 13) {
                    this.gotoHome();
                }
            },

            //用户登录
            gotoHome: function () {
                let that = this;
                let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                let preg = /^(\w){6,12}$/;
                if (reg.test(that.email)) {
                    that.emailErr = false;
                } else {
                    that.emailErr = true;
                }
                if (that.password && preg.test(that.password)) {
                    that.passwordErr = false;
                } else {
                    that.passwordErr = true;
                }
                if (!that.emailErr && !that.passwordErr) {
                    UserLogin(that.email, that.password, function (msg) {
                        localStorage.setItem('token', msg.data.token);
                        //用户信息
                        AboutMeData(function () {
                            if (localStorage.getItem('logUrl')) {
                                that.$router.push({path: localStorage.getItem('logUrl')});
                            } else {
                                that.$router.push({path: '/'});
                            }
                        });
                    })
                }
            },

            registerEnterFun: function (e) {
                let keyCode = window.event ? e.keyCode : e.which;
                // console.log('回车注册',keyCode,e);
                if (keyCode === 13) {
                    this.newRegister();
                }
            },
            newRegister: function () {//注册提交
                let that = this;
                let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                let preg = /^(\w){6,12}$/;
                if (that.nusername) {
                    that.nusernameErr = false;
                } else {
                    that.nusernameErr = true;
                }
                if (reg.test(that.nemail)) {
                    that.nemailErr = false;
                } else {
                    that.nemailErr = true;
                }
                if (that.npassword && preg.test(that.npassword)) {
                    that.npasswordErr = false;
                    if (that.npassword === that.npassword2) {
                        that.npassword2Err = false;
                    } else {
                        that.npassword2Err = true;
                    }
                } else {
                    that.npasswordErr = true;
                }
                if (!that.nusernameErr && !that.nemailErr && !that.npasswordErr && !that.npassword2Err) {
                    getRegister(that.nusername, that.npassword, that.nemail, function () {
                        //注册完自动登录
                        UserLogin(that.nemail, that.npassword, function (msg) {
                            localStorage.setItem('token', msg.data.token);
                            //用户信息
                            AboutMeData(function () {
                                if (localStorage.getItem('logUrl')) {
                                    that.$router.push({path: localStorage.getItem('logUrl')});
                                } else {
                                    that.$router.push({path: '/'});
                                }
                            });
                        })
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .login {
        position: relative;
    }

    .container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 5%);
    }

    /*登录注册标题*/
    .loginTitle {
        text-align: center;
        font-size: 26px;
        padding-top: 50px;
        margin-bottom: 20px;
    }

    .loginBox, .registerBox {
        background: #fff;
        padding: 40px;
        width: 320px;
        margin: 0 auto;
    }

    .loginBox {
        padding-bottom: 0;
    }

    .lr-title {
        position: relative;
        height: 32px;
        line-height: 32px;
        margin-bottom: 20px;
    }

    .lr-title h1 {
        font-size: 24px;
        color: #666;
        font-weight: bold;
        /*width:50%;*/
    }

    .lr-title p {
        font-size: 12px;
        color: #999;
        position: absolute;
        right: 0;
        top: 0;
    }

    .lr-btn {
        color: #fff;
        text-align: center;
        letter-spacing: 5px;
        padding: 8px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 30px;
    }

    .loginBox .el-input, .registerBox .el-input {
        margin-bottom: 20px;
    }

    .loginBox .el-alert, .registerBox .el-alert {
        top: -18px;
        color: #FFF;
        background-color: #888;
    }

    .loginBox .el-input input, .registerBox .el-input input {
        border-radius: 4px;
    }

    .loginBox h3, .registerBox h3 {
        text-align: right;
        margin-bottom: 20px;
    }

    .loginBox h3 a, .registerBox h3 a {
        font-size: 13px;
        color: #999;
    }

    .loginBox .otherLogin {
        max-width: 320px;
        padding: 30px 40px;
        background: #ddd;
        text-align: center;
        margin-left: -40px;
        margin-right: -40px;
        visibility: hidden;
    }

    .loginBox .otherLogin p {
        margin-bottom: 20px;
        font-size: 16px;
    }

    .loginBox .otherLogin a i {
        display: inline-block;
        width: 42px;
        height: 42px;
        line-height: 42px;
        font-size: 18px;
        border-radius: 50%;
        color: #fff;
        margin: 0 10px;
    }

    .loginBox .otherLogin a i.fa-wechat {
        background: #7bc549;
    }

    .loginBox .otherLogin a i.fa-qq {
        background: #56b6e7;
    }

    .loginBox .otherLogin a i.fa-weibo {
        background: #ff763b;
    }

</style>

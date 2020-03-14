<template>
    <div>
        <el-row class="container">
            <el-col :span="24">
                <!-- pc端导航 -->
                <div class="headBox">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                             :router="true">
                        <el-menu-item index="/Home"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>
                        <el-submenu index="/Share">
                            <template slot="title"><i class="fa fa-wa fa-archive"></i> 分类</template>
                            <el-menu-item v-for="(item,index) in classListObj" :key="'class1'+index"
                                          :index="'/Share?classId='+item.class_id">{{item.cate_name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="/Aboutme">
                            <template slot="title"><i class="fa fa-wa fa-flask"></i> 实验室</template>
                            <el-menu-item v-for="(item,index) in projectList" :key="'class2'+index" index=""><a
                                    :href="item.nav_url" target="_blank">{{item.nav_name}}</a></el-menu-item>
                        </el-submenu>
                        <el-menu-item index="/Reward"><i class="fa fa-wa fa-cny"></i> 赞赏</el-menu-item>
                        <el-menu-item index="/Friendslink"><i class="fa fa-wa fa-users"></i> 伙伴</el-menu-item>
                        <el-menu-item index="/Message"><i class="fa fa-wa fa-pencil"></i> 留言板</el-menu-item>
                        <el-menu-item index="/Aboutme"><i class="fa fa-wa fa-vcard"></i> 关于</el-menu-item>
                        <div index="" class="pcsearchbox">
                            <i class="el-icon-search pcsearchicon"></i>
                            <div class="pcsearchinput" :class="input?'hasSearched':''">
                                <el-input placeholder="搜索" icon="search" v-model="input" :on-icon-click="searchEnterFun"
                                          @keyup.enter.native="searchEnterFun" @change="searchChangeFun">
                                </el-input>
                            </div>
                        </div>
                        <div class="userInfo">
                            <div v-show="!haslogin" class="nologin">
                                <a href="javascript:void(0);" @click="logoinFun(1)">登录&nbsp;</a>|<a
                                    href="javascript:void(0);" @click="logoinFun(0)">&nbsp;注册</a>
                            </div>
                            <div v-show="haslogin" class="haslogin">
                                <i class="fa fa-fw fa-user-circle userImg"></i>
                                <ul class="haslogin-info">
                                    <li>
                                        <a href="#/UserInfo">个人中心</a>
                                    </li>
                                    <li>
                                        <a href="#/LikeCollect?like=1">喜欢列表</a>
                                    </li>
                                    <li>
                                        <a href="#/LikeCollect?like=2">收藏列表</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" @click="userlogout">退出登录</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                activeIndex: '/', //当前选择的路由模块
            }
        },
        methods: {
            //菜单选择
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        }
    }
</script>

<style scoped>

</style>

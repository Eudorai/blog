<template>
    <div>
        <Header></Header>

        <div class="container">
            <!-- 编辑 -->
            <div v-show="isEdit" class="tcommonBox">
                <header>
                    <h1>
                        编辑个人资料
                    </h1>
                </header>
                <section>
                    <ul class="userInfoBox">
                        <li class="avatarlist">
                            <span class="leftTitle">头像</span>
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://localhost:3000/admin/api/img/upload"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="userInfo.avatar"
                                     :src="userInfo.avatar|IMG"
                                     class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div slot="tip" class="el-upload__tip">点击上传头像，只能上传jpg/png文件，且不超过2mb</div>
                            </el-upload>
                        </li>
                        <li class="username">
                            <span class="leftTitle">昵称</span>
                            <el-input v-model="userInfo.nickname" placeholder="昵称"></el-input>
                            <i class="fa fa-wa fa-asterisk"></i>
                        </li>
                    </ul>
                    <div class=" saveInfobtn">
                        <a class="tcolors-bg" href="javascript:void(0);" @click="isEdit=!isEdit">返 回</a>
                        <a class="tcolors-bg" href="javascript:void(0);" @click="saveInfoFun">保 存</a>
                    </div>
                </section>
            </div>

            <!-- 查看 -->
            <div v-show="!isEdit" class="tcommonBox">
                <header>
                    <h1>
                        个人中心
                        <span class="gotoEdit" @click="isEdit=!isEdit"><i class="fa fa-wa fa-edit"></i>编辑</span>
                    </h1>

                </header>
                <section>
                    <ul class="userInfoBox">
                        <li class="avatarlist">
                            <span class="leftTitle">头像</span>
                            <div class="avatar-uploader">
                                <img :src="userInfo.avatar|IMG"
                                     class="avatar">
                            </div>
                        </li>
                        <li class="username">
                            <span class="leftTitle">昵称</span>
                            <span>{{userInfo.nickname?userInfo.nickname:"无"}}</span>
                        </li>
                    </ul>

                </section>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import Footer from '../components/Footer'
    import {UserInfoSave,AboutMeData} from '../utils/server.js'//保存用户信息


    export default {
        name: "User",
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'routeChange'
        },
        created() { //生命周期函数
            this.routeChange();
        },
        components: {
            Header, Footer
        },
        data() {
            return {
                isEdit: false,
                userInfo: {
                    avatar:'',
                },//本地存储的用户信息
                userId: '',//用户id
            }
        },
        methods: {
            routeChange: function () {//展示页面信息
                let that = this;
                // console.log(this.$router,this.$route);
                //用户信息
                AboutMeData(function () {
                    that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    that.userId = that.userInfo._id;
                });
            },

            //上传头像
            handleAvatarSuccess(res) {
                let that = this;
                window.console.info(res.url);
                this.$set(that.userInfo,'avatar',res.url);
            },

            //判断头像大小
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                // console.log(file);
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            //保存编辑的用户信息
            saveInfoFun: function () {
                let that = this;
                //昵称为必填
                if (!that.userInfo.nickname) {
                    that.$message.error('昵称为必填项，请填写昵称');
                    return;
                }

                //保存信息接口
                UserInfoSave(that.userInfo, function () {
                    that.$message({
                        message: '保存成功！',
                        type: 'success'
                    });

                    that.isEdit = false;
                    that.routeChange();
                })

            },
        }
    }
</script>

<style scoped>
    .userInfoBox .avatarlist {
        position: relative;
    }

    .avatar-uploader {
        display: inline-block;
        vertical-align: top;
    }

    .avatar-uploader .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 120px;
        height: 120px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: block;
        object-fit: cover;
    }

    .gotoEdit {
        font-size: 15px;
        float: right;
        cursor: pointer;
        color: #999;
    }

    .gotoEdit:hover {
        color: #333;
    }

    /*个人设置*/
    .userInfoBox .leftTitle {
        display: inline-block;
        width: 100px;
        padding: 10px 0;
    }

    .userInfoBox li {
        padding: 20px;
        border-bottom: 1px solid #ddd;
    }

    .userInfoBox li:last-child {
        border-bottom: 1px solid transparent;
    }

    .userInfoBox .el-input {
        max-width: 300px;
        min-width: 100px;
    }

    .userInfoBox .el-input__inner {
        border-radius: 4px;
    }

    .saveInfobtn {
        margin: 20px 0;
        text-align: center;
    }

    .saveInfobtn a {
        color: #fff;
        padding: 6px 20px;
        margin: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
    }

    .userInfoBox .fa-asterisk {
        color: #DF2050;
        transform: scale(0.6);
    }


</style>

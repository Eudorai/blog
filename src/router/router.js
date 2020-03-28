import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/Home');
const Reward = () => import('../pages/Reward');
const Collect = () => import('../pages/Collect');
const Login = () => import('../pages/Login');
const User = () => import('../pages/User');
const ArticleDetail = () => import('../pages/ArticleDetail');


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: 'home',
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },//首页
    {
        path: '/detail/:id',
        component: ArticleDetail,
        meta: {
            auth: true
        },
        name: 'ArticleDetail'
    }, //文章详情
    {
        path: '/reward',
        component: Reward,
        name: 'Reward'
    }, //赞赏
    {
        path: '/collect',
        component: Collect,
        name: 'Collect'
    }, //收藏
    {
        path: '/login',
        component: Login,
        name: 'Login'
    }, //注册登录
    {
        path: '/user',
        component: User,
        name: 'User'
    }, //用户个人中心


];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router

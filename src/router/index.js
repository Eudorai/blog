import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/Home');
const Reward = () => import('../pages/Reward');
const Message = () => import('../pages/Message');
const About = () => import('../pages/About');
const Login = () => import('../pages/Login');
const User = () => import('../pages/User');
const Like = () => import('../pages/Like');
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
        path: '/message',
        component: Message,
        name: 'Message'
    }, //留言板
    {
        path: '/about',
        component: About,
        name: 'About'
    }, //关于
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
    {
        path: '/like',
        component: Like,
        name: 'Like'
    } //收藏列表

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router

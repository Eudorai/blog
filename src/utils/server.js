import axios from 'axios'

let portUrl = "http://localhost:3000/blog/api";

//用户注册
const getRegister = (nickname, password, username, callback) => {
    let url = portUrl + '/user/register';
    let params = {};
    params.nickname = nickname; //昵称
    params.password = password;
    params.username = username; //账号
    axios.post(url, params).then(num => {
        callback && callback(num);
    })
};

//用户登录 ok
const UserLogin = (username, password, callback) => {
    let url = portUrl + '/user/login';
    let params = {};
    params.username = username;
    params.password = password;
    axios.post(url, params).then(num => {
        callback && callback(num);
    })
};

//修改用户信息
const UserInfoSave = (obj, callback) => {
    let url = portUrl + '/user_info';
    let data = {
        'nickname': obj.nickname,
        'avatar': obj.avatar,
    };
    // console.log(data);
    axios.put(url, {params: data}).then(num => {
        callback && callback(num.data);
    })
}

//查询用户信息
const AboutMeData = (callback) => {
    let url = portUrl + '/user_info';
    axios.get(url).then(num => {
        localStorage.setItem('userInfo', JSON.stringify(num.data));
        callback && callback(num.data);

    })
};

//点赞功能修改
const GetLike = (callback) => {
    let url = portUrl + '/web-like/add_like';
    axios.get(url).then(num => {
        callback && callback(num.data);

    })
};

//获取网址点赞总数
const showLikeData = (callback) => {
    let url = portUrl + '/web-like/show_like';
    axios.get(url).then(num => {
        // console.log(num.data,parseInt(num.data));
        callback && callback(num.data);
    })
};

//初始化时间
const initDate = (oldDate, full) => {
    const odate = new Date(oldDate);
    const year = odate.getFullYear();
    const month = odate.getMonth() < 9 ? '0' + (odate.getMonth() + 1) : odate.getMonth() + 1;
    const date = odate.getDate() < 10 ? '0' + odate.getDate() : odate.getDate();
    if (full === 'all') {
        const t = oldDate.split(" ")[0];
        // console.log(oldDate,t.split('-')[0],t.split('-')[1],t.split('-')[2]);
        return t.split('/')[0] + '年' + t.split('/')[1] + '月' + t.split('/')[2] + '日';
    } else if (full === 'year') {
        return year
    } else if (full === 'month') {
        return month
    } else if (full === 'date') {
        return date
    } else if (full === 'newDate') {
        return year + '年' + month + '月' + date + '日';
    }
};

//查询文章列表
const ShowArticleAll = (articleName, callback) => {
    let url = '';
    //articleName 不为''时，即查询
    if (articleName) {
        url = portUrl + '/articles?title=' + articleName;
    } else {
        url = portUrl + '/articles';
    }
    axios.get(url).then(num => {
        callback && callback(num.data);
    })
};

//文章点击收藏 点击喜欢
const getArtLikeCollect = (userId, artId, isLike, callback) => {
    let url = '';
    //收藏
    if (isLike === 1) {
        url = portUrl + '/articles/collect?user_id=' + userId + '&art_id=' + artId;
    } else {
        //点赞
        url = portUrl + '/articles/like?user_id=' + userId + '&art_id=' + artId;
    }
    axios.get(url).then(num => {
        callback && callback(num.data);

    })
};

//查询用户收藏列表
const getCollectList = (articleName, callback) => {
    let url = '';
    if (articleName) {
        url = portUrl + '/user_collect?title=' + articleName;
    } else {
        url = portUrl + '/user_collect';
    }
    axios.get(url).then(num => {
        callback && callback(num.data);
    })
};

//查询文章详情
const getArticleInfo = (artId, userId, callback) => {
    //如果没有用户id，则点赞收藏数据皆返回false
    let url = '';
    if (!userId) {
        url = portUrl + '/articles/detail?art_id=' + artId;
    } else {
        url = portUrl + '/articles/detail?user_id=' + userId + '&art_id=' + artId;
    }
    axios.get(url).then(num => {
        callback && callback(num.data);
    })
};

//文章评论
const setArticleComment = (content, nickname, avatar, article_id, callback) => {
    let time = new Date().toLocaleString();
    window.console.info(time);
    //回复评论
    let url = portUrl + '/commentcreate';
    let params = {};
    params.article_id = article_id;
    params.content = content;
    params.nickname = nickname;
    params.time = time;
    params.avatar = avatar;
    axios.post(url, params).then(num => {
        callback && callback(num.data);
    })
};

//查询文章评论数据
const ArticleComment = (artId, callback) => {
    let url = portUrl + '/comment';
    axios.get(url, {params: {art_id: artId}}).then(num => {
        callback && callback(num.data);
    })
};


export {
    getRegister,//注册
    UserLogin,//登录
    AboutMeData,//用户信息
    showLikeData,//do you like me
    GetLike,//设置 do you like me
    initDate,//设置时间
    ShowArticleAll,//查询文章列表
    getArtLikeCollect,//文章收藏 文章点赞
    getArticleInfo,//文章详情
    setArticleComment,//设置文章评论
    ArticleComment,//文章评论列表
    UserInfoSave,//修改用户信息
    getCollectList,//用户收藏列表
}

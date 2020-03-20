import axios from 'axios'

let portUrl = "http://localhost:3000/blog/api";

//用户注册
const getRegister = (username, password, email, callback) => {
    let url = portUrl + 'login/getRegister?username=' + username + '&email=' + email + '&password=' + password;
    axios.get(url).then(num => {
        callback && callback(num.data)
    })
};

//用户登录
const UserLogin = (email, password, callback) => {
    let url = portUrl + 'login/login?email=' + email + '&password=' + password;
    axios.get(url).then(num => {
        callback && callback(num.data);
    })
};
//用户退出
const LoginOut = (token, callback) => {
    let url = portUrl + 'login/loginOut?token=' + token;
    axios.get(url).then(num => {
        callback && callback(num.data);
    })
};

//查询关于我
const AboutMeData = (callback) => {
    if (sessionStorage.getItem('AboutMeData')) {
        const data = JSON.parse(sessionStorage.getItem('AboutMeData'));
        callback && callback(data)
    } else {
        let url = portUrl + '/user_info';
        axios.get(url).then(num => {
            window.console.info(num);
            if (num.status === 200) {
                sessionStorage.setItem('AboutMeData', JSON.stringify(num.data));
                callback && callback(num.data);
            } else {
                window.console.info("查询失败");
            }
        })
    }
};

//点赞功能修改
const GetLike = (callback) => {
    let url = portUrl + '/add_like';
    axios.get(url).then(num => {
        if (num.status === 200) {
            callback && callback(num.data);
        } else {
            window.console.info("点赞失败");
        }
    })
};

//查询网址点赞总数
const showLikeData = (callback) => {
    let url = portUrl + '/show_like';
    axios.get(url).then(num => {
        if (num.status === 200) {
            // console.log(num.data,parseInt(num.data));
            callback && callback(num.data.data);
        } else {
            window.console.info("查询失败");
        }
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
        return t.split('-')[0] + '年' + t.split('-')[1] + '月' + t.split('-')[2] + '日';
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
        if (num.status === 200) {
            callback && callback(num.data);
        }
    })
};
//文章点击收藏 点击喜欢
const getArtLikeCollect = (userId, artId, isLike, callback) => {
    let url = '';
    //收藏
    if (isLike === 1) {
        url = portUrl + '/article/collect?user_id=' + userId + '&art_id=' + artId;
    } else {
        //点赞
        url = portUrl + '/article/like?user_id=' + userId + '&art_id=' + artId;
    }
    axios.get(url).then(num => {
        if (num.status === 200) {
            callback && callback(num.data);
        } else {
            window.console.info("查询失败");
        }
    })
};

//查询文章详情
const getArticleInfo = (artId, userId, callback) => {
    //如果没有用户id，则点赞收藏数据皆返回false
    let url = '';
    if (!userId) {
        url = portUrl + '/article?art_id=' + artId;
    } else {
        url = portUrl + '/article?user_id=' + userId + '&art_id=' + artId;
    }
    axios.get(url).then(num => {
        if (num.status === 200) {
            callback && callback(num.data.data);
        } else {
            window.console.info("查询失败");
        }
    })
};

//文章评论
const setArticleComment = (content, nickname, article_id, callback) => {
    let time = new Date().toLocaleString();
    window.console.info(time);
    //回复评论
    let url = portUrl + '/comment?content=' + content + '&nickname=' + nickname + '&article_id=' + article_id + '&time=' + time;
    axios.get(url).then(num => {
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
    LoginOut,//退出登录
    AboutMeData,//关于我文章编写
    showLikeData,//do you like me
    GetLike,//设置 do you like me
    initDate,//设置时间
    ShowArticleAll,//查询文章列表
    getArtLikeCollect,//文章收藏 文章点赞
    getArticleInfo,//文章详情
    setArticleComment,//设置文章评论
    ArticleComment,//文章评论列表
}

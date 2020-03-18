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
const showLikeData = (callback) =>{
    let url = portUrl + '/show_like';
    axios.get(url).then(num => {
        if(num.status === 200){
            // console.log(num.data,parseInt(num.data));
            callback && callback(num.data.data);
        }else{
            window.console.info("查询失败");
        }
    })
}

export {
    getRegister,//注册
    UserLogin,//登录
    LoginOut,//退出登录
    AboutMeData,//关于我文章编写
    showLikeData,//do you like me
    GetLike,//设置 do you like me
}

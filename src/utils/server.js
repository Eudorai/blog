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
        var data = JSON.parse(sessionStorage.getItem('AboutMeData'));
        callback && callback(data)
    } else {
        let url = portUrl + '/user_info';
        axios.get(url).then(num => {
            if (num.data.code === 1001) {
                sessionStorage.setItem('AboutMeData', JSON.stringify(num.data.data));
                callback && callback(num.data.data);
            } else if (num.data.code === 1005) {
                return false;
            } else {
                window.console.info("查询失败");
            }
        })
    }
};

export {
    getRegister,//注册
    UserLogin,//登录
    LoginOut,//退出登录
    AboutMeData,//关于我文章编写
}

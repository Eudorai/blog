import Mock from "mockjs"

//用户信息
Mock.mock('http://localhost:3000/blog/api/user_info', {
    success: true,
    data:{
        name:'Tom'
    },
    code:1001
});

//文章内容
Mock.mock('http://localhost:3000/blog/api/articals',{
    success: true,
    data:[
        {
            title:'最新html资讯',
            body:'不告诉你～',
        }
    ]
});

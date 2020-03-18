import Mock from "mockjs"

//用户信息
Mock.mock('http://localhost:3000/blog/api/user_info', {
    data: {
        name: 'Tom'
    },
});

//文章内容
Mock.mock('http://localhost:3000/blog/api/articals', {
    data: [
        {
            title: '最新html资讯',
            body: '不告诉你～',
        }
    ]
});

//设置点赞
Mock.mock('http://localhost:3000/blog/api/add_like', {
    data: '点赞成功'
});

//查询点赞数
Mock.mock('http://localhost:3000/blog/api/show_like', {
    data: 20
});

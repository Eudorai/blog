import Mock from "mockjs"

//用户信息
Mock.mock('http://localhost:3000/blog/api/user_info', {
    data: {
        name: 'Tom'
    },
});

//查询文章列表
Mock.mock('http://localhost:3000/blog/api/articles', [
    {
        _id: 0,
        title: '最新html资讯',
        content: '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!' +
            '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!',
        create_time: '2020-1-1',
        //评论数
        comment_count: 2,
        //点赞数
        like: [3, 4],
        //收藏数
        collect: [4, 5],
    },

]);

//设置点赞
Mock.mock('http://localhost:3000/blog/api/web-like/add_like', {});

//查询点赞数
Mock.mock('http://localhost:3000/blog/api/web-like/show_like',
    20
);

//设置收藏
Mock.mock('http://localhost:3000/blog/api/articles/collect?user_id=1&art_id=1', {});

//设置点赞
Mock.mock('http://localhost:3000/blog/api/articles/like?user_id=1&art_id=1', {});

//查询文章详情，用户已登录
Mock.mock('http://localhost:3000/blog/api/articles?user_id=1&art_id=0', {
    title: "今天是个好日子",
    content: "心想的事儿都能成",
    //评论数
    comment_count: 2,
    //点赞数
    like: [],
    //收藏数
    collect: [],
    user_like: true,
    user_collect: false,
    create_time: '2020/3/18 13:00:01',
});

//查询文章详情,用户未登录
Mock.mock('http://localhost:3000/blog/api/articles/detail?art_id=0', {
    title: "今天是个好日子",
    content: "心想的事儿都能成",
    //评论数
    comment_count: 2,
    //点赞数
    like: [],
    //收藏数
    collect: [],
    user_like: false,
    user_collect: false,
    create_time: '2020/3/18 13:00:01',
});

//查询文章评论
Mock.mock('http://localhost:3000/blog/api/comment?art_id=0',
    [
        {
            nickname: 'Mike',
            avatar: '',
            content: '博主好厉害！',
            time: '2020/1/1',
        },
        {
            nickname: 'Sun',
            avatar: '',
            content: '受益了！',
            time: '2020/1/2',
        },
    ]
);

//查询用户收藏列表
Mock.mock('http://localhost:3000/blog/api/user_collect',[
    {
        _id: 0,
        title: '最新html资讯',
        content: '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!' +
            '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!',
        create_time: '2020-1-1',
        //评论数
        comment_count: 2,
        //点赞数
        like: [3, 4],
        //收藏数
        collect: [4, 5],
    },
]);



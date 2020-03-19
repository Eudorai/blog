import Mock from "mockjs"

//用户信息
Mock.mock('http://localhost:3000/blog/api/user_info', {
    data: {
        name: 'Tom'
    },
});

//查询文章内容
Mock.mock('http://localhost:3000/blog/api/articles', {
    "data|5": [
        {
            id: 0,
            title: '最新html资讯',
            body: '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!' +
                '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!',
            create_time: '2020-1-1',
            //浏览次数
            browse_count: 1,
            //评论数
            comment_count: 2,
            //点赞数
            like_count: 3,
            //收藏数
            collect_count: 4,
        },
        {
            id: 2,
            title: '最新资讯',
            body: '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!' +
                '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!',
            create_time: '2020-2-10',
            //浏览次数
            browse_count: 1,
            //评论数
            comment_count: 2,
            //点赞数
            like_count: 3,
            //收藏数
            collect_count: 4,
        },
        {
            id: 3,
            title: 'html资讯',
            body: '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!' +
                '不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!不告诉你～最新html资讯!',
            create_time: '2020-2-10',
            //浏览次数
            browse_count: 1,
            //评论数
            comment_count: 2,
            //点赞数
            like_count: 3,
            //收藏数
            collect_count: 4,
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


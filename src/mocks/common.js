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
            _id: 0,
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
            _id: 2,
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
            _id: 3,
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
Mock.mock('http://localhost:3000/blog/api/add_like', {});

//查询点赞数
Mock.mock('http://localhost:3000/blog/api/show_like', {
    data: 20
});

//设置收藏
Mock.mock('http://localhost:3000/blog/api/article/collect?user_id=1&art_id=1', {});

//设置点赞
Mock.mock('http://localhost:3000/blog/api/article/like?user_id=1&art_id=1', {});

//查询文章详情，用户已登录
Mock.mock('http://localhost:3000/blog/api/article?user_id=1&art_id=0', {
    data: {
        title: "今天是个好日子",
        content: "心想的事儿都能成",
        like_count: 1,
        collect_count: 2,
        user_like: true,
        user_collect: false,
        create_time: '2020-3-18 13:00:01',
    }
});

//查询文章详情,用户未登录
Mock.mock('http://localhost:3000/blog/api/article?art_id=0', {
    data: {
        title: "今天是个好日子",
        content: "心想的事儿都能成",
        like_count: 1,
        collect_count: 2,
        user_like: false,
        user_collect: false,
        create_time: '2020-3-18 13:00:01',
    }
});

//查询文章评论
Mock.mock('http://localhost:3000/blog/api/comment?art_id=0', {
    data: [
        {
            nickname: 'Mike',
            avatar: '',
            content: '博主好厉害！',
            time: '2020-1-1',
        },
        {
            nickname: 'Sun',
            avatar: '',
            content: '受益了！',
            time: '2020-1-2',
        },
    ]
});



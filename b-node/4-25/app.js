const express = require('express');

const app = express();

// 配置session中间件

const session = require('express-session');

app.use(
    session(
        {
            secret: 'jing',
            resave: false,
            saveUninitialized: true,
        }
    )
)

app.use(express.static('./pages'));

app.use(express.urlencoded({extended: false }));

// 登陆api接口

app.post('/api/login',(req,res) => {
    //判断用户提交的登陆信息是否正确
    if (req.body.username !== admin || req.body.password !== '0000') {
        return res.send({status: 1,msg:'登陆失败'})
    }
    //只有成功配置了express-session这个中间件之后，才能呗访问到

    // 将登陆成功后的用户信息，保存到session中

    req.session.user = req.body; // 用户的信息
    req.session.islogin = true; // 用户的登陆状态

    res.send({status:0,msg:'登陆成功'})
})

// 从session中取数据

app.get('/api/username',(req,res) => {
    // 判断用户是否登陆

    if(!req.session.islogin) {
        return res.send({status:1,msg:'jing'})
    }

    res.send({status:0,msg:'success',username:req.session.user.username})
})

// 退出登陆的接口

app.post('/api/logout',(req,res) => {
    //清空当前客户端对应的session信息
    req.session.destroy()
    res.send({
        status: 0,
        msg: '退出登陆成功'
    })
})
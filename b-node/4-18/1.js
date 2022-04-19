const http = require('http');

const server = http.createServer();

// server.on('request',(req,res) => {
//     console.log('成功',req,res);
// })
server.on('request',(req,res) => {
    // url 地址
    // method GET
    // const str = `哈哈哈哈 ${req.url} and ${req.method}`; // jing / and GET
    // console.log(str);
    // res.setHeader('Content-Type','text/html; charset=utf-8')
    // res.end(str);
    const url = req.url;
    let content = '<div>404</div>';
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if(url === '/about.html') {
        content = '<h1>关于</h1>'
    }

    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(content);
})

server.listen(80,() => {
    console.log('启动 http://127.0.0.1');
});


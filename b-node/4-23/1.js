app.get('/index.html',(req,res) => {
    // 1.要渲染的数据
    const user = {name:'zs',age:20}
    // 2. 服务器端通过字符串的拼接，动态生成html内容
    const html = `<h1>姓名：${user.name},年龄： ${user.age}</h1>`;
    // 3.把生成好的页面内容响应给客户端，因此，客户端拿到的好似带有真实数据的html，页面
    res.send(html);
})
const fs = require('fs');
const path = require('path');

// \s 比哦啊是空白字符 \S表示非空白字符 * 表示匹配任意次
const regStyle = /<style>[\s\S]*<\/style>/;

const regScript = /<script>[\s\S]*<\/script>/;

// s=使用fs模块读取需要被处理的html文件

fs.readFile(path.join(__dirname,'./4.html'),'utf-8',function(err,dataStr) {
    if (err) return console.log(err.message);
    console.log(dataStr)
})

resolveCss(dataStr);
resolveJs(dataStr);
resolveHTML(dataStr);


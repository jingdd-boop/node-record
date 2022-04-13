const fs = require('fs');

fs.writeFile('./2.txt','kk','utf-8',function(err,dataStr) {
    console.log(err); // 文件写入成功为null
    // 写入失败，返回错误对象
    console.log(dataStr);
})
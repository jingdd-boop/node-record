const fs = require('fs');
fs.readFile('./成绩.txt','utf-8',function(err,dataStr) {
    console.log(dataStr);
    if (err) {
        return console.log('读取文件失败')
    }
    const arrOld = dataStr.split(' ');

    const arrNew = [];

    arrOld.forEach(item => {
        arrNew.push(item.replace('=',': '));
    })

    const newStr =  arrNew.join('\r\n');

    fs.writeFile('./成绩-ok.txt',newStr,'utf-8',function(err,dataStr) {
        console.log(err);
        if (err) {
            return console.log('写入失败');
        }
    })
})


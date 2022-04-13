const fs = require('fs');

fs.readFileSync('./1.md','utf-8',function(err,dataStr) {
    if (err) {
        return console.log('错误了');
    }
})
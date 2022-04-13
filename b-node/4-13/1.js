const fs = require('fs');
fs.readFile('./text1.txt','utf8',function(err,dataStr) {
    console.log(err);
    console.log('...');
    console.log(dataStr);
})

console.log(__dirname)
// null
// ...
// hhh
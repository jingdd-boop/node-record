const path = require('path');

const fpath = '/a/b/c/index.html';//文件存在的路径

var fullName = path.basename(fpath);
console.log(fullName);
// index.html


var fullName1 = path.basename(fpath,'.html');
console.log(fullName1);
// index
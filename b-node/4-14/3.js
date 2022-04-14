const path = require('path');

const fpath = '/a/b/c/index.html';//路径字符串

const fext = path.extname(fpath);
console.log(fext); // .html
const path = require('path');

const pathstr = path.join('/a','/b/c','../','./d','e');
// ../ 有抵消路径的效果，注意下
console.log(pathstr)

const pathstr2 = path.join(__dirname,'./a');
console.log(pathstr2);

// /a/b/d/e
// /Users/wangpangzi/Desktop/node-record/b-node/4-14/a
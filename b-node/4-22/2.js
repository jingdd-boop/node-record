// 在一个自定义模块中，默认情况下，module.exports = {};

const age = 24;

// 向module.exports对象上挂载username属性
module.exports.username = 'zhangsan';

module.exports.sayhello = function() {
    console.log('hello');
}

module.exports.age = age;
module.exports.username = 'zhangsan'; //module.exports上挂载username

module.exports.sayhello = function() {  //module.exports上挂载函数sayhello
    console.log('hello');
}


// module.exports指向全新的对象
module.exports = {
    name: 'jing',
    sayhi() {
        console.log('0')
    }
}


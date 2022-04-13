# node 基础知识
## commonjs 规范

每个.js文件都是哟个模块

- 导入：
require
- 导出：
module.export

## 深入了解模块原理

当我们编写JavaScript时，我们可以声明全局变量
```js
var s = 'global';
```

在浏览器中，大量使用全局变量不是很好

a.js  b.js同事使用全局变量s，就会造成一些问题。

js 语言本身并没有一种模块机制可以保证不同模块可以使用相同的变量名。

那么node.js时如何实现模块化的呢？

实现模块这个功能，并不需要语法层面上得支持，node.js也没有增加js语法，实现模块功能在于js是一种函数式编程语言，它支持`闭包`，如果我们把一段js代码用一个含税包装起来，这段代码得所愿全局变量都会编程含税内部得局部变量。

```js
var s = 'hello';
var name = 'world;

console.log(s + ' ' + name + '!');
```

当node.js加载完这段代码后，它可以把代码包装一下，变成这样执行：

```js
(
    function() {
        var s = 'heell';
        var name = 'world';

        console.log(s + '' + name + '!');
    }
)
```

这样一来，原来全局变量s现在变成了匿名含税内部得局部变量，如果node.js继续加载其他模块，这些模块定义得全局变量s，也不会互相干扰。

所以，node利用js的函数式编程的特性，实现了模块的隔离


但是module.export又是如何实现的呢？

node 可以先准备一个对象module

```js
    var module = {
        id: 'hello',
        export: {}
    };

    var load = function (module) {
        function greet(name) {
            console.log('hjell' + name + '!');
        }

        module.exports = greet;

        return module.exports;
    };

    var exported = load(module);

    save(module,exported);
```

## node基本模块

node.js是运行在服务器端的javascript环境，服务器程序和浏览器程序相比，最大的特点是没有浏览器的安全限制了，而且服务器程序必须能接收网络请求，读写文件，处理二进制内容，所以，node.js内置的常用模块就是为了实现基本的服务器功能。

这些模块在浏览器环境中是无法被执行的，因为他们底层代码是用c/c++在node.js运行环境中实现的。

### Global
在javascript中，有且有一个全局对象，在浏览器中交window对象，在node.js环境中，也有一个唯一的全局变量，交global

这个对象的属性和方法和浏览器环境的window不同，

在node.js交互环境，可以输入：
```js
> global.console
Console {
  log: [Function: bound ],
  info: [Function: bound ],
  warn: [Function: bound ],
  error: [Function: bound ],
  dir: [Function: bound ],
  time: [Function: bound ],
  timeEnd: [Function: bound ],
  trace: [Function: bound trace],
  assert: [Function: bound ],
  Console: [Function: Console] }
```


### process
process也是node.js提供的一个对象，它代表当前node.js进程，通过process对象可以拿到许多有用的信息。
```js
> process === global.process;
true
> process.version;
'v5.2.0'
> process.platform;
'darwin'
> process.arch;
'x64'
> process.cwd(); //返回当前工作目录
'/Users/michael'
> process.chdir('/private/tmp'); // 切换当前工作目录
undefined
> process.cwd();
'/private/tmp'
```

js是由时间驱动执行的单线程模型，node.js也是一样的，node.js不断执行响应事件的js含税，直到没有任何响应事件的含税可以执行，node.js就退出了

如果想在下一次事件响应中执行diamante，可以调用 process.nextTick();

```js
// test.js

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
    console.log('nextTick callback!');
});
console.log('nextTick was set!');
```
输出
```js
nextTick was set!
nextTick callback!
```
传入process.nextTick()的函数不是立刻执行，而是要等到下一次事件循环


node.js进程本身的事件就是由process对象来处理，如果我们响应exit事件，就可以在程序即将退出时执行摸个回调函数。
```js
// 程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});
```

## 判断js执行环境
js代码可以在浏览器里面执行，也可以在node环境中执行
```js
if (typeof(window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}
```


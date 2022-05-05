创建 react+ts 项目
npx create-react-app testproject --template typescript

按照 react-router
npm install -S react-router-dom

# hooks

就是解决函数组件没有 state，生命周期，逻辑不能复用的一种技术方案，hooks 就是可以让你不编写 class 组件去使用 state 和其他的特性。

问题： 1.在无状态组件每一次函数上下文执行的时候，react 用什么方式记录了 hooks 的状态

2. 多个 react-hooks 用什么来记录每一个 hooks 的顺序？为什么不能在条件语句中声明 hooks，hooks 声明为什么要在组件的最顶部

3. function 函数组件中的 useState，和 class 类组件的 setState 有什么区别

4. react 是怎么捕获到 hooks 的执行上下文的？

5. useEffect，useMemo，为什么 useRef 不需要依赖注入，就可以访问到最新的改变值？

6. useMemo 是怎么对值做缓存呢？如何使用进行优化性能？

7. 使用 useState 函数组件不更新？

## function 组件和 class 组件的本质区别

class 代码：
下面这段代码，控制台输出 0 0 0 0 1

```js
import React from 'react';

class About extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      number: 0,
    };
  }
  handerClick = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.setState({ number: this.state.number + 1 });
        console.log(this.state.number);
      }, 1000);
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.handerClick}>num++</button>
      </div>
    );
  }
}

export default About;
```

function 代码：
点击按钮后，控制台输出：0 0 0 0 0

```js
import React from 'react';

function Home() {
  const [num, setNumber] = React.useState(0);
  const handerClick = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setNumber(num + 1);
        console.log(num);
      }, 1000);
    }
  };
  return <button onClick={handerClick}>{num}</button>;
}

export default Home;
```

我们梳理一下执行一次 setNumber 的流程：

1. 执行 setNumber 后，会导致组件 function 重新，所有语句会被重新调用执行
2. 走到 useState 的时候，react 内部其实走了 updateState，拿到最新的状态：1，此时一切正常
3. 走到 handerClick，此时 handerClick 被重新创建，即 handerClick 指向了新的内存空间，值得注意的是：for 循环接着往下走的时候，num 所在的上下文并不是当前函数（新创建的函数），而是第一次初始化时创建的函数，而那个函数的上下文中，num 永远都是 0，所以 console.log 输出都是 0
   相反：class 写法，state 发生变化 handerClick 没有被重新创建而已，并且 this 指向也没发生改变

## 1.揭开 hooks 的面纱

react/packages/react/src/ReactHooks.js

useState 做了什么？

```js
// useState函数
export function useState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  // 执行resolveDispatcher方法，并且得到一个对象dispatcher
  return dispatcher.useState(initialState);
  // 将参数initialState传给函数dispatcher.useState(initialState)，执行后返回该值
}

// resolveDispatcher函数
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher;
  // 取到ReactCurrentDispatcher对象上的current值，并且返回
}

// ReactCurrentDispatcher对象
const ReactCurrentDispatcher = {
  current: null, // 可以看到，初始化为null
};
```

## 2.从无状态组件函数说起

从根源开始理解 hooks，上面我们说到 useState 里面执行，最后到 ReactCurrentDispatcher 对象里面值 current: null，接下来我们只能从`函数组件执行`开始。

首先我们需要知道 function 函数组件运行从哪里开始呢？了解这个可以知道组件代码的运行顺序：

react/packages/react-reconciler/src/ReactFiberBeginWork.new.js

function 组件的初始化：
对于初始化是没有 current 树的，之后完成一次组件更新后，会把当前 workInProgress 树赋值给 current 树。

```js
renderWithHooks(
  null, // current Fiber
  workInProgress, // workInProgress Fiber
  Component, // 函数组件本身
  props, // props
  context, // 上下文
  renderExpirationTime // 渲染 ExpirationTime
);
```

function 组件的更新

```js
renderWithHooks(
  current,
  workInProgress,
  render,
  nextProps,
  context,
  renderExpirationTime
);
```

我们从上边可以看出来，renderWithHooks 函数作用是调用 function 组件函数的主要函数。我们重点看看 renderWithHooks 做了些什么

renderWithHooks react-reconciler/src/ReactFiberHooks.js

所有的函数组件执行，都是在这里方法中,首先我们应该明白几个感念，这对于后续我们理解 useState 是很有帮助的。

- current fiber 树：
  当完成一次渲染之后，会产生一个 current 树，current 会在 commit 阶段替换成真实的 Dom 树

- workInProgress fiber 树：
  即将调和渲染的 fiber 树。再一次新的组件更新过程中，会从 current 复制一份作为 workInProgress,更新完毕后，将当前的 workInProgress 树赋值给 current 树。

- workInProgress.memoizedState：
  在 class 组件中，memoizedState 存放 state 信息，在 function 组件中，这里可以提前透漏一下，memoizedState 在一次调和渲染过程中，以链表的形式存放 hooks 信息。

- workInProgress.expirationTime：
  react 用不同的 expirationTime,来确定更新的优先级

- currentHook：
  可以理解 current 树上的指向的当前调度的 hooks 节点

- workInProgressHook
  可以理解 workInProgress 树上指向的当前调度的 hooks 节点。

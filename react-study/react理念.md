首先是 react 解决的问题：官网上说 React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式，说明关键是实现快速响应这个点。

那么直接制约快速响应的因素是什么？

- CPU 瓶颈：当代码中有大量的计算操作导致设备性能不足，页面卡顿
- IO 瓶颈：发送网络请求后，需要等待一段时间，数据才能返回，导致不能快速响应。

react 在这两个方向上做的工作。

- 在浏览器每一帧的时间中，预留一些时间给 js 线程（5ms）
- 将同步的更新->可以中断的异步更新，当没有全部更新完，就显示之前的页面。

## React15 及之前的 React 架构：

分成了两层

- 协调器 Reconciler：负责找出变化的组件
- 渲染器 Renderer ： 负责将变化的组件渲染到页面上

Reconciler 协调器：
react 中可以通过 this.setState，ReactDOM.render 等 API 触发更新

每当有组件发生更新时，Reconciler 会做下面的工作：

1. 调用函数或者 class 组件的 render 方法，将返回的 JSX 转化成虚拟 Dom
2. 将虚拟 Dom 和上次更新时的虚拟 Dom 对比
3. 通过对比出本次更新中变化的虚拟 Dom
4. 通知 Renderer 将变化的虚拟 Dom 渲染到页面上

Renderer：渲染器：

不同平台使用对应不同的渲染器，浏览器使用的好似 ReactDOM

React15 架构的特点，在 Reconciler 中，mount 的组件会调用 mountComponent，update 组件会调用 updateComponent，这两个方法都是递归调用更新子组件，

递归更新的特点：更新一旦开始，中途无法终端，当层级比较深，超管 16ms，用户交互就会卡顿。

使用可中断的异步更新，代替同步更新。

## React16 新架构

- 调度器 Scheduler：调度任务的优先级，高优任务优先进入 Reconciler
- 协调器 Reconciler：负责找出变化的组件 （有区别）
- 渲染器 Renderer：

### 调度器 Scheduler

新增的 Scheduler，我们以浏览器是否有剩余时间作为任务中断的标准，那么需要一种机制，当浏览器有剩余时间就通知我们。除了在空闲时触发回调的功能外，Scheduler 还提供了多种调度优先级供任务设置。

### 协调器 Reconciler （使用 Fiber 架构）

在 React15 中 Reconciler 是递归处理虚拟 DOM 的。在 React16 中，Reconciler 与 Renderer 不再是交替工作。当 Scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 DOM 打上代表增/删/更新的标记，类似这样：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

`整个 Scheduler 与 Reconciler 的工作都在内存中进行。只有当所有组件都完成 Reconciler 的工作，才会统一交给 Renderer。`

### 渲染器 Renderer：

Renderer 根据 Reconciler 为虚拟 DOM 打的标记，同步执行对应的 DOM 操作。

工作都在内存中进行，不会更新页面上的 DOM，所以即使反复中断，用户也不会看见更新不完全的 DOM

## Fiber 架构

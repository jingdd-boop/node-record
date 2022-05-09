class AppClass extends React.Component {
    render() {
      return <p>KaSong</p>
    }
  }
  console.log('这是ClassComponent：', AppClass);
  console.log('这是Element：', <AppClass/>);


  function AppFunc() {
    return <p>KaSong</p>;
  }
  console.log('这是FunctionComponent：', AppFunc);
  console.log('这是Element：', <AppFunc/>);

//   {
//     $$typeof: Symbol(react.element),
//     key: null,
//     props: {},
//     ref: null,
//     type: ƒ AppFunc(),
//     _owner: null,
//     _store: {validated: false},
//     _self: null,
//     _source: null
//   }

// Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
// Reconciler（协调器）—— 负责找出变化的组件
// Renderer（渲染器）—— 负责将变化的组件渲染到页面上


// 无法通过引用类型区分函数组件和类组件
AppClass instanceof Function === true;
AppFunc instanceof Function === true;

// React通过ClassComponent实例原型上的isReactComponent变量
// 判断是否是ClassComponent。

ClassComponent.prototype.isReactComponent = {};

// JSX是一种描述当前组件内容的数据结构，它不包含schedule、reconcile、render

- 组件在更新中的优先级
- 组件的state
- 组件被打上的用于Renderer的标记

// 这些内容都有包含在Fiber节点中，所以在组件mount的时候，
// Reconciler根据JSX描述的组件内容生成组件对于的Fibier节点

// 在update时，Reconciler将JSX与Fiber节点保存的数据进行对比，
// 生成组件对应的Fiber节点，并根据对比结果为Fiber节点打上标记

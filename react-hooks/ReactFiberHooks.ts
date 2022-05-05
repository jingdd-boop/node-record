// @ts-nocheck
// react/packages/react-reconciler/src/ReactFiberHooks.new.js

// 所有的函数执行都在这个函数里面
export function renderWithHooks<Props, SecondArg>(
    current: Fiber | null,
    workInProgress: Fiber,
    Component: (p: Props, arg: SecondArg) => any,
    props: Props,
    secondArg: SecondArg,
    nextRenderLanes: Lanes,
  ): any {
    renderLanes = nextRenderLanes;
    currentlyRenderingFiber = workInProgress;


    //首先先置空即将调和渲染的workInProgress树的memoizedState和updateQueue
    workInProgress.memoizedState = null;
    workInProgress.updateQueue = null;
    // 在接下来的函数组件组件执行过程中，要把新的hooks信息挂载带这两个属性上
    // 在commit阶段，将workInProgress树替换成current树，替换真实的DOM元素节点
    // 并在current树保存hooks信息
    workInProgress.lanes = NoLanes;


    let children = Component(props, secondArg);

    if (didScheduleRenderPhaseUpdateDuringThisPass) {

      let numberOfReRenders: number = 0;
      do {
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        localIdCounter = 0;

        if (numberOfReRenders >= RE_RENDER_LIMIT) {
          throw new Error(
            'Too many re-renders. React limits the number of renders to prevent ' +
              'an infinite loop.',
          );
        }

        numberOfReRenders += 1;

        currentHook = null;
        workInProgressHook = null;

        workInProgress.updateQueue = null;

        ReactCurrentDispatcher.current = __DEV__
          ? HooksDispatcherOnRerenderInDEV
          : HooksDispatcherOnRerender;

        children = Component(props, secondArg);
      } while (didScheduleRenderPhaseUpdateDuringThisPass);
    }

    ReactCurrentDispatcher.current = ContextOnlyDispatcher;

    const didRenderTooFewHooks =
      currentHook !== null && currentHook.next !== null;

    renderLanes = NoLanes;
    currentlyRenderingFiber = null;

    currentHook = null;
    workInProgressHook = null;

    didScheduleRenderPhaseUpdate = false;

    if (didRenderTooFewHooks) {
      throw new Error(
        'Rendered fewer hooks than expected. This may be caused by an accidental ' +
          'early return statement.',
      );
    }

    if (enableLazyContextPropagation) {
      if (current !== null) {
        if (!checkIfWorkInProgressReceivedUpdate()) {

          const currentDependencies = current.dependencies;
          if (
            currentDependencies !== null &&
            checkIfContextChanged(currentDependencies)
          ) {
            markWorkInProgressReceivedUpdate();
          }
        }
      }
    }
    return children;
  }
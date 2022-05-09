// 判断是否为合法的React Element
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}

//所有JSX在运行时的返回结果
// 即React.createElement()的返回值，都是React Element。

// JSX和React Copmponent的关系

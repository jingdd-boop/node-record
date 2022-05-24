import React, { useEffect, useState } from "react";
import './TestPage.css';

function TestPage() {
  console.log('1')
  const [num,setNum] = useState(0)
  const [count,setCount] = useState(0)

  useEffect(() => {
    console.log('4')
  },[])

  useEffect(() => {
    console.log('5')
    // setCount(count => count + 1)
  },[num])


    return (
      <>
      {console.log('3')}
       <button className="App" onClick={() => {setNum(num => num+1)}}>
          {num}
          {/* 每次点击按钮的时候，会调用setNum方法，整个组件都会被重新加载一遍 */}
        </button>
      </>
    );
  }

  export default TestPage;

import React from './react';
import ReactDOM from './react-dom';

/**
 * 模拟实现react原生组件的渲染
 * 
 * react 17之前，react编译jsx是生成createElement函数执行返回虚拟DOM createElement('h1', 'hello react') 
 * react 17 之后  react编译jsx 是通过 require('jsx-transform')('h1') 所以要实现模拟react 17 之前的react 就需要在package.json中间中加多一个配置
 * set DISABLE_NEW_JSX_TRANFORM = true
 */

// 函数式组件
function FunctionComponent(props) {
  return (
    <div className="title" style={{color: '#fff', backgroundColor: 'red'}}>
        <span>{props.name}</span>
        {props.children}
    </div>
  )
}

ReactDOM.render(<FunctionComponent name="zhufeng">
  <span>world</span>
</FunctionComponent>,
  window.root);


import React from './react';
import ReactDOM from './react-dom';

/**
 * 模拟实现react原生组件的渲染
 * 
 * react 17之前，react编译jsx是生成createElement函数执行返回虚拟DOM createElement('h1', 'hello react') 
 * react 17 之后  react编译jsx 是通过 require('jsx-transform')('h1') 所以要实现模拟react 17 之前的react 就需要在package.json中间中加多一个配置
 * set DISABLE_NEW_JSX_TRANFORM = true
 */

let element1 = (
  <div className="title" style={{color: 'red', backgroundColor: 'blue'}}>
      <span>Hello</span> World
  </div>
);
// element1 通过 React.createElement编译成下面的格式：

console.log('element1', element1);
/**
 * React.creatElement(元素类型type, 配置项config, 子元素children) 函数执行返回的js对象（虚拟DOM） 主要的属性是props跟type
 * {
    props: {
      className: "title",
      style: {
        color: 'red'
      },
      children: [
        {
          props: {
            children: "Hello"
          },
          type: 'span',

        }
        'wold'
      ]
    },
    type: "div"
 * }
 * 
 */

ReactDOM.render(element1,
  window.root);

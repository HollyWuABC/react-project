import React from 'react';
import ReactDOM from 'react-dom';

// jsx 编译成createElement是在webpack编译的时候，也就是打包执行的时候，这个时候只编译语法（jsx转成es5或者es6），不执行代码
// 打包后的代码在浏览器执行的时候 ，会执行createElement函数，返回一个js对象，即虚拟DOM 虚拟DOM 在浏览器render的时候会转成真实DOM
let element1 = <h1 style={{color: 'red', background: '#eee'}}>Hello React</h1>; // 会被编译成createElement函数 返回一个js对象 即虚拟DOM
let element2 = React.createElement("h1", {
  class: "title"
}, "hello react", /*#__PURE__*/React.createElement("span", null, "123"));

// let element = function greetings(name) {
//   if (name) {
//     return `hello ${name}`
//   };
//   return `hello stranger`;
// }
let list = ['张三', '里斯', '王五'];
let element3 = list.map(name => <li key={name}>{name}</li>)
console.log('element1', element1);
console.log('element2', element2);
/**
 * 虚拟DOM 的格式
 * {
    key: null,
    type: 'h1',
    props:{
      children: [
        "hello react",
      {
          props: {
            children: '123' // 如果是只有一个子元素的话，就是字符串 如果超过一个就是数组
          },
          type: 'span',

      }
    ],
      class: "title"
    }
 * }
 * 
 */

// 虚拟DOM 在render的时候会编成真实DOM
ReactDOM.render(<ul>{element3}</ul>,
  document.getElementById('root')
);


import React from './react';
import ReactDOM from './react-dom';

/** 
 * 类式组件和类组件的更新
 * 
 */

class Counter extends React.Component{
  constructor(props) {
    super(props); // 继承父组件传过来的属性  不能修改 只读
    this.state = { // 状态是组件自己维护的
      number: 0
    };
  }
  handleClick = () => { // 这里的方法注意this指向的绑定 可以通过箭头函数  或者call  或者bind
    // 类组件 修改子组件的状态 state 只能通过setState
    this.setState({number: this.state.number + 1});
  }
  render() { // render里是子组件实现渲染的方法
    return(
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter/>,
  window.root);

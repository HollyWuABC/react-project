import {createDOM} from './react-dom';

class Component{
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
    }
    setState(partialState) { // 前面可以直接调用 this.setState()  证明这个setState方法是在Component构造函数上
        let state = this.state;
        this.state = {...state, ...partialState}; // 合并属性
        // 拿到新属性之后重新渲染
        let newVdom = this.render();
        updateClassComponent(this, newVdom);
    }
    render() {
        throw new Error('此方法为抽象方法， 需要需要子类实现')
    }
}

function updateClassComponent(calssInstance, newVdom) {
    let oldDOM = calssInstance.dom; //  拿到类组件上次渲染出来的真实dom
    let newDOM = createDOM(newVdom);
    oldDOM.parentNode.replaceChild(newDOM, oldDOM); // dom替换
    calssInstance.dom = newDOM;
}

export default Component;
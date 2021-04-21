
import Component from './Component';

/**
 * createElement 接收的参数, 最后返回一个对象 包含props type
 * @param {*} type 元素类型
 * @param {*} config 配置项 包含用户配置的属性
 * @param {*} children 子项
 */
function createElement (type, config, children) {
    // 去掉配置项中的包含__的项
    if(config) {
        delete config.__source;
        delete config.__self;
    }
    
    let props = {...config};
    if(arguments.length > 3) { // 证明有多个子元素
        children = Array.prototype.slice.call(arguments, 2); // 去掉前面的 type跟config元素
    }
    props.children = children; // 最终主要返回的是{props: {className: '', style: {}, children: []}, type: type}的格式
    return {
        props,
        type
    }
}

const React = {createElement, Component}; // 即React中就包含了createElement方法
export default React;
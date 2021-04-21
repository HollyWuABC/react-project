/**
 * 实现步骤：
 * 1. 把虚拟DOM 变成真实DOM dom
 * 2. 把虚拟DOM 上的属性同步更新到真实DOM 上
 * 3. 把虚拟DOM 的子元素也变成真实DOM 挂载在到对应的真实DOM 上 利用dom.appendChild()
 * 4. 把真实DOM 挂载在容器上
 * 
 * @param {*} vdom 有可能是一个字符串 也有可能是对象,即由createElement返回的虚拟DOM，
 * @param {*} container  挂载的容器
 */
function render(vdom, container) {
    const dom = createDOM(vdom); // 把虚拟dom变成真实dom
    container.appendChild(dom); // 把真实dom挂载在容器上
}
/**
 * 
 * @param {} vdom 
 */
export function createDOM(vdom) {
    // 如果vom是数字或者字符串，直接返回一个真实的文本节点
    if(typeof vdom === 'number' || typeof vdom === 'string') {
        return document.createTextNode(vdom);
    }
    // 否则就是由createElement产生的虚拟DOM
    let { type, props } = vdom;
    let dom;
    if (typeof type === 'function') { // 自定义函数式组件
        if (type.isReactComponent) { // 类式组件
            return mountClassComponent(vdom);
        } else { // 函数式组件
            return mountFunctionComponent(vdom);
        }
    } else {
        dom = document.createElement(type); // 如果是原生组件 直接创建真实元素
    }
    
    // 利用虚拟DOM 的属性 更新真实DOM 的class，style等属性 
    updateProps(dom, props);
    
    // 在这里单独处理 props.children 属性

    // 如果子元素是字符串或数字 直接将children的值赋给真实dom的文本
    if (typeof props.children === 'number' || typeof props.children === 'string') {
        dom.textContent = props.children;
    } else if (typeof props.children === 'object' && props.children.type) {
        // 如果是对象， 则递归调用render方法 dom将儿子们挂载在自己身上
        render(props.children, dom);
    } else if (Array.isArray(props.children)) {
        // 如果是数组 则单独处理
        reconcileChildren(props.children, dom);
        
    } else {
        // 不属于以上的情况  则给出一个错误提示
        document.textContent = props.children ? props.children.toString() : '';
    }
    return dom; // 返回真实dom
}

/**
 * 
 * @param {*} vdom 虚拟dom
 */
function mountClassComponent(vdom) {
    // 解构类的定义和类属性对象
    let {type, props} = vdom;
    // 创建类的实例
    let classInstance = new type(props);
    // 调用实例的render方法 创建虚拟DOM
    let renderVdom = classInstance.render();
    // 根据虚拟DOM 创建真实的DOM 对象
    let dom =  createDOM(renderVdom);
    
    // 为之后类组件更新方便 把真实dom挂载到类的实例上
    classInstance.dom = dom;
    return dom;
}

/**
 * 处理函数式组件
 * @param {} vdom 
 */
function mountFunctionComponent(vdom) {
    let {type: FunctionComponent, props} = vdom;
    let renderVdom = FunctionComponent(props); // 函数执行返回虚拟DOM
    return createDOM(renderVdom); // 递归
}

/**
 * 处理类型为数组时
 * @param {*} childrenVdom 
 * @param {*} parentDom 
 */
function reconcileChildren(childrenVdom, parentDom) {
    for(let i = 0; i < childrenVdom.length; i++) {
        // 递归渲染
        render(childrenVdom[i], parentDom);
    }
}
/**
 * 
 * @param {} dom  真实DOM
 * @param {*} newProps 属性 注意style跟children需要单独出来
 */

function updateProps(dom, newProps) {
    for(let key in newProps) {
        // children属性单独处理
        if (key === 'children') continue;
        // 原生js的DOM 不支持处理对象形式的属性,因此style也要单独拿出来
        if (key === 'style') {
            let styleObj = newProps.style;
            for(let attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        } else if (key.startsWith('on')) { 
            // 表示是方法  需要将传入的onClick 转成 真实dom的onclick
            dom[key.toLocaleLowerCase()] = newProps[key];
        } else {
            dom[key] = newProps[key]; // 像classname，id 等属性可以直接付给真实dom
        }
    }
}

const ReactDOM = {render};
export default ReactDOM;
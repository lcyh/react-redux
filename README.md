### Redux和React Redux实现原理

Redux是javascript应用的状态容器， 保证程序行为的一致性且易于测试。

简单流程梳理：

**1.Redux**

Redux源码主要分为以下几个模块文件:

* compose.js 提供从右到左进行函数式编程 (compose高阶函数)；
* createStore.js 提供作为生成唯一store的函数；
* combineReducers.js 提供合并多个reducer的函数，保证store的唯一性；
* bindActionCreators.js 可以让开发者在不直接接触dispacth的前提下进行更改state的操作；
* applyMiddleware.js 这个方向通过中间件来增强dispatch的功能 

**工作流程**

* 1.const store = createStore(fn) 产生数据 ;
* 2.action:{type: ’‘,payload:{}}定义行为;
* 3.dispatch 发起action: store.dispatch(action);
* 4.reducer:处理action,返回新的state 通俗点解释：
  * a).首先，用户通过VIew发出Action，发出方式就用到了dispatch方法
  * b).然后，dispatch函数里调用了Reducer,并且传入了两个参数：当前State和收到的Action，Reducer返回新的State；
  * c).State一旦有变化，Store就会调用subscribe监听函数，来更新View;

**2.react-redux**

React-redux核心模块：

* Provider：是class组件，通过Provider组件将store注入到全局的context里，Provider的作用是从最外部封装了整个应用，并向connect模块传递Store； 
* connect：是高阶组件，负责连接React和Redux，组件内可以通过全局的context拿到store，不用import引用了 ；

**工作流程**

* **获取state**:connect通过全局的context获取Provider中的store，通过stroe.getState()获取整个store tree上所有state;

* **包装原组件** :将store.state和store.dispatch传给mapStateToProps(this.context.store.state)和mapDispatchToPprops(this.context.store.dispacth)，并把connect中传入的mapStateToProps，mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent的props;

* **监听store tree的变化** :connect缓存了store tree中的state的状态，通过当前state状态和变更前state状态进行比较，从而确定了是否调用subscribe订阅的更新方法（this.setState()）触发Connect及其子组件的重新渲染; 

**在下⾯的场景中，引⼊ Redux 是⽐较明智的：**

- 你有着相当⼤量的、随时间变化的数据；
- 你的 state 需要有⼀个单⼀可靠数据来源；
- 你觉得把所有 state 放在最顶层组件中已经⽆法满⾜需要了。
- 某个组件的状态需要共享。

 **redux用法：**

* 1.需要一个store来存储数据；

* 2.store⾥的reducer初始化state并定义state修改规则；

* 3.通过dispatch一个action来提交对数据的修改；

*  4.action提交到reducer函数里，根据传入的action的type，返回新的state创建store； 
*  5.监听store tree的变化:connect缓存了store tree中的state的状态，通过当前state状态和变更前state状态进行比较，从而确定了是否调用this.setState()方法触发Connect及其子组件的重新渲染

* 6.redux是个纯粹的状态管理器，默认只支持同步，实现异步任务比如延迟，网络请求需要中间件的支持，比如我们经常使用的redux-thunk,redux-logger；

redux流程图：

<img src='https://image-c.weimobwmc.com/wrz/8ec9476dbed848389a12e24290e5af64.jpg'>

**redux Middleware实现中间件**

就是个函数，对store.dispatch方法进行拦截改造，在发出action和执行reducer这两步之间，添加其它的功能;

在redux中，我们中间件拦截的是dispatch提交到reducer这个过程，从而增强dispatch的功能。

<img src='https://user-gold-cdn.xitu.io/2019/12/27/16f44c0ad62d8656?imageslim'>



**缺陷:**

1.每个页面需要自己去引入store

2.页面上的数据更新要手动订阅及取消订阅

**react-redux**

提供了两个api:

* 1.Provider 为后代组件提供store 

* 2.connect 为组件提供数据和变更方法 
* 3.监听store tree的变化:connect缓存了store tree中的state的状态，通过当前state状态和变更前state状态进行比较，从而确定了是否调用this.setState()方法触发Connect及其子组件的重新渲染；

呈现代码宏出错: 参数'firstline'的值无效

```
<Provider store>
```

**<Provider store>**使组件层级中的connect()⽅方法都能够获得 Reduxstore。正常情况下，你的根组件应该嵌套在**<Provider>**中才能使用connect()方法。

connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]) 连接 React 组件与 Redux store。 返回⼀个新的与 Redux store 连接的组件类。

**connect参数:**

- mapStateToProps(state, [ownProps]): stateProps ] (Function) :

  > 该回调函数必须**返回⼀个纯对象**，这个对象会与组件的 props 合并。 如果定义该参数，组件将会监听 Redux store 的变化，否则 不监听。 ownProps 是当前组件⾃身的props，如果指定了，那么只要组件接收 到新的 props，mapStateToProps 就会被调⽤，mapStateToProps 都会被重新计算，mapDispatchToProps 也会被调⽤。注意性能！

- mapDispatchToProps(dispatch, [ownProps]): dispatchProps ] (Object or Function): 

  > 如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注⼊到你的组件 props 中。
  >
  > 1. **如果传递的是⼀个对象**，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的⽅法名将作为属性名；每个⽅法 将返回⼀个新的函数，函数中 dispatch ⽅法会将action creator的返回 值作为参数执⾏。这些属性会被合并到组件的 props 中。
  > 2. **如果传递的是⼀个函数**，该函数将接收⼀个 dispatch 函数，然后由 你来决定如何返回⼀个对象。 ownProps 是当前组件⾃身的props，如果指定了，那么只要组件接收 到新的 props， mapDispatchToProps 就会被调⽤。注意性能！ 

  **全局store使用**

  ```
  //index.js  Provider
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  // import {Provider} from "react-redux";
  import { Provider } from "./wReactRedux";
  import store from "./store";
  // 把Provider放在根组件外层，使⼦组件能获得store
  ReactDOM.render(
   <Provider store={store}>
   <App />
   </Provider>,
   document.getElementById("root")
  );
  ```

  ```
  //ReactReduxPage connect
  
  import React, { Component } from "react";
  import { connect } from "react-redux";
  class ReactReduxPage extends Component {
    render() {
      console.log("props==", this.props);
      let { count, dispatch, add, minus } = this.props;
      return (
        <div>
          ReactReduxPage
          <p>{count}</p>
          <button onClick={() => dispatch({ type: "ADD" })}>dispatch add</button>
          <button onClick={() => add(100)}>add</button>
          <button onClick={minus}>minus</button>
        </div>
      );
    }
  }
  const mapStateToProps = state => {
   return {
      num: state,
   };
  };
  const mapDispatchToProps = {
   add: () => {
      return { type: "add" };
   },
   minus: () => {
      return { type: "minus" };
   }
  };
  export default connect(
   mapStateToProps, //状态映射 mapStateToProps
   mapDispatchToProps, //派发事件映射
  )(ReactReduxPage);
  ```

  **详细使⽤**

  ```
  import React, {Component} from "react";
  import {connect} from "react-redux";
  import {bindActionCreators} from "redux";
  // connect⽤于连接React组件与store， 返回⼀个新的已经与store连接的组件类（HOC）
  export default connect(
   // mapStateToProps Fucntion
   // !慎重定义ownProps，因为你⼀旦定义ownProps，那么每当ownProps发⽣改变的时候，当前mapStateToProps     都会被调⽤，
   // !这⾥的state也会被重新计算，容易影响性能
   state => {
   // console.log("mapStateToProps"); //sy-log
      return {
      count: state
      };
   },
   // mapDispatchToProps Object Fucntion
   // Object 此时props中没有dispacth，但是有action creators，内部实现dispatch
   // {
   //     add: () => ({type: "ADD"}),
   //     minus: () => ({type: "MINUS"})
   // }
   // Fucntion 参数是dispatch与ownProps
   // !慎重定义ownProps，因为你⼀旦定义ownProps，那么每当ownProps发⽣改变的时候，当前mapStateToProps     都会被调⽤，容易影响性能
   (dispatch, ownProps) => {
      console.log("mapDispatchToProps--", ownProps); //sy-log
      let creators = {
          add: payload => ({type: "ADD", payload}),
          minus: () => ({type: "MINUS"})
      };
      creators = bindActionCreators(creators, dispatch);
      return {dispatch, ...creators};
   }
  )(
   class ReactReduxPage extends Component {
      add = () => {
      this.props.dispatch({type: "ADD"});
   };
   render() {
      console.log("props", this.props); //sy-log
      const {count, dispatch, add, minus} = this.props;
      return (
          <div>
              <h3>ReactReduxPage</h3>
              <p>omg:{count}</p>
              <button onClick={this.add}>add-usedispatch</button>
              <button onClick={() => add(100)}> add</button>
              <button onClick={minus}>minus</button>
          </div>
      );
      }
   }
  );
  ```

  **实现react-redux**

  ```
  //wReactRedux.js
  
  import React, {
    useContext,
    useEffect,
    useReducer,
    useLayoutEffect,
  } from "react";
  function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args));
  }
  export function bindActionCreators(creators, dispatch) {
    let obj = {};
    for (let key in creators) {
      obj[key] = bindActionCreator(creators[key], dispatch);
    }
    return obj;
  }
  /**
   * 1. store
   * 2. children
   */
  const ReduxContext = React.createContext();
  export function Provider({ store, children }) {
    return (
      <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
    );
  }
  
  // 高阶组件，接收一个组件，返回一个新组件
  export const connect = (
    mapStateToProps = (state) => state,
    mapDispathToProps
  ) => (WrappedComponent) => (props) => {
    /**
     * state 来自store
     */
    const store = useContext(ReduxContext);
    const { getState, dispatch, subscribe } = store;
    const stateProps = mapStateToProps(getState());
    let dispatchProps = { dispatch };
    if (typeof mapDispathToProps === "function") {
      dispatchProps = mapDispathToProps(dispatch);
    } else if (typeof mapDispathToProps === "object") {
      dispatchProps = bindActionCreators(mapDispathToProps, dispatch);
    }
    const [ignore, forceUpdate] = useReducer((x) => x + 1, 0);
    /**
     * useEffect 延迟执行
     * useLayoutEffect 同步执行
     * 防止订阅的过程中数据丢失，这里使用同步更新
     *  */
    useLayoutEffect(() => {
      const unSubscribe = subscribe(() => {
        // 执行forceUpdate
        forceUpdate();
      });
      // 取消订阅
      return () => {
        if (unSubscribe) {
          unSubscribe();
        }
      };
    }, [store]);
    return (
      <WrappedComponent
        {...props}
        {...stateProps}
        {...dispatchProps}
      ></WrappedComponent>
    );
  };
  ```

  **react-redux hooks API及实现**

  作用：逻辑复用，共享

  * useSelector 获取store 返回state

  * useDispatch 获取dispatch

```
import React, {useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
export default function ReactReduxHookPage({value}) {
 const dispatch = useDispatch();
 const add = useCallback(() => {
    dispatch({type: "ADD"});
 }, []);
 const count = useSelector(({count}) => count);
 return (
    <div>
        <h3>ReactReduxHookPage</h3>
        <p>{count}</p>
        <button onClick={add}>add</button>
    </div>
 );
}
```

**实现自定义Hooks**

```
// 自定义hook，返回store
export function useStore() {
  const store = useContext(ReduxContext);
  return store;
}
// 自定义hook，useSelector
export function useSelector(selector) {
  const store = useStore();
  const { getState, subscribe } = store;
  //   函数组件中实现forceUpdate
  const [ignore, forceUpdate] = useReducer((x) => x + 1, 0);
  // 更新state
  useLayoutEffect(() => {
    const unSubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, [store]);
  const selectState = selector(getState());
  return selectState;
}
// 自定义hook，useDispatch
export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}
```


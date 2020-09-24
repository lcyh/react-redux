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
  let obj = { dispatch };
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

/**
 * Provider 做了2个事情
 * 1. 传递store
 * 2. 接收children
 */

const ReduxContext = React.createContext();
export function Provider({ store, children }) {
  return (
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
  );
}

/**
 * connect
 * 高阶组件, 接收一个组件，返回一个新组件
 */

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
  console.log("ignore====", ignore);
  /**
   * useEffect 延迟执行
   * useLayoutEffect 同步执行
   * 防止订阅的过程中数据丢失，这里使用同步更新
   *  */
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

// 自定义hook，返回store
export function useStore() {
  const store = useContext(ReduxContext);
  return store;
}

// 自定义hook，useSelector
export function useSelector(selector) {
  const store = useStore();
  const { getState, subscribe } = store;
  // 函数组件中实现forceUpdate
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

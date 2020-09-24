export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    // 加强dispatch
    const middleApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    // 生成一个中间件链，给每个节点添加middleApi
    // 这些middleware本身没有store身上的方法，需要使它们具备这些方法则传递给它
    const middlewaresChain = middlewares.map((middleware) =>
      middleware(middleApi)
    );
    dispatch = compose(...middlewaresChain)(dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => {
    return (...args) => {
      return a(b(...args));
    };
  });
}

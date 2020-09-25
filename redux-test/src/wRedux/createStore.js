function createStore(reducer, enchace) {
  if (enchace) {
    // 加强dispatch
    return enchace(createStore)(reducer);
  }
  let currentState;
  let currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    //   改变当前state
    currentState = reducer(currentState, action);
    // 通知view去刷新数据
    currentListeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  function subscribe(listener) {
    currentListeners.push(listener);
    // 取消监听
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({
    type: "w/xxxxxxyyyy",
  });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore;

// function fn1() {}
// function fn2() {}
// function fn3() {}
// let arr = [fn1, fn2, fn3];
// let index = arr.indexOf(fn2);
// console.log("index", index, arr);
// arr.splice(index, 1);
// console.log("newArr", arr);

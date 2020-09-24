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

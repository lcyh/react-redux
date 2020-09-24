// import { createStore, applyMiddleware } from "redux";
import { createStore, applyMiddleware } from "../wRedux";
import isPromise from "is-promise";

// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";

export const CounterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};

const store = createStore(
  CounterReducer,
  applyMiddleware(thunk, logger, promise)
);
export default store;

function logger({ getState }) {
  // 让dispatch前后各执行下getState
  return (next) => (action) => {
    console.log("next" + "执行了", next(action));
    let preState = getState();
    console.log("preState", preState);
    let returnVal = next(action);
    console.log("returnVal", returnVal.type);
    const nextState = getState();
    console.log("nextState", nextState);
  };
}

function thunk({ getState, dispatch }) {
  // 处理异步，如果是对象直接返回，函数直接执行
  return (next) => (action) => {
    console.log("自己的thunk", 14555);
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function promise({ dispatch }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}

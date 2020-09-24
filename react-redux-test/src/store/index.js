import { createStore, combineReducers } from "redux";
export const couterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case "ADD":
      console.log("state===", state);
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};
const store = createStore(combineReducers({ count: couterReducer }));

export default store;

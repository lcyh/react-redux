import React, { Component } from "react";

import store from "../store";
console.log("store===", store);
export default class ReduxPage extends Component {
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount = () => {
    if (this.unSubscribe) {
      this.unSubscribe();
    }
  };
  add = () => {
    store.dispatch({
      type: "ADD",
      payload: 10,
    });
    console.log("store", store.getState());
  };
  minus = () => {
    store.dispatch({
      type: "MINUS",
    });
  };
  asyncAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({
          type: "ADD",
        });
      }, 1000);
    });
  };
  promiseMinus = () => {
    return store.dispatch(
      Promise.resolve({
        type: "MINUS",
      })
    );
  };
  render() {
    return (
      <div>
        <p>{store.getState()}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.asyncAdd}>asyncAdd</button>
        <button onClick={this.promiseMinus}>promiseMinus</button>
      </div>
    );
  }
}

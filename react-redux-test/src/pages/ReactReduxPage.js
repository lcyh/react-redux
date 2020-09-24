import React, { Component } from "react";
import { Button } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import { bindActionCreators, connect } from "../wReactRedux";

@connect(
  // mapStateToProps
  ({ count }) => ({ count }),
  // mapDispathToProps   object | function

  {
    add: (payload) => ({ type: "ADD", payload }),
    minus: () => ({ type: "MINUS" }),
  }

  // (dispatch) => {
  //   let creators = {
  //     // 第一种方式可以直接加dispatch
  //     // add: () => dispatch({ type: "ADD" }),
  //     // minus: () => dispatch({ type: "MINUS" }),
  //     // 第二种方式 bindActionCreators
  //     add: (payload) => ({ type: "ADD", payload }),
  //     minus: () => ({ type: "MINUS" }),
  //   };
  //   creators = bindActionCreators(creators, dispatch);
  //   return {
  //     dispatch,
  //     ...creators,
  //   };
  // }
)
class ReactReduxPage extends Component {
  render() {
    console.log("props==", this.props);
    let { count, dispatch, add, minus } = this.props;
    return (
      <div>
        ReactReduxPage
        <p>{count}</p>
        <Button onClick={() => dispatch({ type: "ADD" })}>dispatch add</Button>
        <Button onClick={() => add(100)}>add</Button>
        <Button onClick={minus}>minus</Button>
      </div>
    );
  }
}

export default ReactReduxPage;

import React, { useCallback } from "react";
import { Button } from "antd";
// import { useSelector, useDispatch } from "react-redux";

import { useSelector, useDispatch } from "../wReactRedux";

export default function ReduxHooksPage(props) {
  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({ type: "ADD" });
  }, []);

  return (
    <div>
      <h3>ReduxHooksPage</h3>
      <p>{count}</p>
      <Button onClick={add}>add</Button>
    </div>
  );
}

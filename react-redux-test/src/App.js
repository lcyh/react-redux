import React, { useState } from "react";
import { Button } from "antd";
import logo from "./logo.svg";
import "./App.css";

import ReactReduxPage from "./pages/ReactReduxPage";
import ReduxHooksPage from "./pages/ReduxHooksPage";

function App(props) {
  const [state, setState] = useState(0);
  return (
    <div className="App">
      <Button onClick={() => setState(state + 1)} style={{ marginTop: 10 }}>
        add:{state}
      </Button>
      {/* <ReactReduxPage></ReactReduxPage> */}
      <ReduxHooksPage></ReduxHooksPage>
    </div>
  );
}

export default App;

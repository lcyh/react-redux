import React, { useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import ReduxPage from "./pages/reduxPage";

export default function App() {
  const [num, setNum] = useState(1);
  return (
    <div className="App">
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        change num {num}
      </button>
      <ReduxPage></ReduxPage>
    </div>
  );
}

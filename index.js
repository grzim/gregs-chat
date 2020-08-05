import React from "react";
import ReactDOM from "react-dom";
import App from "./src/components/App";

const rootHTML = document.getElementById("chat-root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootHTML
);

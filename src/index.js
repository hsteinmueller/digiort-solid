import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SessionProvider } from "@inrupt/solid-ui-react";
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider sessionId="react-sdk-example-project">
      <App />
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

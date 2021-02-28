import { StrictMode } from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { SessionProvider } from "@inrupt/solid-ui-react";
//import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <SessionProvider sessionId="react-sdk-example-project">
      <App />
    </SessionProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

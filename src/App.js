import React, { Fragment } from "react";
// import Routes from "./routes";

import { withWebId } from "@inrupt/solid-react-components";
import LoginComponent from "./components/login";
import WelcomeComponent from "./components/welcome";

// function App() {
//   return (
//     <Fragment>
//       <Routes />
//     </Fragment>
//   );
// }

// export default App;

function App(props) {
  const { webId } = props;
  return !webId ? (
    <LoginComponent />
  ) : (
    <WelcomeComponent />
  );
}

export default withWebId(App);

import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withWebId } from "@inrupt/solid-react-components";
import NavBar from "../nav-bar";

const WelcomeComponent = (props) => {
  const { webId } = props;

  return (
    <Fragment>
      <NavBar {...webId} />
      <div>hello</div>
    </Fragment>
  );
};

// this is the fix for HashRouter, copied from source
const withAuthorization = (Component, Loader) =>
  withWebId(
    class WithAuthorization extends React.Component {
      render() {
        const { webId } = this.props;
        switch (webId) {
          case undefined:
            return Loader || null;
          case null:
            // Using the non-SPA redirect here to clear the state when the user is not logged in
            // This helps with making sure state is fully clean on login, and addresses an issue with
            // the react-router-dom v5 upgrade, which didn't like using <Redirect> here
            // window.location.href = "/#/login"; // <= this is the fix

            // window.location = getLocation(window.location.href, "/#/login");
            // return null;

            return <Redirect to="/login" />;
          default:
            return <Component {...this.props} />;
        }
      }
    }
  );

export default withAuthorization(WelcomeComponent);

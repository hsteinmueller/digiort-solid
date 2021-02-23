import React, { memo } from "react";
import auth from "solid-auth-client";
// import { getLocation } from "../utils";

const NavBar = memo((props) => {
  const { webId } = props;

  const logOut = async () => {
    try {
      await auth.logout();

      // let logoutRedirect = "#/login";
      // let logoutRedirect = window.location.href;
      // It seems that solid-auth-client has an OIDC-compliance issue in the logout.
      // This bevahiour is accepted by the NSS IdP, but not by other OIDC-compliant IdPs.
      // This issue should be fixed in the upstream library, but in the meantime
      // the following is an acceptable **temporary** compatibility fix.
      // const authConfig = JSON.parse(localStorage.getItem("solid-auth-client"));
      // It happens that post_logout_redirect_uris is not defined by NSS IdP,
      // which enables discriminating when the issue is going to be encountered.
      // if (authConfig.rpConfig.registration.post_logout_redirect_uris) {
        // The user MUST be redirected to a page where they confirm they want to logout.
        // logoutRedirect =
          // authConfig.rpConfig.provider.configuration.end_session_endpoint;
      // }

      // Remove localStorage
      localStorage.removeItem("solid-auth-client");

      // Redirect to login page or to logout confirmation
      // window.location = logoutRedirect; // this doesn't work for urls with subpath
      // window.location = getLocation(window.location.href, logoutRedirect);
    } catch (error) {
      console.log("error logging out");
    }
  };

  return <button onClick={logOut}>LOGOUT</button>;
});

export default NavBar;

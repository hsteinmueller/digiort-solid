import React from "react";
import { ProviderLogin } from "@inrupt/solid-react-components";
// import { getLocation } from "../utils";

const LoginComponent = () => {
  // const callbackUri = `${window.location.href}/#/welcome#`;
  // const callbackUri = getLocation(window.location.href, "#/welcome#"); // hashtag at the end is important for redirect
  const callbackUri = window.location.href;
  return (
    <div>
      <a
        href="https://solidproject.org/users/get-a-pod"
        rel="noopener noreferrer"
        target="_blank"
        className="link"
      >
        Register for a solid identity
      </a>
      <ProviderLogin callbackUri={callbackUri} />
    </div>
  );
};

export default LoginComponent;

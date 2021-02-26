import React from "react";
import { ProviderLogin } from "@inrupt/solid-react-components";
import { getProviders } from "../../utils/providers";
import "bulma";
// import { getLocation } from "../utils";

const LoginComponent = () => {
  // const callbackUri = `${window.location.href}/#/welcome#`;
  // const callbackUri = getLocation(window.location.href, "#/welcome#"); // hashtag at the end is important for redirect
  const callbackUri = window.location.href;
  return (
    <div className="columns is-centered mt-6">
      <div className="box" style={{ width: "300px" }}>
        <a
          className="block button is-text is-light"
          href="https://solidproject.org/users/get-a-pod"
          rel="noopener noreferrer"
          target="_blank"
        >
          Register for a solid identity here
        </a>
        <p>or login here:</p>
        <ProviderLogin
          callbackUri={callbackUri}
          providers={getProviders()}
          theme={{
            buttonLogin: "button is-primary",
            inputLogin: "input",
            linkButton: "button is-text",
          }}
        />
      </div>
    </div>
  );
};

export default LoginComponent;

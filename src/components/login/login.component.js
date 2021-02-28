import { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { getProviders } from "../../utils/providers";
import "bulma";

const LoginComponent = () => {
  const callbackUri = window.location.href;
  const [selectedProvider, setProvider] = useState(getProviders()[0]);

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
        <p>or login with your provider:</p>
        {/* <ProviderLogin
          callbackUri={callbackUri}
          providers={getProviders()}
          theme={{
            buttonLogin: "button is-primary",
            inputLogin: "input",
            linkButton: "button is-text",
          }}
        /> */}

        <div className="block control has-icons-left">
          <div className="select">
            <select
              name="provider"
              onChange={(e) => setProvider(getProviders()[e.target.value])}
            >
              {getProviders().map((provider, index) => {
                return (
                  <option key={provider.id} value={index}>
                    {provider.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="icon is-small is-left">
            <img src={selectedProvider.image} alt="Provider logo"></img>
          </div>
        </div>
        <div className="block has-text-centered">
          <LoginButton
            oidcIssuer={selectedProvider.value}
            redirectUrl={callbackUri}
            authOptions={{}}
          >
            <button className="button is-primary">Log in</button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

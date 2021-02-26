import React, { memo, useState, useEffect } from "react";
import { LogoutButton } from "@inrupt/solid-ui-react";
import data from "@solid/query-ldflex";
import "bulma";

const NavBar = memo((props) => {
  const { webId } = props;
  const [name, setName] = useState(webId);

  useEffect(() => {
    (async () => {
      const user = data[webId];
      const nameLd = await user.vcard_fn;
      const name =
        nameLd && nameLd.value.trim().length > 0
          ? nameLd.value
          : webId.toString();
      setName(name);
    })();
  }, [webId]);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="is-align-self-center title pl-5">Hello, {name}!</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <LogoutButton onLogout={refresh}>
              <button className="button is-primary">Log out</button>
            </LogoutButton>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default NavBar;

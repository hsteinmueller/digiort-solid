import React, { memo, useState, useEffect } from "react";
import auth from "solid-auth-client";
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

  const logOut = async () => {
    try {
      await auth.logout();
      // Remove localStorage
      localStorage.removeItem("solid-auth-client");
    } catch (error) {
      console.log("error logging out");
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="is-align-self-center title pl-5">Hello, {name}!</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-primary" onClick={logOut}>
              <strong>Logout</strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default NavBar;

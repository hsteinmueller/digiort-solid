import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withWebId } from "@inrupt/solid-react-components";

const Layout = (props) => {
  const { component: Component, webId, ...rest } = props;
  return !webId ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to="/welcome" />
  );
};

export default withWebId(Layout);

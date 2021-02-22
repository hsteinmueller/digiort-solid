import React, { Fragment } from "react";
import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/layout";
import LoginComponent from "./components/login";
import WelcomeComponent from "./components/welcome";

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <Layout component={LoginComponent} path="/login" exact />
        <Redirect from="/" to="/welcome" exact />
        <Route path="/welcome" component={WelcomeComponent} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;

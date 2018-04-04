import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import LoadingScreen from "../components/organisms/LoadingScreen";

const Loading = () => <LoadingScreen />;

const Frontpage = Loadable({
  loader: () => import("../components/pages/Frontpage"),
  loading: Loading
});

const NotFound = Loadable({
  loader: () => import("../components/organisms/NotFound"),
  loading: Loading
});

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Frontpage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

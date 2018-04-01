import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import LoadingScreen from "../components/organisms/LoadingScreen";

const Loading = () => <LoadingScreen />;

const App = Loadable({
  loader: () => import("../components/pages/App"),
  loading: Loading
});

const NotFound = Loadable({
  loader: () => import("../components/organisms/NotFound"),
  loading: Loading
});

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

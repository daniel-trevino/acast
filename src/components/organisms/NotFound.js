import React from "react";
import RaisedButton from "material-ui/RaisedButton";

export default () => (
  <div className="not-found">
    <h1 className="App-title">404 ¯\_(ツ)_/¯</h1>
    <p>The page you are looking for has not been found.</p>
    <RaisedButton label="Take me back" primary href="/" />
  </div>
);

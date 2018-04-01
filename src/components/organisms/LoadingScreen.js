import React from "react";
import CircularProgress from "material-ui/CircularProgress";

export default () => (
  <div className="loading-screen">
    <CircularProgress size={100} thickness={6} />
  </div>
);

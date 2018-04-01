import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import { store } from "./configureStore";
import AppRoutes from "./Routes/";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/scss/theme.css";

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Provider } from "react-redux";
import { store } from "./configureStore";
import ThemeColors from "./components/atoms/ThemeColors";
import AppRoutes from "./Routes/";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/scss/theme.css";

const theme = getMuiTheme(ThemeColors);

ReactDOM.render(
  <MuiThemeProvider muiTheme={theme}>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();

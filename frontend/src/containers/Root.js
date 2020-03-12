import blue from "@material-ui/core/colors/blue";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from "../configureStore.js";
import AsyncApp from "./AsyncApp.js";

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Route component={AsyncApp} />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

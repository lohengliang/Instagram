import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from "../configureStore.js";
import AsyncApp from "./AsyncApp.js";

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={AsyncApp} />
        </Router>
      </Provider>
    );
  }
}

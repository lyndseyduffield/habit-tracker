import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer, writeStateMiddleware } from "./store/reducers";
import "./index.css";
import App from "./components/App";

const store = createStore(reducer, applyMiddleware(writeStateMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

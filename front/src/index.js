import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./containers/App";
import { store } from "./reducers";

ReactDOM.createRoot(document.getElementById("app")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import Routes from "./routes";

const App = Component => {
  return ReactDOM.render(<Component />, document.getElementById("root"));
};

export default hot(module)(App(Routes));

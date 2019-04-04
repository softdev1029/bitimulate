import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "styles/main.scss";
import Root from "Root";
import * as serviceWorker from "./serviceWorker";
import store from "store";

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,

    document.getElementById("root")
  );

render(Root);

if (module.hot) {
  module.hot.accept("./Root", () => render(Root));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

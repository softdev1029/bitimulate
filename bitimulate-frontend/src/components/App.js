import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "components/pages/HomePage";
import TradePage from "components/pages/TradePage";
import { ScreenMaskContainer } from "containers";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/trade" component={TradePage} />
        <ScreenMaskContainer />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "components/pages/HomePage";
import TradePage from "components/pages/TradePage";
import RegisterPage from "components/pages/RegisterPage";
import { ScreenMaskContainer, LoginModalContainer, UserLoader } from "containers";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/trade" component={TradePage} />
        <Route path="/register" component={RegisterPage}/>
        <ScreenMaskContainer />
        <LoginModalContainer visible="true" />
        <UserLoader />
      </div>
    );
  }
}

export default App;

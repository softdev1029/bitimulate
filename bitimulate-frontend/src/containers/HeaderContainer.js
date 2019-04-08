import React, { Component } from "react";
import { Header } from "components";
// import redux dependencies
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as authActions from "store/modules/auth";

class HeaderContainer extends Component {
  handleLoginButtonClick = async () => {
    const { BaseActions, AuthActions } = this.props;
    await BaseActions.setScreenMaskVisibility(true);
    await AuthActions.toggleLoginModal();
  };

  render() {
    const { handleLoginButtonClick } = this;
    const { user } = this.props;

    return <Header user={user} onLoginButtonClick={handleLoginButtonClick} />;
  }
}

export default connect(
  state => ({
    user: state.user.get('user')
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(HeaderContainer);

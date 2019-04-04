import React, { Component } from "react";
// import redux dependencies
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as authActions from "store/modules/auth";
import { LoginModal } from "components";

class LoginModalContainer extends Component {
  handleChangeInput = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;
    console.log(name + ":" + value);
    AuthActions.changeInput({
      name,
      value
    });
  };

  render() {
    const { handleChangeInput } = this;
    const { visible, email, password } = this.props;

    return (
      <LoginModal
        visible={visible}
        email={email}
        password={password}
        onChangeInput={handleChangeInput}
      />
    );
  }
}

export default connect(
  state => ({
    email: state.email,
    password: state.password
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(LoginModalContainer);

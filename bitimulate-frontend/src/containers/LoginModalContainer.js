import React, { Component } from "react";
// import redux dependencies
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import onClickOutside from "react-onclickoutside";
import validate from "validate.js";
import * as baseActions from "store/modules/base";
import * as authActions from "store/modules/auth";
import { LoginModal } from "components";

class LoginModalContainer extends Component {
  handleClose = () => {
    const { visible, BaseActions, AuthActions } = this.props;
    if (!visible) return;
    BaseActions.setScreenMaskVisibility(false);
    AuthActions.toggleLoginModal();
  };
  // generated by onClickOutside HOC
  handleClickOutside = e => {
    this.handleClose();
  };
  handleChangeInput = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;
    AuthActions.changeInput({
      name,
      value
    });
  };
  handleChangeMode = () => {
    const { AuthActions } = this.props;
    AuthActions.changeMode();
  };
  handleLogin = () => {
    // validate email and password

    const constraints = {
      email: {
        email: {
          message: () => "^잘못된 형식의 이메일입니다."
        }
      },
      password: {
        length: {
          minimum: 6,
          tooShort: "^비밀번호는 %{count}자 이상 입력하세요."
        }
      }
    };

    const form = this.props.form.toJS();

    const error = validate(form, constraints);

    const { AuthActions } = this.props;
    AuthActions.setError(null);
    if (error) {
      AuthActions.setError(error);
    }
  };
  handleRegister = async () => {
    // validate email and password

    const constraints = {
      email: {
        email: {
          message: () => "^잘못된 형식의 이메일입니다."
        }
      },
      password: {
        length: {
          minimum: 6,
          tooShort: "^비밀번호는 %{count}자 이상 입력하세요."
        }
      }
    };

    const form = this.props.form.toJS();
    const { email, password } = form;

    const error = validate(form, constraints);

    const { AuthActions } = this.props;
    AuthActions.setError(null);
    if (error) {
      AuthActions.setError(error);
      return;
    }

    try {
      await AuthActions.checkEmail(email);
    } catch (e) {
      return;
    }
    const { history } = this.props;

    setTimeout(() => {
      history.push("/register");
      this.handleClose();
    }, 2000);
  };
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidMount() {
    return true;
  }
  render() {
    const {
      handleChangeInput,
      handleLogin,
      handleRegister,
      handleChangeMode
    } = this;
    const { mode, visible, email, password, error } = this.props;

    return (
      <LoginModal
        visible={visible}
        email={email}
        password={password}
        error={error}
        mode={mode}
        onChangeInput={handleChangeInput}
        onChangeMode={handleChangeMode}
        onAuth={mode === "login" ? handleLogin : handleRegister}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.auth.get("visible"),
    form: state.auth.get("form"),
    error: state.auth.get("error"),
    mode: state.auth.get("mode")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(onClickOutside(LoginModalContainer)));

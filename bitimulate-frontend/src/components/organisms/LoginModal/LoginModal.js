import React from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import { Modal, Input, Button, InputError } from "components";

const cx = classNames.bind(styles);

const LoginModal = ({
  visible,
  mode,
  email,
  password,
  error,
  onChangeInput,
  onChangeMode,
  onRegister
}) => {
  console.log("LoginModal:" + visible);
  const { email: emailError, password: passwordError } = error ? error.toJS() : {};
  return (
    <Modal visible={visible}>
      <div className={cx("login-modal")}>
        <div className={cx("bar")} />
        <div className={cx("content")}>
          <h3>Login</h3>
          <div>
            <Input
              name="email"
              placeholder="email"
              value={email}
              onChange={onChangeInput}
              className={cx("login")}
            />
            <InputError error={emailError} />
            <Input
              name="password"
              placeholder="password"
              value={password}
              onChange={onChangeInput}
              type="password"
              className={cx("login")}
            />
            <InputError error={passwordError} />
            <Button
              flat
              color="teal"
              flex
              padding="0.6rem"
              className={cx("login")}
              onClick={onRegister}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;

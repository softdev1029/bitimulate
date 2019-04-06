import React from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import { Modal, Input, Button, InputError, TextButton } from "components";

const cx = classNames.bind(styles);

const LoginModal = ({
  visible,
  mode,
  email,
  password,
  error,
  onChangeInput,
  onChangeMode,
  onAuth
}) => {
  const isLogin = mode === 'login';
  const modeText = isLogin ? 'Login' : 'Signup';
  const invertedText = isLogin ? 'Signup' : 'Login';

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
              onClick={onAuth}
            >
              {modeText}
            </Button>
            <div className={cx('login-foot')}>
              <TextButton>Forget Password</TextButton>
              <TextButton right onClick={onChangeMode}>{invertedText}</TextButton>
            </div>
            <div className={cx('separator')}>
              <div className={cx('or')}>OR</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;

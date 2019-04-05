import React from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import { Modal, Input, Button } from "components";

const cx = classNames.bind(styles);

const LoginModal = ({
  visible,
  mode,
  email,
  password,
  onChangeInput,
  onChangeMode
}) => {
  console.log("LoginModal:"+visible);
  return (
    <Modal visible={visible}>
      <div className={cx("login-modal")}>
        <div className={cx("bar")} />
        <div className={cx("content")}>
          <h3>Login</h3>
          <div className={cx("form")}>
            <Input
              name="email"
              placeholder="email"
              value={email}
              onChange={onChangeInput}
            />
            <Input
              name="password"
              placeholder="password"
              value={password}
              onChange={onChangeInput}
              type="password"
            />
            <Button className={cx("login")} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;

import React from "react";
import styles from "./Modal.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Modal = ({ visible, children }) => {
  return <div>{children}</div>;
};

export default Modal;

import React from "react";
import styles from "./Modal.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Modal = ({visible}) => {
  return <div className={cx("logo")}>Hi</div>;
};

export default Modal;

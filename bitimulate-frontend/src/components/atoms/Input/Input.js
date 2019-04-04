import React from "react";
import styles from "./Input.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Input = ({ className, ...rest }) => {
  return <input className={cx(className)} {...rest} />;
};

export default Input;

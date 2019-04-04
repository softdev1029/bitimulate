import React from "react";
import styles from "./ScreenMask.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ScreenMask = ({ visible }) => (
  <div className={cx({ "screen-mask": visible })} />
);

ScreenMask.defaultProps = {};

export default ScreenMask;

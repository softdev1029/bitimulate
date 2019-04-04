import React from "react";
import styles from "./MyComponent.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ScreenMask = ({ visible }) => <div className={cx("screen-mask")} />;

ScreenMask.defaultProps = {};

export default ScreenMask;

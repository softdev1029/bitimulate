import React from "react";
import classNames from "classnames/bind";
import styles from "./Logo.scss";
import logo from "static/images/logo.png";

const cx = classNames.bind(styles);

const Logo = () => <div className={cx("logo")}>Bitimulate</div>;

export default Logo;

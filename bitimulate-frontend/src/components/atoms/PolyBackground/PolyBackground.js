import React from "react";
import styles from "./PolyBackground.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PolyBackground = ({ children }) => {
  return (
    <div className={cx("poly-background")}>
      <div className={cx("image")}>
        <div className={cx("inner")}>{children}</div>
      </div>
    </div>
  );
};

export default PolyBackground;

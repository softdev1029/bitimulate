import React from "react";
import styles from "./PageTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PageTemplate = ({ header, children, responsive }) => (
  <div className={cx("page")}>
    {header}
    <main className={cx("content", { "has-header": header, responsive })}>
      {children}
    </main>
  </div>
);

PageTemplate.defaultProps = {};

export default PageTemplate;

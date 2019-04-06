import React from "react";
import styles from "./Modal.scss";
import classNames from "classnames/bind";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

const cx = classNames.bind(styles);

const Modal = ({ visible, children }) => {
  return (
    <div className="modal-wrapper">
      <CSSTransitionGroup
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        transitionName={{
          enter: cx("enter"),
          leave: cx("leave")
        }}
      >
        {visible && <div className={cx("modal")}>{children}</div>}
      </CSSTransitionGroup>
    </div>
  );
};

export default Modal;

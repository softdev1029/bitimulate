import React from 'react';
import styles from './UserButton.scss';
import classNames from 'classnames/bind';
import { MdPerson as UserIcon } from 'react-icons/md';

const cx = classNames.bind(styles);

const UserButton = ({displayName, onClick}) => {
  return (
    <div className={cx('user-button')} onClick={onClick}>
      <UserIcon/>
      <div className={cx('display-name')}>
        {displayName}
      </div>
    </div>
  );
};

export default UserButton;
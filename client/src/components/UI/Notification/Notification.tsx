import React, { useEffect } from 'react';

import classes from './Notification.module.scss';

interface INotificationProps {
    message: string;
    onClose: () => void;
}

const Notification : React.FC<INotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={classes.notification}>
      <span>{message}</span>
      <button onClick={onClose}>Х</button>
    </div>
  );
};

export default Notification;

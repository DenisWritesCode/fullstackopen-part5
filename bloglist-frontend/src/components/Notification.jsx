import React from 'react';

const Notification = ({ notification }) => {
    if (!notification) {
        return null;
    }
    return (
        <div className={'notification ' + notification.type}>
            {notification.text}
        </div>
    );
};

export default Notification;

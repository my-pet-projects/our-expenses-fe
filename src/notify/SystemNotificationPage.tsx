import { notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectNotification } from 'src/notify/state/selectors';

export const SystemNotificationPage = (): JSX.Element => {
    const systemNotification = useSelector(selectNotification);

    useEffect(() => {
        if (systemNotification) {
            notification.open({
                message: systemNotification.message,
                description: systemNotification.details,
                type: systemNotification.type,
                placement: 'topRight',
                duration: systemNotification.type === 'error' ? 0 : 3
            });
        }
    }, [systemNotification]);

    return <></>;
};

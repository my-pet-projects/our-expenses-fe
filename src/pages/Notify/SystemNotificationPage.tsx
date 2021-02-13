import { notification } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SystemNotification } from 'src/models/notification';

import { RootState } from 'src/store';

interface PropsFromState {
    systemNotification?: SystemNotification;
}

type SystemNotificationPageProps = PropsFromState;

const SystemNotificationPage = (props: SystemNotificationPageProps): JSX.Element => {
    const { systemNotification } = props;

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

    return <React.Fragment />;
};

const mapStateToProps = ({ notification: notificationState }: RootState): PropsFromState => ({
    systemNotification: notificationState.notification
});

const enhance = connect(mapStateToProps);
export default enhance(SystemNotificationPage);

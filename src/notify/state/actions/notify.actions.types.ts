import { SystemNotification } from 'src/models/notification';
import { NotifyActionType } from 'src/notify/state/constants';

export interface INotifySuccess {
    type: NotifyActionType.SYSTEM_NOTIFICATION;
    payload: SystemNotification;
}

export interface INotifyFailure {
    type: NotifyActionType.SYSTEM_NOTIFICATION;
    payload: SystemNotification;
}

export type NotifyAction = INotifySuccess | INotifyFailure;

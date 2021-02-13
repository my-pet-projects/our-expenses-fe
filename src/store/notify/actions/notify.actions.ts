import { SystemNotification } from 'src/models/notification';

import { NotifyActionType } from '../constants';
import { INotifyFailure, INotifySuccess } from './notify.actions.types';

export const notifySuccess = (message: string): INotifySuccess => ({
    type: NotifyActionType.SYSTEM_NOTIFICATION,
    payload: {
        type: 'success',
        message: message
    } as SystemNotification
});

export const notifyFailure = (message: string, details?: string): INotifyFailure => ({
    type: NotifyActionType.SYSTEM_NOTIFICATION,
    payload: {
        type: 'error',
        message: message,
        details: details
    } as SystemNotification
});

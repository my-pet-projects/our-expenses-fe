import { ApplicationError } from 'src/models';
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

export const notifyFailure = (error: ApplicationError): INotifyFailure => ({
    type: NotifyActionType.SYSTEM_NOTIFICATION,
    payload: {
        type: 'error',
        message: error.message,
        details: error.description
    } as SystemNotification
});

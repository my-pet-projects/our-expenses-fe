import { Reducer } from 'redux';
import { SystemNotification } from 'src/models/notification';

import { NotifyAction } from 'src/store/notify/actions';
import { NotifyActionType } from 'src/store/notify/constants';

export interface INotifyState {
    notification?: SystemNotification;
}

const initialNotifyState: INotifyState = {};

export const notifyReducer: Reducer<INotifyState, NotifyAction> = (
    state: INotifyState = initialNotifyState,
    action: NotifyAction
) => {
    switch (action.type) {
        case NotifyActionType.SYSTEM_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            };
        default:
            return state;
    }
};

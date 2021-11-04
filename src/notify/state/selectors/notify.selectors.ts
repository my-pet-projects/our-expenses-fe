import { createSelector } from 'reselect';

import { INotifyState } from 'src/notify/state/reducers';
import { RootState } from 'src/RootState';

const selectReportState = (rootState: RootState): INotifyState => rootState.notification;

export const selectNotification = createSelector(selectReportState, (state: INotifyState) => state.notification);

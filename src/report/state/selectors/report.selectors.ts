import { createSelector } from 'reselect';

import { IReportState } from 'src/report/state/reducers';
import { RootState } from 'src/RootState';

const selectReportState = (rootState: RootState): IReportState => rootState.report;

export const selectIsLoading = createSelector(selectReportState, (state: IReportState) => state.isLoading);

export const selectError = createSelector(selectReportState, (state: IReportState) => state.error);

export const selectReport = createSelector(selectReportState, (state: IReportState) => state.report);

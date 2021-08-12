import { Reducer } from 'redux';

import { ApplicationError, Report } from 'src/models';
import { ReportAction } from 'src/report/state/actions';
import { ReportActionType } from 'src/report/state/constants';

export interface IReportState {
    report?: Report;
    isLoading: boolean;
    error?: ApplicationError;
}

const initialReportState: IReportState = {
    isLoading: false
};

export const reportReducer: Reducer<IReportState, ReportAction> = (
    state: IReportState = initialReportState,
    action: ReportAction
) => {
    switch (action.type) {
        case ReportActionType.REPORT_FETCH_INIT:
            return {
                ...state,
                isLoading: true
            };
        case ReportActionType.REPORT_FETCH_SUCCESS:
            return {
                ...state,
                report: action.payload.report,
                isLoading: false
            };
        case ReportActionType.REPORT_FETCH_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};

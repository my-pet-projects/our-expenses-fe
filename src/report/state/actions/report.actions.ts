import { ApplicationError, Report, ReportDateRange, ReportFilter } from 'src/models';
import { notifyFailure } from 'src/notify/state/actions';
import { ReportActionType } from 'src/report/state/constants';
import { AppThunkAction, AppThunkDispatch } from 'src/RootState';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';

import {
    IFetchReportFail,
    IFetchReportInit,
    IFetchReportSuccess,
    IResetReport,
    ISetReportFilter
} from './report.actions.types';

const willGenerateReport = (): IFetchReportInit => ({
    type: ReportActionType.REPORT_FETCH_INIT
});

const didGenerateReport = (report: Report): IFetchReportSuccess => ({
    type: ReportActionType.REPORT_FETCH_SUCCESS,
    payload: {
        report: report
    }
});

const failedToGenerateReport = (error: ApplicationError): IFetchReportFail => ({
    type: ReportActionType.REPORT_FETCH_FAILED,
    payload: error,
    error: true
});

const didApplyReportFilter = (filter: ReportFilter): ISetReportFilter => ({
    type: ReportActionType.REPORT_SET_FILTER,
    payload: {
        filter: filter
    }
});

const didResetReport = (): IResetReport => ({
    type: ReportActionType.REPORT_RESET
});

export const generateReport = (filter: ReportFilter): AppThunkAction<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: `reports?from=${filter.dateRange.from}&to=${filter.dateRange.to}&interval=${filter.interval}`,
            method: 'GET'
        } as IHttpRequestOptions<ReportDateRange>;

        try {
            dispatch(willGenerateReport());
            const response = await sendRequest<Report>(options);
            if (!response.data) {
                throw new Error('Unexpected response from the server.');
            }
            dispatch(didGenerateReport(response.data));
        } catch (error) {
            const appError = new ApplicationError('Failed to generate report!', error);
            dispatch(failedToGenerateReport(appError));
            dispatch(notifyFailure(appError));
        }
    };

export const applyReportFilter = (filter: ReportFilter): AppThunkAction<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        dispatch(didApplyReportFilter(filter));
    };

export const resetReport = (): AppThunkAction<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        dispatch(didResetReport());
    };

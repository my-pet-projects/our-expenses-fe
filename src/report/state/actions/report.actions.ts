import { ApplicationError, Report, ReportDateRange } from 'src/models';
import { notifyFailure } from 'src/notify/state/actions';
import { ReportActionType } from 'src/report/state/constants';
import { AppThunkDispatch, AppThunkResult } from 'src/RootState';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';

import { IFetchReportFail, IFetchReportInit, IFetchReportSuccess } from './report.actions.types';

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

export const generateReport = (dateRange: ReportDateRange): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    const options = {
        path: `reports?from=${dateRange.from.toISOString()}&to=${dateRange.to.toISOString()}`,
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

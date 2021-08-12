import { ApplicationError, Report } from 'src/models';
import { ReportActionType } from 'src/report/state/constants';

export interface IFetchReportInit {
    type: ReportActionType.REPORT_FETCH_INIT;
}

export interface IFetchReportSuccess {
    type: ReportActionType.REPORT_FETCH_SUCCESS;
    payload: {
        report: Report;
    };
}

export interface IFetchReportFail {
    type: ReportActionType.REPORT_FETCH_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export type ReportAction = IFetchReportInit | IFetchReportSuccess | IFetchReportFail;

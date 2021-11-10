import { ApplicationError, Report, ReportFilter } from 'src/models';
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

export interface ISetReportFilter {
    type: ReportActionType.REPORT_SET_FILTER;
    payload: {
        filter: ReportFilter;
    };
}

export interface IResetReport {
    type: ReportActionType.REPORT_RESET;
}

export type ReportAction = IFetchReportInit | IFetchReportSuccess | IFetchReportFail | ISetReportFilter | IResetReport;

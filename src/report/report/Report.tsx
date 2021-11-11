import { Alert, Card, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppPanel } from 'src/common/components';
import { dateDayFormat, dateMonthFormat } from 'src/common/formatters';
import { Interval, ReportFilter } from 'src/models';
import { generateReport } from 'src/report/state/actions';
import { selectError, selectIsLoading, selectReport, selectReportFilter } from 'src/report/state/selectors';

import { DateExpenses } from './DateExpenses';

type ReportProps = {
    interval: Interval;
};

export const Report = ({ interval }: ReportProps): JSX.Element => {
    const report = useSelector(selectReport);
    const filter = useSelector(selectReportFilter);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!filter) {
            return;
        }
        filter.interval = interval;
        dispatch(generateReport(filter));
    }, [dispatch, filter, interval]);

    if (!filter) {
        return <></>;
    }

    const getReportName = (filter: ReportFilter): string => {
        switch (filter.interval) {
            case Interval.Day:
                return `Daily report from ${dateDayFormat(filter.dateRange.from)} to ${dateDayFormat(
                    filter.dateRange.to
                )}`;
            case Interval.Month:
                return `Monthly report for ${dateMonthFormat(filter.dateRange.from)}`;
            case Interval.Year:
                return 'Yearly report';
            default:
                throw new Error('Unknown date interval');
        }
    };

    return (
        <AppPanel>
            <Card title={<Typography.Title level={3}>{getReportName(filter)}</Typography.Title>} loading={isLoading}>
                {!error && report && <DateExpenses dateExpenses={report.dateReports} interval={interval} />}
                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </Card>
        </AppPanel>
    );
};

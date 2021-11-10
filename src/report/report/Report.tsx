import { Alert, Card, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppPanel } from 'src/common/components';
import { generateReport } from 'src/report/state/actions';
import { selectError, selectIsLoading, selectReport, selectReportFilter } from 'src/report/state/selectors';

import { DateCategory } from './DateCategory';

export const Report = (): JSX.Element => {
    const report = useSelector(selectReport);
    const filter = useSelector(selectReportFilter);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!filter) {
            return;
        }
        dispatch(generateReport(filter));
    }, [dispatch, filter]);

    if (!filter) {
        return <></>;
    }

    return (
        <AppPanel>
            <Card title={<Typography.Title level={3}>Monthly report</Typography.Title>} loading={isLoading}>
                {!error && report && <DateCategory dateExpenses={report.dateReports} />}
                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </Card>
        </AppPanel>
    );
};

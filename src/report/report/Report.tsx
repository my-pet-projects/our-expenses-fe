import { Alert, Card, Col, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { generateReport } from 'src/report/state/actions';
import { selectError, selectIsLoading, selectReport, selectReportFilter } from 'src/report/state/selectors';

import { DateCategory } from './DateCategory';
import { TotalAmount } from './TotalAmount';

import './Report.scss';

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
        <div className="report">
            <Card title={<Typography.Title level={3}>Monthly report</Typography.Title>} loading={isLoading}>
                {!error && report && (
                    <>
                        <Row justify="space-between">
                            <Col flex={1}>
                                <DateCategory dateExpenses={report.dateReports} />
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Col>
                                <Typography.Title level={4}>
                                    Total:
                                    <TotalAmount total={report.total} />
                                </Typography.Title>
                            </Col>
                        </Row>
                    </>
                )}
                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </Card>
        </div>
    );
};

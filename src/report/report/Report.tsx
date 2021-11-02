import { Alert, Card, Col, DatePicker, Row, Typography } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReportDateRange } from 'src/models';
import { generateReport } from 'src/report/state/actions';
import { selectError, selectIsLoading, selectReport } from 'src/report/state/selectors';

import { DateCategory } from './DateCategory';
import { TotalAmount } from './TotalAmount';

import './Report.scss';

const dateFormat = 'MMMM YYYY';

export const Report = (): JSX.Element => {
    const report = useSelector(selectReport);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    // if (!report) {
    //     return <></>;
    // }

    const dispatch = useDispatch();

    useEffect(() => {
        const currentDate = Date.now();
        const dateFrom = moment.utc(currentDate).startOf('month').toDate();
        const dateTo = moment.utc(currentDate).endOf('month').toDate();
        const dateRange = {
            from: dateFrom,
            to: dateTo
        } as ReportDateRange;
        dispatch(generateReport(dateRange));
    }, [dispatch]);

    const handleDateChange = (value: Moment | null): void => {
        console.log('date', value);
        if (!value) {
            return;
        }

        const dateFrom = moment.utc(value).startOf('month').toDate();
        const dateTo = moment.utc(value).endOf('month').toDate();
        const dateRange = {
            from: dateFrom,
            to: dateTo
        } as ReportDateRange;
        dispatch(generateReport(dateRange));
    };
    return (
        <div className="report">
            <DatePicker onChange={handleDateChange} picker="month" format={dateFormat} />
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

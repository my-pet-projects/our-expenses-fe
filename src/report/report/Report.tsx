import { Alert, Card, Col, DatePicker, Row } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ByCategoryEntity, ByDateReport, Expense, ReportDateRange } from 'src/models';
import { selectError, selectIsLoading, selectReport } from 'src/report/state/selectors';

import { generateReport } from '../state/actions';

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
            <Card title="Monthly report" loading={isLoading}>
                {!error && report && (
                    <>
                        {report.byDate
                            .sort((a: ByDateReport, b: ByDateReport) => +new Date(a.date) - +new Date(b.date))
                            .map((byDate: ByDateReport, index: number) => (
                                <Row key={index}>
                                    <Col>{moment(byDate.date).format(dateFormat)}</Col>
                                    <Col>
                                        {byDate.byCategory.map((byCategory: ByCategoryEntity) => (
                                            <>
                                                <strong>{byCategory.category.name}</strong>
                                                <div>
                                                    {byCategory.expenses.map((expense: Expense) => (
                                                        <>
                                                            <div>
                                                                {expense.category.name}
                                                                {expense.price} {expense.currency}
                                                            </div>
                                                        </>
                                                    ))}
                                                    ----
                                                </div>
                                            </>
                                        ))}
                                    </Col>
                                </Row>
                            ))}
                    </>
                )}
                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </Card>
        </div>
    );
};

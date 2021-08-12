import { Alert, Card, Col, Row } from 'antd';
import Moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ByCategoryEntity, ByDateReport, Expense } from 'src/models';
import { selectError, selectIsLoading, selectReport } from 'src/report/state/selectors';

import { generateReport } from '../state/actions';

import './Report.scss';

const dateFormat = 'DD.MM.YYYY';

export const Report = (): JSX.Element => {
    const report = useSelector(selectReport);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    // if (!report) {
    //     return <></>;
    // }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(generateReport());
    }, [dispatch]);

    return (
        <div className="report">
            <Card title="Monthly report" loading={isLoading}>
                {!error && report && (
                    <>
                        {report.byDate
                            .sort((a: ByDateReport, b: ByDateReport) => +new Date(a.date) - +new Date(b.date))
                            .map((byDate: ByDateReport, index: number) => (
                                <Row key={index}>
                                    <Col>{Moment(byDate.date).format(dateFormat)}</Col>
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

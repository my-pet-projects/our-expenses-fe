import { Col, Divider, Row, Typography } from 'antd';
import moment from 'moment';

import { DateExpensesReport } from 'src/models';

import { CategoryExpense } from './CategoryExpenses';
import { TotalAmount } from './TotalAmount';

type DateCategoryProps = {
    dateExpenses: DateExpensesReport[];
};

export const DateCategory = ({ dateExpenses }: DateCategoryProps): JSX.Element => {
    const dateFormat = 'DD.MM.YYYY';
    if (!dateExpenses) {
        return <></>;
    }

    const sortedDateReports = dateExpenses.sort(
        (a: DateExpensesReport, b: DateExpensesReport) => +new Date(a.date) - +new Date(b.date)
    );

    return (
        <>
            {sortedDateReports.map((dateReport: DateExpensesReport, index: number) => (
                <Row key={index} justify="space-between" gutter={[20, 20]}>
                    <Col>
                        <Typography.Title level={5}>{moment(dateReport.date).format(dateFormat)}</Typography.Title>
                    </Col>
                    <Col flex="auto">
                        <CategoryExpense categoryExpenses={dateReport.categoryExpenses} />
                    </Col>
                    <Col>
                        <Typography.Title level={5}>
                            <TotalAmount total={dateReport.total} />
                        </Typography.Title>
                    </Col>

                    <Divider />
                </Row>
            ))}
        </>
    );
};

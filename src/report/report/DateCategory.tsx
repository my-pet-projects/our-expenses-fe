import { Card, Typography } from 'antd';
import moment from 'moment';

import { CategoryExpenses, DateExpensesReport } from 'src/models';

import { CategoryExpenseItem } from './CategoryExpenseItem';
import { TotalAmount } from './TotalAmount';

type DateCategoryProps = {
    dateExpenses: DateExpensesReport[];
};

export const DateCategory = ({ dateExpenses }: DateCategoryProps): JSX.Element => {
    const dateFormat = 'DD.MM.YYYY';

    if (!dateExpenses) {
        return <></>;
    }

    return (
        <>
            {dateExpenses
                .sort((a: DateExpensesReport, b: DateExpensesReport) => +new Date(a.date) - +new Date(b.date))
                .map((dateReport: DateExpensesReport, index: number) => (
                    <Card
                        key={index}
                        type="inner"
                        title={
                            <Typography.Title level={5}>{moment(dateReport.date).format(dateFormat)}</Typography.Title>
                        }
                        extra={
                            <Typography.Title level={5} style={{ marginBottom: 0 }}>
                                <TotalAmount total={dateReport.total} />
                            </Typography.Title>
                        }
                        style={{ marginTop: 16 }}
                    >
                        {dateReport.categoryExpenses
                            .sort((a: CategoryExpenses, b: CategoryExpenses) =>
                                a.category.name.localeCompare(b.category.name)
                            )
                            .map((catExpenses: CategoryExpenses, catExpenseIndex: number) => (
                                <CategoryExpenseItem key={catExpenseIndex} categoryExpense={catExpenses} />
                            ))}
                    </Card>
                ))}
        </>
    );
};

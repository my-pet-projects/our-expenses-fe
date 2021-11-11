import { Card, Typography } from 'antd';

import { dateDayFormat, dateMonthFormat } from 'src/common/formatters';
import { CategoryExpenses, DateExpensesReport, Interval } from 'src/models';

import { CategoryExpenseItem } from './CategoryExpenseItem';
import { DateExpensesPieChart } from './DateExpensesPieChart';
import { TotalAmount } from './TotalAmount';

import './DateExpenses.scss';

type DateExpensesProps = {
    interval: Interval;
    dateExpenses: DateExpensesReport[];
};

export const DateExpenses = ({ dateExpenses, interval }: DateExpensesProps): JSX.Element => {
    if (!dateExpenses) {
        return <></>;
    }

    const getTitle = (date: string, interval: Interval): string => {
        switch (interval) {
            case Interval.Day:
                return dateDayFormat(date);
            case Interval.Month:
                return dateMonthFormat(date);
            default:
                throw new Error('Unknown date interval');
        }
    };

    return (
        <>
            {dateExpenses
                .sort((a: DateExpensesReport, b: DateExpensesReport) => +new Date(a.date) - +new Date(b.date))
                .map((dateReport: DateExpensesReport, index: number) => (
                    <Card
                        key={index}
                        type="inner"
                        title={<Typography.Title level={5}>{getTitle(dateReport.date, interval)}</Typography.Title>}
                        extra={
                            <Typography.Title level={5} style={{ marginBottom: 0 }}>
                                <TotalAmount total={dateReport.total} />
                            </Typography.Title>
                        }
                        style={{ marginTop: 16 }}
                    >
                        <div className="date-category__wrapper">
                            <div className="date-category__expenses">
                                {dateReport.categoryExpenses
                                    .sort((a: CategoryExpenses, b: CategoryExpenses) =>
                                        a.category.name.localeCompare(b.category.name)
                                    )
                                    .map((catExpenses: CategoryExpenses, catExpenseIndex: number) => (
                                        <CategoryExpenseItem key={catExpenseIndex} categoryExpense={catExpenses} />
                                    ))}
                            </div>

                            <div className="date-category__chart">
                                <DateExpensesPieChart categoryExpenses={dateReport.categoryExpenses} />
                            </div>
                        </div>
                    </Card>
                ))}
        </>
    );
};

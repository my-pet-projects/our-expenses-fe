import { Card, Divider, Typography } from 'antd';

import { dateDayFormat, dateMonthFormat } from 'src/common/formatters';
import { CategoryExpenses, DateExpensesReport, Interval } from 'src/models';

import { CategoryExpenseItem } from './CategoryExpenseItem';
import { DateExpensesPieChart } from './DateExpensesPieChart';
import { ReportTotalAmount } from './ReportTotalAmount';

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
                        style={{ marginTop: 16 }}
                    >
                        <div className="date-expenses">
                            <div className="date-expenses__report">
                                <div className="date-expenses__list">
                                    {dateReport.categoryExpenses
                                        .sort((a: CategoryExpenses, b: CategoryExpenses) =>
                                            a.category.name.localeCompare(b.category.name)
                                        )
                                        .map((catExpenses: CategoryExpenses, catExpenseIndex: number) => (
                                            <>
                                                <CategoryExpenseItem
                                                    key={catExpenseIndex}
                                                    categoryExpense={catExpenses}
                                                />

                                                {catExpenseIndex !== dateReport.categoryExpenses.length - 1 && (
                                                    <Divider style={{ margin: 0 }} />
                                                )}
                                            </>
                                        ))}
                                </div>

                                <div className="date-expenses__total">
                                    <ReportTotalAmount grandTotal={dateReport.grandTotal} showConverted={true} />
                                </div>
                            </div>

                            <div className="date-expenses__chart">
                                <DateExpensesPieChart
                                    categoryExpenses={dateReport.categoryExpenses}
                                    currency={dateReport.grandTotal.total.currency}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
        </>
    );
};

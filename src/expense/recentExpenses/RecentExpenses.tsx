import { Card } from 'antd';
import { useSelector } from 'react-redux';

import { selectRecentExpenses } from 'src/expense/state/selectors';
import { Expense } from 'src/models';

import { ExpenseItem } from './ExpenseItem';

import './RecentExpenses.scss';

export const RecentExpenses = (): JSX.Element => {
    const recentExpenses = useSelector(selectRecentExpenses);

    if (!recentExpenses || !recentExpenses.length) {
        return <></>;
    }

    return (
        <div className="recent-expenses">
            <Card title="Recently added expenses">
                {recentExpenses.map((expense: Expense) => (
                    <ExpenseItem key={expense.id} expense={expense} />
                ))}
            </Card>
        </div>
    );
};

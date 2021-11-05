import { ExpenseHeader } from './ExpenseHeader';
import { ExpenseForm } from './form/ExpenseForm';
import { RecentExpenses } from './recentExpenses/RecentExpenses';

export const ExpensesPage = (): JSX.Element => (
    <article>
        <ExpenseHeader />
        <ExpenseForm />
        <RecentExpenses />
    </article>
);

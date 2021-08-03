import { ExpenseForm } from './form/ExpenseForm';
import { ExpenseHeader } from './header/ExpenseHeader';
import { RecentExpenses } from './recentExpenses/RecentExpenses';

export const ExpensesPage = (): JSX.Element => (
    <article>
        <ExpenseHeader />
        <ExpenseForm />
        <RecentExpenses />
    </article>
);

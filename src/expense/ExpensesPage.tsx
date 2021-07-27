import { ExpenseForm } from './form/ExpenseForm';
import { ExpenseHeader } from './header/ExpenseHeader';

export const ExpensesPage = (): JSX.Element => (
    <article>
        <ExpenseHeader />
        <ExpenseForm />
    </article>
);

import { Expense } from 'src/models';

type ExpenseAmountProps = {
    expense: Expense;
};

export const ExpenseAmount = ({ expense }: ExpenseAmountProps): JSX.Element => {
    const formatAmount = (exp: Expense): string => {
        if (exp.quantity === 1) {
            return `${exp.price} ${exp.currency}`;
        }
        return `${exp.price}x${exp.quantity} ${exp.currency}`;
    };

    return <>{formatAmount(expense)}</>;
};

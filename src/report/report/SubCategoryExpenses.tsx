import { Typography } from 'antd';

import { CategoryExpenses, Expense, GrandTotal } from 'src/models';

import { ExpenseAmount } from './ExpenseAmount';

import './SubCategoryExpenses.scss';

interface Category {
    name: string;
    children: Category[];
    expenses: Expense[];
    grandTotal: GrandTotal;
}

type SubCategoriesProps = {
    categoryExpenses: CategoryExpenses;
};

export const SubCategoryExpenses = ({ categoryExpenses }: SubCategoriesProps): JSX.Element => {
    if (!categoryExpenses) {
        return <></>;
    }

    const flatten = (categoryExpenses: CategoryExpenses[], parentName?: string): Category[] => {
        if (!categoryExpenses) {
            return [];
        }

        let children: Category[] = [];
        categoryExpenses.forEach((catExpenses: CategoryExpenses) => {
            const name = parentName ? parentName + ' / ' + catExpenses.category.name : catExpenses.category.name;
            const catExpensesChild = flatten(catExpenses.subCategories, name);
            children.push({
                name: name,
                children: catExpensesChild,
                expenses: catExpenses.expenses,
                grandTotal: catExpenses.grandTotal
            });
        });
        children = children.concat(children.flatMap((x: Category) => x.children)).filter((x: Category) => x.expenses);

        return children;
    };

    const sortedFlatCategories = flatten(categoryExpenses.subCategories).sort((a: Category, b: Category) =>
        a.name.localeCompare(b.name)
    );

    return (
        <>
            {sortedFlatCategories.map((category: Category, categoryIndex: number) => (
                <div key={categoryIndex} className="subcategory">
                    <div className="subcategory__name">
                        <Typography.Text type="secondary">{category.name}</Typography.Text>
                    </div>
                    <div className="subcategory__expenses">
                        {category.expenses &&
                            category.expenses.map((expense: Expense, expenseIndex: number) => (
                                <Typography.Text key={expenseIndex} type="secondary">
                                    <ExpenseAmount expense={expense} />
                                </Typography.Text>
                            ))}
                    </div>
                </div>
            ))}
        </>
    );
};

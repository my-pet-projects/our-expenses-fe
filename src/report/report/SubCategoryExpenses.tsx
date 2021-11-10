import { Col, Row, Typography } from 'antd';

import { CategoryExpenses, Expense, Total } from 'src/models';

import { ExpenseAmount } from './ExpenseAmount';

interface Cat {
    name: string;
    subCategories: Cat[];
    expenses: Expense[];
    total: Total;
}

type SubCategoriesProps = {
    categoryExpenses: CategoryExpenses;
};

export const SubCategoryExpenses = ({ categoryExpenses }: SubCategoriesProps): JSX.Element => {
    if (!categoryExpenses) {
        return <></>;
    }

    const flatten = (categoryExpenses: CategoryExpenses[], parentName?: string): Cat[] => {
        if (!categoryExpenses) {
            return [];
        }

        let children: Cat[] = [];
        categoryExpenses.forEach((catExpenses: CategoryExpenses) => {
            const name = parentName ? parentName + ' / ' + catExpenses.category.name : catExpenses.category.name;
            const ch = flatten(catExpenses.subCategories, name);
            children.push({
                name: name,
                subCategories: ch,
                expenses: catExpenses.expenses,
                total: catExpenses.total
            });
        });

        children = children.concat(children.flatMap((x: Cat) => x.subCategories)).filter((x: Cat) => x.expenses);

        return children;
    };

    const getFlattenCategories = (): Cat[] => {
        const q = flatten(categoryExpenses.subCategories);
        const sorted = q.sort((a: Cat, b: Cat) => a.name.localeCompare(b.name));

        return sorted;
    };
    return (
        <>
            {getFlattenCategories().map((cat: Cat, i: number) => (
                <Row key={i} gutter={[16, 16]}>
                    <Col span={12}>{cat.name}</Col>
                    <Col span={12}>
                        {cat.expenses &&
                            cat.expenses.map((expense: Expense, expenseIndex: number) => (
                                <Row key={expenseIndex}>
                                    <Typography.Text type="secondary">
                                        <ExpenseAmount expense={expense} />
                                    </Typography.Text>
                                </Row>
                            ))}
                    </Col>
                </Row>
            ))}
        </>
    );
};

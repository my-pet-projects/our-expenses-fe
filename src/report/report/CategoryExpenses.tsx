import { Col, Row, Typography } from 'antd';

import { CategoryExpenses } from 'src/models';

import { SubCategoryExpenses } from './SubCategoryExpenses';
import { TotalAmount } from './TotalAmount';

type CategoryExpensesProps = {
    categoryExpenses: CategoryExpenses[];
};

export const CategoryExpense = ({ categoryExpenses }: CategoryExpensesProps): JSX.Element => {
    const sortedCategories = categoryExpenses.sort((a: CategoryExpenses, b: CategoryExpenses) =>
        a.category.name.localeCompare(b.category.name)
    );

    return (
        <>
            {sortedCategories.map((catExpenses: CategoryExpenses, catExpenseIndex: number) => (
                <Row key={catExpenseIndex} gutter={[16, 16]} justify="start">
                    <Col xs={5} xl={3}>
                        <Typography.Text strong>{catExpenses.category.name}</Typography.Text>
                    </Col>
                    <Col xs={12} xl={7}>
                        <SubCategoryExpenses categoryExpenses={catExpenses} />
                    </Col>
                    <Col xs={7}>
                        <Typography.Text italic>
                            <TotalAmount total={catExpenses.total} />
                        </Typography.Text>
                    </Col>
                </Row>
            ))}
        </>
    );
};

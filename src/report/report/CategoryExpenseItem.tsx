import MinusOutlined from '@ant-design/icons/lib/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Button, Typography } from 'antd';
import { useState } from 'react';

import { CategoryExpenses } from 'src/models';

import { GrandTotalAmount } from './GrandTotalAmount';
import { SubCategoryExpenses } from './SubCategoryExpenses';

import './CategoryExpenseItem.scss';

type CategoryExpenseItemProps = {
    categoryExpense: CategoryExpenses;
};

export const CategoryExpenseItem = ({ categoryExpense }: CategoryExpenseItemProps): JSX.Element => {
    const [isVisible, setVisible] = useState(false);
    const toggleVisibility = (): void => setVisible(!isVisible);

    return (
        <div className="category-expense-item">
            <div className="category-expense-item__category">
                <div className="category-expense-item__name">
                    <Button
                        type="dashed"
                        shape="circle"
                        icon={isVisible ? <MinusOutlined /> : <PlusOutlined />}
                        size="small"
                        onClick={toggleVisibility}
                        className="category-expense-item__collapse-btn"
                    />
                    <Typography.Text>{categoryExpense.category.name}</Typography.Text>
                </div>
                <Typography.Text className="category-expense-item__total">
                    <GrandTotalAmount grandTotal={categoryExpense.grandTotal} />
                </Typography.Text>
            </div>
            <div className="category-expense-item__subcategories" style={{ display: isVisible ? 'block' : 'none' }}>
                <SubCategoryExpenses categoryExpenses={categoryExpense} />
            </div>
        </div>
    );
};

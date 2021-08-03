import { Col, Row } from 'antd';
import Moment from 'moment';

import { Expense } from 'src/models';

type ExpenseProps = {
    expense: Expense;
};

const dateFormat = 'DD.MM.YYYY';

export const ExpenseItem = ({ expense }: ExpenseProps): JSX.Element => (
    <div>
        <Row gutter={[16, 16]}>
            <Col span={6}>{Moment(expense.date).format(dateFormat)}</Col>
            <Col span={6}>{expense.categoryName}</Col>
            <Col span={6}>
                {expense.price} x {expense.quantity} {expense.currency}
            </Col>
        </Row>
    </div>
);

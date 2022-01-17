import { InfoCircleOutlined } from '@ant-design/icons';
import { Descriptions, Popover } from 'antd';

import { dateDayFormat } from 'src/common/formatters';
import { Expense } from 'src/models';

import { TotalAmount } from './TotalAmount';

type ExpenseAmountDetailsProps = {
    expense: Expense;
};

export const ExpenseAmountDetails = ({ expense }: ExpenseAmountDetailsProps): JSX.Element => {
    const content = (expense: Expense): JSX.Element => (
        <>
            <Descriptions layout="horizontal" size="small" column={1} style={{ width: 350 }}>
                <Descriptions.Item label="Date">{dateDayFormat(expense.date)} </Descriptions.Item>
                <Descriptions.Item label="Total">
                    <TotalAmount total={expense.totalInfo.original} />
                </Descriptions.Item>
                {expense.totalInfo.converted && (
                    <>
                        <Descriptions.Item label="Converted">
                            <TotalAmount total={expense.totalInfo.converted} />
                        </Descriptions.Item>
                        <Descriptions.Item label={`Exchange rate on ${dateDayFormat(expense.totalInfo.rate.date)}`}>
                            1 {expense.totalInfo.rate.baseCurrency} = {expense.totalInfo.rate.rate}{' '}
                            {expense.totalInfo.rate.targetCurrency}
                        </Descriptions.Item>
                    </>
                )}
            </Descriptions>
        </>
    );

    return (
        <>
            <Popover content={content(expense)} title="Expense info" trigger="hover">
                <InfoCircleOutlined style={{ margin: 5 }} />
            </Popover>
        </>
    );
};

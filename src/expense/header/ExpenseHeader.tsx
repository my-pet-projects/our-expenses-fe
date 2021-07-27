import { HomeOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';

import './ExpenseHeader.scss';

export const ExpenseHeader = (): JSX.Element => (
    <div className="expense-header">
        <PageHeader
            title={'Expenses'}
            className="expense-header__headline"
            avatar={{
                className: 'expense-header__avatar',
                icon: <HomeOutlined className="expense-header__icon" style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
            }}
        />
    </div>
);

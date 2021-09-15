import { PageHeader } from 'antd';

import { WalletIcon } from 'src/common/components';

import './ExpenseHeader.scss';

export const ExpenseHeader = (): JSX.Element => (
    <div className="expense-header">
        <PageHeader
            title={'Expenses'}
            className="expense-header__headline"
            avatar={{
                shape: 'square',
                src: <WalletIcon style={{ fontSize: '32px', color: '#000000' }} />
            }}
        />
    </div>
);

import { BarChartOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';

import './ReportHeader.scss';

export const ReportHeader = (): JSX.Element => (
    <div className="report-header">
        <PageHeader
            title={'Report'}
            className="report-header__headline"
            avatar={{
                className: 'report-header__avatar',
                icon: <BarChartOutlined className="report-header__icon" style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
            }}
        />
    </div>
);

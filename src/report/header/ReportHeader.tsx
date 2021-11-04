import { PageHeader } from 'antd';

import { ReportIcon } from 'src/common/components';

import './ReportHeader.scss';

export const ReportHeader = (): JSX.Element => (
    <div className="report-header">
        <PageHeader
            title={'Report'}
            className="report-header__headline"
            avatar={{
                shape: 'square',
                src: <ReportIcon style={{ fontSize: '32px', color: '#000000' }} />
            }}
        />
    </div>
);

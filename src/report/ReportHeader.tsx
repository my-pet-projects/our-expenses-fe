import { Tabs } from 'antd';
import { useNavigate } from 'react-router';

import { AppHeader, BreadcrumbData, ReportIcon } from 'src/common/components';

export const ReportHeader = (): JSX.Element => {
    const navigate = useNavigate();

    const reportBreadcrumbLinks = [{ title: 'Reports', url: '/reports' } as BreadcrumbData];

    const onTabChange = (activeKey: string): void => {
        navigate(activeKey);
    };

    return (
        <AppHeader
            title={'Reports'}
            icon={<ReportIcon />}
            breadcrumbs={reportBreadcrumbLinks}
            tabs={
                <Tabs defaultActiveKey="1" onChange={onTabChange}>
                    <Tabs.TabPane tab="By date" key="date" />
                    <Tabs.TabPane tab="By category" key="category" />
                </Tabs>
            }
        />
    );
};

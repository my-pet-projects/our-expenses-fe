import { Tabs } from 'antd';
import { Location } from 'history';
import { useLocation, useNavigate } from 'react-router';

import { AppHeader, BreadcrumbData, ReportIcon } from 'src/common/components';
import { appRoutes } from 'src/routes';

export const ReportHeader = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    const getBreadcrumbs = (location: Location): BreadcrumbData[] => {
        const breadcrumbs = [{ title: 'Reports', url: '/app/reports' } as BreadcrumbData];
        const locationPath = location.pathname;
        if (locationPath === appRoutes.ReportByDate) {
            breadcrumbs.push({ title: 'By date', url: locationPath });
        } else if (locationPath === appRoutes.ReportByCategory) {
            breadcrumbs.push({ title: 'By category', url: locationPath });
        }
        return breadcrumbs;
    };

    const onTabChange = (activeKey: string): void => {
        navigate(`${activeKey}${location.search}`);
    };

    return (
        <AppHeader
            title={'Reports'}
            icon={<ReportIcon />}
            breadcrumbs={getBreadcrumbs(location)}
            tabs={
                <Tabs activeKey={location.pathname} onChange={onTabChange}>
                    <Tabs.TabPane tab="By date" key={appRoutes.ReportByDate} />
                    <Tabs.TabPane tab="By category" key={appRoutes.ReportByCategory} />
                </Tabs>
            }
        />
    );
};

import { Outlet } from 'react-router-dom';

import { ReportFilter } from './report/ReportFilter';
import { ReportHeader } from './ReportHeader';

export const ReportPage = (): JSX.Element => (
    <article>
        <ReportHeader />
        <ReportFilter />
        <Outlet />
    </article>
);

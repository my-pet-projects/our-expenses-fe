import { ReportHeader } from './header/ReportHeader';
import { Report } from './report/Report';
import { ReportFilter } from './report/ReportFilter';

export const ReportPage = (): JSX.Element => (
    <article>
        <ReportHeader />
        <ReportFilter />
        <Report />
    </article>
);

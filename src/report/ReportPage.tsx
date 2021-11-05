import { Report } from './report/Report';
import { ReportFilter } from './report/ReportFilter';
import { ReportHeader } from './ReportHeader';

export const ReportPage = (): JSX.Element => (
    <article>
        <ReportHeader />
        <ReportFilter />
        <Report />
    </article>
);

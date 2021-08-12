import { ReportHeader } from './header/ReportHeader';
import { Report } from './report/Report';

export const ReportPage = (): JSX.Element => (
    <article>
        <ReportHeader />
        <Report />
    </article>
);

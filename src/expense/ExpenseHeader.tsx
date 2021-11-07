import { AppHeader, BreadcrumbData, WalletIcon } from 'src/common/components';

export const ExpenseHeader = (): JSX.Element => {
    const reportBreadcrumbLinks = [{ title: 'Expenses', url: '/app/expenses' } as BreadcrumbData];
    return <AppHeader title={'Expenses'} icon={<WalletIcon />} breadcrumbs={reportBreadcrumbLinks} />;
};

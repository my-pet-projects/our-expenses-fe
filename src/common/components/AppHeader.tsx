import { HomeOutlined } from '@ant-design/icons';
import { Alert, AvatarProps, Breadcrumb, PageHeader, Skeleton } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ApplicationError } from 'src/models';

import './AppHeader.scss';

export interface BreadcrumbData {
    title: string;
    url: string;
}

type AppHeaderProps = {
    title: string;
    icon?: React.ReactNode;
    breadcrumbs?: BreadcrumbData[];
    extra?: React.ReactNode;
    tabs?: React.ReactNode;
    error?: ApplicationError | null;
    isLoading?: boolean;
};

export const AppHeader = ({ title, icon, breadcrumbs, extra, tabs, error, isLoading }: AppHeaderProps): JSX.Element => {
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">
                <HomeOutlined />
            </Link>
        </Breadcrumb.Item>
    ];

    if (breadcrumbs) {
        breadcrumbs.forEach((link: BreadcrumbData) => {
            breadcrumbItems.push(
                <Breadcrumb.Item key={link.url}>
                    <Link to={link.url}>{link.title}</Link>
                </Breadcrumb.Item>
            );
        });
    }

    const getAvatar = (icon: React.ReactNode): AvatarProps | undefined => {
        if (icon) {
            return { shape: 'square', src: icon };
        }
    };

    return (
        <>
            <div className={classNames('app-header', { 'has-footer': !!tabs })}>
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                <Skeleton loading={isLoading} active title={true} paragraph={{ rows: 0 }} />
                {!error && !isLoading && <PageHeader title={title} avatar={getAvatar(icon)} extra={extra} />}
                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
                <div className="app-header__footer">{tabs}</div>
            </div>
        </>
    );
};

import AppstoreOutlined from '@ant-design/icons/lib/icons/AppstoreOutlined';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import Menu from 'antd/lib/menu';
import { Location } from 'history';
import React, { FunctionComponent } from 'react';
import { Link, matchRoutes, RouteMatch, useLocation } from 'react-router-dom';

import { ReportIcon, WalletIcon } from 'src/common/components';

import { routes } from './routes';

import './Header.scss';

export const Header: FunctionComponent = (): JSX.Element => {
    const location = useLocation();

    const getAssociatedPaths = (location: Location): string[] | undefined => {
        const matches = matchRoutes(routes(), location);
        return matches?.map((match: RouteMatch) => match.pathname);
    };

    return (
        <>
            <div className="logo">
                <Link to="/">
                    <img src="/piggy.svg" alt="logo" />
                    <h1>Our Expenses</h1>
                </Link>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['/']}
                selectedKeys={getAssociatedPaths(location)}
            >
                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="/app/categories" icon={<AppstoreOutlined />}>
                    <Link to="/app/categories">Categories</Link>
                </Menu.Item>
                <Menu.Item key="/app/expenses" icon={<WalletIcon />}>
                    <Link to="/app/expenses">Expenses</Link>
                </Menu.Item>
                <Menu.Item key="/app/reports" icon={<ReportIcon />}>
                    <Link to="/app/reports">Reports</Link>
                </Menu.Item>
            </Menu>
        </>
    );
};

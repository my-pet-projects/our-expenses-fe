import AppstoreOutlined from '@ant-design/icons/lib/icons/AppstoreOutlined';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import Menu from 'antd/lib/menu';
import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReportIcon, WalletIcon } from 'src/common/components';

import './Header.scss';

export const Header: FunctionComponent = (): JSX.Element => {
    const location = useLocation();

    return (
        <>
            <div className="logo">
                <Link to="/">
                    <img src="piggy.svg" alt="logo" />
                    <h1>Our Expenses</h1>
                </Link>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="/categories" icon={<AppstoreOutlined />}>
                    <Link to="/categories">Categories</Link>
                </Menu.Item>
                <Menu.Item key="/expenses" icon={<WalletIcon />}>
                    <Link to="/expenses">Expenses</Link>
                </Menu.Item>
                <Menu.Item key="/reports" icon={<ReportIcon />}>
                    <Link to="/reports">Reports</Link>
                </Menu.Item>
            </Menu>
        </>
    );
};

import { DeleteOutlined } from '@ant-design/icons';
import Menu from 'antd/lib/menu';
import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReportIcon, WalletIcon } from './common/components';

export const Header: FunctionComponent = (): JSX.Element => {
    const location = useLocation();

    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
                <Menu.Item key="/">
                    <Link to="/">
                        <DeleteOutlined />
                        <span>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/categories">
                    <Link to="/categories">
                        <DeleteOutlined />
                        <span>Categories</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/expenses">
                    <Link to="/expenses">
                        <WalletIcon />
                        <span>Expenses</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/reports">
                    <Link to="/reports">
                        <ReportIcon />
                        <span>Reports</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </>
    );
};

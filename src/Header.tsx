import { DeleteOutlined } from '@ant-design/icons';
import Menu from 'antd/lib/menu';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export const Header: FunctionComponent = (): JSX.Element => (
    <>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
                <DeleteOutlined />
                <span>Home</span>
                <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
                <DeleteOutlined />
                <span>Categories</span>
                <Link to="/categories" />
            </Menu.Item>
            <Menu.Item key="3">
                <DeleteOutlined />
                <span>Expenses</span>
                <Link to="/expenses" />
            </Menu.Item>
            <Menu.Item key="report">
                <DeleteOutlined />
                <span>Reports</span>
                <Link to="/reports" />
            </Menu.Item>
        </Menu>
    </>
);

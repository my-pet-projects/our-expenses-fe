import AppstoreOutlined from '@ant-design/icons/lib/icons/AppstoreOutlined';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { Location } from 'history';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchRoutes, RouteMatch, useLocation, useNavigate } from 'react-router-dom';

import { logout } from 'src/auth/state/actions';
import { selectAuthData } from 'src/auth/state/selectors';
import { ReportIcon, WalletIcon } from 'src/common/components';

import { routes } from './routes';

import './Header.scss';

export const Header = (): JSX.Element => {
    const authData = useSelector(selectAuthData);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAssociatedPaths = (location: Location): string[] | undefined => {
        const matches = matchRoutes(routes(), location);
        return matches?.map((match: RouteMatch) => match.pathname);
    };

    const onMenuClick = useCallback(
        (info: MenuInfo) => {
            if (info.key === 'logout') {
                dispatch(logout());
                navigate('/login');
            }
        },
        [dispatch, navigate]
    );

    return (
        <>
            <div className="logo">
                <Link to="/">
                    <img src="/piggy.svg" alt="logo" />
                    <h1>Our Expenses</h1>
                </Link>
            </div>

            {authData && (
                <Space className="header__profile">
                    <Dropdown
                        overlay={
                            <Menu onClick={onMenuClick}>
                                <Menu.Item key="logout">
                                    <LogoutOutlined /> Sign-out
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <span className="header__profile__account">
                            <Avatar className="header__profile__account__avatar" icon={<UserOutlined />} alt="avatar" />
                            <span className="header__profile__name">{authData.username}</span>
                        </span>
                    </Dropdown>
                </Space>
            )}

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

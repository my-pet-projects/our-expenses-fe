import { Breadcrumb, Layout } from 'antd';
import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { Header } from './Header';
import CategoriesPage from './pages/Category/CategoriesPage';
import SystemNotificationPage from './pages/Notify/SystemNotificationPage';
import { ExpensesListComponent } from './pages/Expense/ExpensesPage';

import 'antd/dist/antd.css';
import './App.css';

const App: FunctionComponent = (): JSX.Element => (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Layout.Header>
            <Header />
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <Switch>
                    <Route exact path="/" render={(): JSX.Element => <Redirect to="/categories" />} />
                    <Route path="/categories/:id?" render={(): JSX.Element => <CategoriesPage />}>
                        <CategoriesPage />
                    </Route>
                    <Route path="/expenses" component={ExpensesListComponent}></Route>
                </Switch>
            </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
        <SystemNotificationPage />
    </Layout>
);

export default withRouter(App);

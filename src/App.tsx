import { Layout } from 'antd';
import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { CategoriesPage } from './catalog/category/CategoryCatalogPage';
import { ExpensesPage } from './expense/ExpensesPage';
import { Header } from './Header';
import SystemNotificationPage from './notify/SystemNotificationPage';
import { ReportPage } from './report/ReportPage';

import 'antd/dist/antd.css';
import './App.scss';

const App: FunctionComponent = (): JSX.Element => (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Layout.Header>
            <Header />
        </Layout.Header>
        <Layout.Content>
            <div className="site-layout-content">
                <Switch>
                    <Route exact path="/" render={(): JSX.Element => <Redirect to="/categories" />} />
                    <Route path="/categories/:id?" render={(): JSX.Element => <CategoriesPage />} />
                    <Route path="/expenses" component={ExpensesPage}></Route>
                    <Route path="/reports" component={ReportPage}></Route>
                </Switch>
            </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
        <SystemNotificationPage />
    </Layout>
);

export default withRouter(App);

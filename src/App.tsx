import { Layout } from 'antd';
import React, { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CategoriesPage } from './catalog/category/CategoryCatalogPage';
import { ExpensesPage } from './expense/ExpensesPage';
import { Header } from './Header';
import SystemNotificationPage from './notify/SystemNotificationPage';
import { ReportPage } from './report/ReportPage';

import 'antd/dist/antd.css';
import './App.scss';

const App: FunctionComponent = (): JSX.Element => (
    <Layout className="layout">
        <Layout.Header>
            <Header />
        </Layout.Header>
        <Layout.Content>
            <Routes>
                <Route path="/" element={<CategoriesPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/:id" element={<CategoriesPage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/reports" element={<ReportPage />} />
            </Routes>
        </Layout.Content>
        <Layout.Footer className="footer">©{new Date().getFullYear()} Our Expenses</Layout.Footer>
        <SystemNotificationPage />
    </Layout>
);

export default App;

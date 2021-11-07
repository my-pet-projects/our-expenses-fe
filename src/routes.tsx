import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import { LoginPage } from './auth/LoginPage';
import { CategoriesPage } from './catalog/category/CategoryCatalogPage';
import { ExpensesPage } from './expense/ExpensesPage';
import { HomePage } from './home/HomePage';
import { Report } from './report/report/Report';
import { ReportByCategory } from './report/report/ReportByCategory';
import { ReportPage } from './report/ReportPage';

export const routes = (isLoggedIn: boolean): RouteObject[] => [
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    },
    {
        path: '/app',
        element: isLoggedIn ? <Outlet /> : <Navigate to="/login" />,
        children: [
            {
                path: 'categories',
                element: <Outlet />,
                children: [
                    { path: '', element: <CategoriesPage /> },
                    { path: ':id', element: <CategoriesPage /> }
                ]
            },
            {
                path: 'expenses',
                element: <ExpensesPage />
            },
            {
                path: 'reports',
                element: <ReportPage />,
                children: [
                    {
                        path: 'date',
                        element: <Report />
                    },
                    {
                        path: 'category',
                        element: <ReportByCategory />
                    }
                ]
            }
        ]
    }
];

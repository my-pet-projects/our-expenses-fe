import { Layout } from 'antd';
import { useRoutes } from 'react-router-dom';

import { Header } from './Header';
import { SystemNotificationPage } from './notify/SystemNotificationPage';
import { routes } from './routes';

import 'antd/dist/antd.css';
import './App.scss';

const App = (): JSX.Element => {
    const isLoggedIn = true;
    const routing = useRoutes(routes(isLoggedIn));

    return (
        <Layout className="layout">
            <Layout.Header>
                <Header />
            </Layout.Header>
            <Layout.Content>{routing}</Layout.Content>
            <Layout.Footer className="footer">©{new Date().getFullYear()} Our Expenses</Layout.Footer>
            <SystemNotificationPage />
        </Layout>
    );
};

export default App;

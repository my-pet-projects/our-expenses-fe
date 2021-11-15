import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { selectIsLoggedIn } from 'src/auth/state/selectors';
import { SystemNotificationPage } from 'src/notify/SystemNotificationPage';

import { Header } from './Header';
import { routes } from './routes';

import 'antd/dist/antd.css';
import './App.scss';

const App = (): JSX.Element => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const routing = useRoutes(routes(isLoggedIn));

    return (
        <Layout className="layout">
            {isLoggedIn && (
                <Layout.Header>
                    <Header />
                </Layout.Header>
            )}
            <Layout.Content>{routing}</Layout.Content>
            <Layout.Footer className="footer">©{new Date().getFullYear()} Our Expenses</Layout.Footer>
            <SystemNotificationPage />
        </Layout>
    );
};

export default App;

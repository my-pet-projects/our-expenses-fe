import { LoginForm } from './LoginForm';

import './LoginPage.scss';

export const LoginPage = (): JSX.Element => (
    <div className="wrapper">
        <div className="login-container">
            <div className="login-container__header">
                <span className="login-container__header__logo">
                    <img src="/piggy.svg" />
                </span>
                <span className="login-container__header__title">Our Expenses</span>
            </div>
            <div className="login-container__desc">Track your money flow</div>
            <div className="login-container__main">
                <LoginForm />
            </div>
        </div>
    </div>
);

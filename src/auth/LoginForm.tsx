import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { login } from 'src/auth/state/actions';
import { selectAuthError, selectAuthIsLoading, selectIsLoggedIn } from 'src/auth/state/selectors';

import './LoginForm.scss';

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginForm = (): JSX.Element => {
    const error = useSelector(selectAuthError);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectAuthIsLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const onFinish = (values: LoginFormValues): void => {
        dispatch(login(values.username, values.password));
    };

    return (
        <Form name="login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form__button" loading={isLoading}>
                    Log in
                </Button>
            </Form.Item>

            {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
        </Form>
    );
};

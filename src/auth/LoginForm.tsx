import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import './LoginForm.scss';

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginForm = (): JSX.Element => {
    const onFinish = (values: LoginFormValues): void => {
        console.log('Received values of form: ', values);
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
                <Button type="primary" htmlType="submit" className="login-form__button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

import { Form, Input, Button, Typography } from 'antd';
import React from 'react';
import axiosInstance from '../src/common/axios';
import { setCookie } from '../src/common/cookie';

const Login = (props) => {

    const onFinish = async (values) => {
        // axiosInstance.post("/user/login", values).then(response => {
        //     console.log(response.data)
        //     setCookie("jwt", response.data.data.token, 1);

        // }).catch(error => {
        //     console.log(error)
        // })
        fetch("https://user-taskapi.herokuapp.com/user/login", {
            method: "POST",
            credentials: 'include',
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <React.Fragment>
            <Typography.Title style={{ textAlign: "center" }}>
                Login
            </Typography.Title>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default Login;

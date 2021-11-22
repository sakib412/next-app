import { Form, Input, Button, Typography } from 'antd';
import React from 'react';

import axiosInstance from '../src/common/axios';

const Login = (props) => {
    const onFinish = async (values) => {
        // console.log('Success:', values);
        fetch("https://express-api-task.herokuapp.com/user/login", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
        // const json = await response.json();
        // console.log(json);
        // axiosInstance.post("/user/login", values, { withCredentials: true }).then(response => {
        //     console.log(response.data)

        // }).catch(error => {
        //     console.log(error)
        // })
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

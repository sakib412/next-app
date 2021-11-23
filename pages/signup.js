import React from 'react';
import Head from 'next/head'
import {
    Form,
    Input,
    Typography,
    Button,
} from 'antd';

import axiosInstance from '../src/common/axios';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const SignUp = () => {
    const [form] = Form.useForm();

    const onFinish = ({ firstName, lastName, email, password }) => {
        const signupBody = {

            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password

        }
        fetch("https://user-taskapi.herokuapp.com/user/register", {
            method: "POST",
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify(signupBody),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
        // axiosInstance.post('/user/register', signupBody).then((response) => {
        //     console.log(response)
        // }).catch((error) => {
        //     console.log(error.response)
        // })
    };

    return (
        <React.Fragment>
            <Head>

            </Head>
            <Typography.Title style={{ textAlign: "center" }}>
                Sign Up
            </Typography.Title>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="First Name"
                    label="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your First Name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Last Name"
                    label="lastName"
                    tooltip="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Last Name',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};


export default SignUp;
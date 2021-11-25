import { Button, Form, Input, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import cookie from 'js-cookie';
import authContext from "../contexts/authContext";
import axiosInstance from "../src/common/axios";
import Notification from "../src/common/notification";

const Login = ({ data }) => {
    const router = useRouter();
    const { authenticated, setAuthenticated } = useContext(authContext);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        isLoading(false)
        // isLoading(true);
        // if (data?.status) {
        //     isLoading(false);
        // }
        // axiosInstance
        //     .get("/user/check")
        //     .then((response) => {
        //         if (response.data.status) {
        //             setAuthenticated(true);
        //             router.push("/");
        //         } else {
        //             setAuthenticated(false);
        //             router.push("/login");
        //         }
        //         isLoading(false);
        //     })
        //     .catch((err) => {
        //         setAuthenticated(false);
        //         console.log(err);
        //         router.push("/login");
        //         isLoading(false);
        //     });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFinish = async (values) => {
        isLoading(true);
        fetch("https://express-api-task.herokuapp.com/user/login", {
            method: "POST",
            credentials: "include",
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    cookie.set('jwt', data?.data?.token, { expires: 3600 })
                    setAuthenticated(true);
                    router.push("/");
                    Notification({
                        message: data.message,
                        status: data.status ? 200 : 401,
                    });
                } else {
                    setAuthenticated(false);
                    Notification({
                        message: data.message,
                        status: data.status ? 200 : 401,
                    });
                }
                isLoading(false);
            })
            .catch((err) => {
                console.log(err);
                isLoading(false);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <React.Fragment>
            <div>
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
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
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
                                message: "Please input your password!",
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
                    >{loading ? <Spin spinning={true}>...</Spin> : <Button type="primary" htmlType="submit">
                        Login
                    </Button>}

                    </Form.Item>
                </Form>
            </div>
        </React.Fragment>
    );
};

export default Login;

export async function getServerSideProps({ req, res }) {
    let data;
    try {
        const resp = await axiosInstance.get("/user/check",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": req.headers.cookie
                }
            });
        data = await resp.data;
        console.log(data);
        return {
            redirect: {
                permanent: false,
                destination: '/',
            }
        }
    } catch (e) {
        console.log("server eroorrrs", e)
    }
    return {

        props: {}
    }
}
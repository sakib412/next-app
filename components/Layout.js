import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout as AntdLayout, Menu, Row, Col } from 'antd';
import cookies from 'js-cookie';
import axiosInstance from '../src/common/axios';
import authContext from '../contexts/authContext';
const { Header, Content, Footer } = AntdLayout;

export default function Layout(props) {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosInstance.get("/user/check").then(response => {
            if (response.data.status) {
                setAuthenticated(true);
                setLoading(false)
                router.push("/")
            }
            else {
                setLoading(false)
                setAuthenticated(false)
                router.push("/login")
            }
        }).catch(err => {
            setLoading(false)
            setAuthenticated(false)
            console.log(err.response)
            router.push("/login")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated, setAuthenticated])

    const logoutHandle = () => {
        axiosInstance.get("/user/logout").then(res => {
            setAuthenticated(false)
            cookies.remove('jwt');


        }).catch(err => {
            console.log(err.response);
        })
    }



    return (
        <authContext.Provider value={{ authenticated, setAuthenticated }}>
            <AntdLayout className="layout">
                <Header>
                    <Row justify="space-between">
                        <Col span={3} offset={1}>
                            <h2 style={{ color: "whitesmoke" }}><Link href="/"><a>Task</a></Link></h2>
                        </Col>
                        <Col span={8}>
                            {loading ? null : (<Menu theme="dark" mode="horizontal">
                                <Menu.Item key={1}><Link href="/"><a>Home</a></Link></Menu.Item>
                                {authenticated ? <Menu.Item key={34}><span onClick={logoutHandle}>Logout</span></Menu.Item> :
                                    (<>
                                        <Menu.Item key={2}><Link href="/login"><a>Login</a></Link></Menu.Item>
                                        <Menu.Item key={3}><Link href="/signup"><a>Sign Up</a></Link></Menu.Item>
                                    </>)}
                            </Menu>)}

                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">{props.children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Task APP</Footer>
            </AntdLayout>
        </authContext.Provider>
    )
}
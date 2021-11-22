import React from 'react'
import Link from 'next/link'
import { Layout as AntdLayout, Menu, Row, Col } from 'antd';
const { Header, Content, Footer } = AntdLayout;

export default function Layout(props) {
    return (

        <AntdLayout className="layout">
            <Header>
                <Row justify="space-between">
                    <Col span={3} offset={1}>
                        <h2 style={{ color: "whitesmoke" }}><Link href="/"><a>Task</a></Link></h2>
                    </Col>
                    <Col span={8}>
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item key={1}><Link href="/"><a>Home</a></Link></Menu.Item>
                            <Menu.Item key={2}><Link href="/login"><a>Login</a></Link></Menu.Item>
                            <Menu.Item key={3}><Link href="/signup"><a>Sign Up</a></Link></Menu.Item>

                        </Menu>
                    </Col>
                </Row>


            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </AntdLayout>

    )
}





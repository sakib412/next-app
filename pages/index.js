import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router";
import { Row, Col, Input, Button, Typography, List, Form, Spin } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axiosInstance from "../src/common/axios"
import authContext from "../contexts/authContext";
import Notification from "../src/common/notification";

export default function Home({ data, token }) {
  const router = useRouter()
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskForm] = Form.useForm();
  function getTasks() {
    setLoading(true)
    axiosInstance.get("/task/get?status=true", {
      headers: {
        "Content-Type": "application/json",
        // "Cookie": token
      }
    }).then(response => {
      setTask(response.data.data.reverse());
      setLoading(false);
    }).catch(er => {
      setLoading(false);
      console.log(er.response)
    });
  }

  useEffect(() => {
    getTasks()
    // if (!data?.status) {
    //   router.push("/login")
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = (values) => {
    setLoading(true)
    axiosInstance.post("/task/add",
      values
    ).then(res => {
      taskForm.resetFields();
      Notification({ message: res.data.message, status: res.data.status ? 200 : 401 })
      getTasks();
    }).catch(err => {
      console.log(err)
      setLoading(false)
      Notification({ message: "try again", status: 401 })
    })
  }
  const updateTask = (event, status) => {
    setLoading(true)
    const taskBody = {
      taskId: event.target.value,
      status: status == 'done' ? "todo" : "done"
    }
    axiosInstance.post("/task/update", taskBody).then(res => {
      setLoading(false)
      Notification({ message: res.data.message, status: res.data.status ? 200 : 401 })
      getTasks()
    }).catch(err => {
      Notification({ message: "Try again", status: 401 })
      setLoading(false)
      console.log(err)
    })
  }

  return (
    <div style={{ minHeight: "20rem" }}>
      <Typography.Title style={{ textAlign: 'center' }}>Add Task</Typography.Title>
      <Row justify="center" align="middle">
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <Form onFinish={addTask} form={taskForm}>
            <Form.Item name="title" rules={[
              {
                required: true,
                message: "Please input Task Title",
              },
            ]}>
              <Input style={{ width: '100%' }} size="large" />
            </Form.Item>
            <Button style={{ marginBottom: "2rem" }} size="large" htmlType="submit" type="primary">Add</Button>
          </Form>
          <Spin spinning={loading}>
            <List
              bordered
              dataSource={tasks}
              renderItem={task => (
                <List.Item>
                  <Row justify="space-between" style={{ width: '100%' }}>
                    <Col lg={22}><Typography.Title level={5} delete={task.status == 'done'}>{task.title}</Typography.Title></Col>
                    <Col lg={2}>
                      <label style={{ cursor: "pointer" }} htmlFor={task._id}>
                        {task.status == 'done' ?
                          <CloseCircleOutlined style={{ color: 'red', fontSize: "1.5rem" }} /> :
                          <CheckCircleOutlined style={{ color: 'green', fontSize: "1.5rem" }} />
                        }
                      </label>

                      <input defaultValue={task._id} id={task._id} onClick={(e) => updateTask(e, task.status)} hidden />


                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Spin>
        </Col>
      </Row>
    </div>
  )
}

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
  } catch (e) {
    console.log("server eroorrrs", e)
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },

      props: {},
    }
  }
  return {
    props: { data: data || null, token: req.headers.cookie }
  }
}

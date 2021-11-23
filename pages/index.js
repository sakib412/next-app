import React, { useEffect, useState } from "react"
import { Row, Col, Input, Button, Typography, List, Form, Spin } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axiosInstance from "../src/common/axios"



export default function Home() {
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskForm] = Form.useForm();
  function getTasks() {
    setLoading(true)
    axiosInstance.get("/task/get?status=true").then(response => {
      console.log(response.data.data)
      setTask(response.data.data);
      setLoading(false);
    }).catch(er => {
      console.log(er.response)
    });
  }
  useEffect(() => {
    getTasks()

  }, [setTask]);

  const addTask = (values) => {
    setLoading(true)
    console.log(values);
    axiosInstance.post("/task/add", values).then(res => {
      taskForm.resetFields();
      getTasks();
    }).catch(err => {
      console.log(err)
    })
  }
  const updateTask = (event, status) => {
    setLoading(true)
    console.log(event.target.value, status)
    const taskBody = {
      taskId: event.target.value,
      status: status == 'done' ? "todo" : "done"
    }
    axiosInstance.post("/task/update", taskBody).then(res => {
      setLoading(false)
      console.log(res.data)
      getTasks()
    }).catch(err => {

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

                      {/* <Form form={taskItem} onFinish={updateTask} initialValues={{
                        [task._id]: task.title,
                      }}>
                        <Form.Item name={task._id}>
                          <Input />
                        </Form.Item>
                        <Button htmlType="submit">
                          <CheckCircleOutlined />
                        </Button>
                      </Form> */}
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

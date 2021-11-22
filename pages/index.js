import React, { useEffect, useState } from "react"
import axiosInstance from "../src/common/axios"

export default function Home() {
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    axiosInstance.get("/task/get?status=true").then(response => {
      console.log(response.data)
      setTask(response.data.data)
    }).catch(er => {
      console.log(er.response)
    });



  }, [])




  return (
    <div style={{ minHeight: "20rem" }}>
      <ul>
        {tasks.map((task) => (<li key={task._id}>{task.title}</li>))}
      </ul>
    </div>
  )
}

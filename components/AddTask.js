import axios from "../utils/axios"
import { API_URL } from "../utils/constants"
import { useAuth } from "../context/auth"
import React, { useState } from "react"
import { Button, Container, Col, Row, Form } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddTask(props) {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  function handleChange(event) {
    const newTitle = event.target.value
    setTitle(newTitle)
  }

  function notify(){
    toast.success("Task added successfully!", {
      position: "bottom-right",
      autoClose: 3000
    })
  }

  const addTask = () => {
    axios({
      url: API_URL + 'todo/create/',
      method: 'post',
      data: {
        title: title
      },
      headers: {
        Authorization: 'Token ' + token
      }
    }).then(response => {
      console.log(response);
      setTasks(prevTasks => {
        return [...prevTasks, title]
      })
      setTitle('')
      props.onClick();
      notify()
    }).catch(error => {
      console.log(error);
      toast.error("Couldn't add task!", {
        position: "bottom-right",
      })
    })
  }

  return (
    <div className="pt-20 input-container">
      <Container fluid={10}>
        <Row>
          <Col className="task-input">
            <Form>
              <Form.Control size="lg" className="add-task-input" onChange={handleChange} value={title} type="text" placeholder="Enter Task" />
            </Form>
          </Col>
          <Col md="auto" className="task-input">
            <Button variant="outline-success" size="lg" className="add-task-btn" onClick={addTask} type='button'>Add Task</Button>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  )
}

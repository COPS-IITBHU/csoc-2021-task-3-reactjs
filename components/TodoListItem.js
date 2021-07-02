/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import { useAuth } from '../context/auth'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function TodoListItem(props) {
  const { token } = useAuth();
  const [newTitle, setNewTitle] = useState('')
  const [isNotVisible, setNotVisible] = useState(true)

  function notify(){
    toast.info("Task updated successfully!", {
      position: "bottom-right",
      autoClose: 3000
    })
  }

  function toggleClass() {
    setNotVisible(!isNotVisible)
  }

  function handleChange(event) {
    const newTitle = event.target.value
    setNewTitle(newTitle)
  }

  return (
    <div style={{ marginBottom: "13px" }}>
      <li className='border flex border-gray-600 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={'input-text-' + props.id}
          onChange={handleChange}
          value={newTitle}
          type='text'
          style={{ width: "100%" }}
          className={ isNotVisible ? 'hideme' : null + 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring todo-edit-task-input'}
          placeholder='Edit the task'
        />
        <div id={'done-btn-' + props.id} className={ isNotVisible ? 'hideme' : null }>
          <Button variant="outline-dark" type='button'
            onClick={() => {
              toggleClass()
              props.onUpdate(props.id, newTitle)
            }}
          >
            Done
          </Button>
        </div>

        <div id={'task-' + props.id} className={ !isNotVisible ? 'hideme' : null + 'todo-task ml-2 text-gray-600' }>
          {props.title}
        </div>

        <span id={'task-actions-' + props.id} className={!isNotVisible ? 'hideme' : null}>
          <Button variant="outline-warning" onClick={toggleClass} type='button' className="mx-1">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="outline-danger" onClick={() => props.onDelete(props.id)} type='button' className="mx-1">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </span>
      </li>
      <ToastContainer />
    </div>
  )
}

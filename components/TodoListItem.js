/* eslint-disable @next/next/no-img-element */
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useState } from 'react'
import notif from '../components/Notif';

export default function TodoListItem( { tasks, setTasks }) {
  const {token } = useAuth()
  const [text, setText] = useState('')
  const [curId, setCurId] = useState('')
  const [toshow, setToshow] = useState(true)

  const editTask = (id) => {
    setCurId(id)
    setToshow(false)
  }

  const deleteTask = (id) => {
     axios.delete('todo/'+id+'/',{
            headers: {Authorization: 'Token '+ token}
            })
            .then(function({data,status}){
                notif('Success','Task deleted successfully','success')
            })
            .catch(function(err) {
                notif('Error','Task could not be deleted','danger')
            })
      
          setTasks(tasks.filter((task) => task.id!==id))
  }

  const updateTask = (id) => {
     if(!text){
      notif('Error','Field is empty','danger')
      return
      }
     
     const dataForApiRequest = {
      title: text
      }

     axios.patch('todo/'+id+'/', dataForApiRequest, {
      headers: {Authorization: 'Token '+ token}
      })
      .then(function({data,status}){
          notif('Success','Task updated successfully','success')
          setTasks(tasks.map((task) => task.id===id ? {...task, title: text} : task))
      })
      .catch(function(err) {
          notif('Error','Task could not be updated','danger')
      })
      setToshow(true)
      setCurId('')
      setText('')
  }
 
  return (
    <>
     { tasks.map((task) => (
      <li key= {task.id} className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        { curId===task.id && 
        <input
          id={'input-button-'+task.id}
          type='text'
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          value= {text}
          onChange = { (e) => { setText(e.target.value) }}
        />
        }
        { curId===task.id &&
        <div id={'done-button-'+task.id} className=''>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={() => updateTask(task.id)}
          >
            Done
          </button>
        </div>
        }
        { (toshow || curId!==task.id) &&
        <div id={'task-1'+task.id} className='todo-task  text-gray-600'>
          {task.title}
        </div>
        }
        { (toshow || curId!==task.id) &&
        <span id={'task-actions-'+task.id} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={() => editTask(task.id)}
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={() => deleteTask(task.id)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
        }
      </li>
      ))}
    </>
  )
}

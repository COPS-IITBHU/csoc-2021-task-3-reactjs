import axios from '../utils/axios'
import { useState } from 'react'
import { useAuth } from '../context/auth'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default function TodoListItem(props) {
  const {config,API_BASE_URL  } = useAuth()
  const [Newdata, setNewdata] = useState(props.todo.title);
  const [editnow, seteditnow] = useState(false);
  const editTask = (id) => {
    seteditnow(true);
  }

  const deleteTask = (id) => {
    axios
    .delete(API_BASE_URL + "todo/" + id + "/",config)
    .then(function ({ data, status }) {
        toast.success('Task deleted!',{position: toast.POSITION.BOTTOM_RIGHT})
        props.onDelete(props.todo);
    })
    .catch(function (err) {
      toast.error("An error occurred!");
    });
  }

  const updateTask = (id) => {
    if (!Newdata) {
      toast.warning("Please enter new task!",{position: toast.POSITION.BOTTOM_RIGHT});
      return;
    }
    axios
        .patch(API_BASE_URL + "todo/" + id + "/",{ title: Newdata },config)
        .then(function ({ data, status }) {
          toast.success('Task updated!',{position: toast.POSITION.BOTTOM_RIGHT})
          seteditnow(false);
        })
        .catch(function (err) {
          toast.error("An error occurred!");
          });
    
  }
  
  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={"input-button-"+props.todo.id}
          type='text'
          value={Newdata}
          onChange={(e)=>{setNewdata(e.target.value)}}
          style ={{display: (editnow?"":"none")}}
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
        />
        <div style ={{display: (editnow?"":"none")}} id={'done-button-'+props.todo.id}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>{updateTask(props.todo.id)}}
          >
            Done
          </button>
        </div>
        <div id={'task-'+props.todo.id} style ={{display: (editnow?"none":"")}} className='todo-task  text-gray-600'>
          {Newdata}
        </div>
        <span id={'task-actions-'+props.todo.id} style ={{display: (editnow?"none":"")}} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>{editTask(props.todo.id)}}
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
            onClick={()=>{deleteTask(props.todo.id)}}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>
    </>
  )
}

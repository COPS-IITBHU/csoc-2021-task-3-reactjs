import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { store } from 'react-notifications-component';

export default function AddTask(props) {

  const { token } = useAuth()
  const [newTask,setNewTask]=useState("")


  const refreshTasks=() =>props.refreshTasks();
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
     const dataForApiRequest = {
         title: newTask,
     }
     
     axios({
         url:  'todo/create/',
         headers: {
             Authorization: 'Token ' + token,
         },
         method: 'post',
         data: dataForApiRequest,
     }).then(function({data, status}) {
        setNewTask("")
        refreshTasks()
        store.addNotification({
          title: "Task added!",
          message:" ",
          type: "success",
          insert: "bottom-right",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });


        
     }).catch(function(err) {
      store.addNotification({
        title: "Task cannot be left empty!",
        message:" ",
        type: "danger",
        insert: "bottom-right",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
      
     })
 
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        onChange={(e) =>setNewTask(e.target.value)}
        value={newTask}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}

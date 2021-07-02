import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { store } from 'react-notifications-component';



export default function AddTask(props) {
  const refreshTasks=() =>props.refreshTasks();
  const [newTaskTxt,setNewTask]=useState("")
  const { token } = useAuth()
  const todoText = newTaskTxt.trim();

  const addTask = () => {

    const dataForApi = {
      title: newTaskTxt,
  }
  axios({
    url:  'todo/create/',
    headers: {
        Authorization: 'Token ' + token,
    },
    method: 'post',
    data: dataForApi,
}).then(function(response) {
   console.log(todoText)
   setNewTask("")
   refreshTasks()
   store.addNotification({
     title: "Task Succesfully added!",
     message:" ",
     type: "success",
     insert: "top-right",
     container: "top-right",
     animationIn: ["animate__animated", "animate__fadeIn"],
     animationOut: ["animate__animated", "animate__fadeOut"],
     dismiss: {
       duration: 2000,
       onScreen: true
     }
   });

  }).catch(function(err) {
    console.log(err)
    store.addNotification({
      
      title: "There was some error with your request. Please try Again!",
      message:" ",
      type: "danger",
      insert: "top-right",
      container: "top-right",
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
        
        value={newTaskTxt}
        onChange={(e) =>setNewTask(e.target.value)}
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

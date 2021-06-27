import { useRef } from "react";
import axios from '../utils/axios';
import {useAuth} from '../context/auth';

export default function AddTask() {
  const taskRef = useRef(null);
  const {token} = useAuth();

  const addTask = () => {
     const title = taskRef.current.value;

     if (title != "") {
       const data = {
         title
       }
 
       axios({
         url : 'todo/create/',
         method : 'post',
         headers : {
           'Authorization' : `Token ${token}`
         },
         data
       })
       .then(({data, status}) => {
         const event = new CustomEvent('addedTask', {
           bubbles : true
         });
         taskRef.current.dispatchEvent(event);
       })
       .catch((err) => {
         console.log("Something Went Wrong.");
       })
     }
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        ref = {taskRef}
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

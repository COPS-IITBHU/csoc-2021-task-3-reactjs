import { useState } from "react";
import axios from '../utils/axios';
import { useAuth } from '../context/auth';
export default function AddTask(props) {
  const[Task,setTask]=useState('');
  const { token }=useAuth();
  
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    if(Task==='')
    {
      console.log("Please Enter Something");
      return;
    }
    const dataForAPIRequest={
      "title":Task,
    }

     axios.post('todo/create/',dataForAPIRequest,{
      headers:{
        Authorization:'Token '+token,
      }
    })
    .then((res) => {
      axios({
        headers:{
          Authorization:'Token '+token
        },
        url:'todo/',
        method:'get'
      })
      .then((res) => {
        const newTask=res.data[res.data.length-1];
        props.addNewTask(newTask);
      })

    })
    .catch(() => {
      console.log("Some Error Occured");
    });
    
    
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        onChange={(e) => {setTask(e.target.value);}}
        value={Task}
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

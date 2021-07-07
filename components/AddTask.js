import { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default function AddTask() {
  const [Todotxt, setTodotxt] = useState("");
  const { config,API_BASE_URL} = useAuth();
  const addTask = (e) => {
    e.preventDefault()
    if (!Todotxt || Todotxt=="") {
        toast.error("No task entered!",{position: toast.POSITION.BOTTOM_RIGHT});
        return;
    }
    axios
        .post(API_BASE_URL + "todo/create/",{ title: Todotxt },config)    
        .then(function (response) {
            axios
            .get(API_BASE_URL + "todo/",config)
            .then(function ({ data, status }) {
                const newTodo = data[data.length - 1];
                const taskNo = newTodo.id;
                setTodotxt("");
                toast.success('Task added',{position: toast.POSITION.BOTTOM_RIGHT})
            });
        })
        .catch(function (err) {
          toast.error("An error occurred!");
          });
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        value={Todotxt}
        onChange={(e)=>{setTodotxt(e.target.value)}}
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
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

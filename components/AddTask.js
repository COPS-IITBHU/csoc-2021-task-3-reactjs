import { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import notif from '../components/Notif';

export default function AddTask({tasks,setTasks}) {

  const { token } = useAuth()
  const [ text, setText] = useState('')
  const addTask = () => {

    if(!text){
      notif('Error','Field is empty','danger')
      return
    }
    
    const dataForApiRequest = {
      title: text
    }

    axios.post('todo/create/',
          dataForApiRequest,{
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((response) => {
          notif('Success','Task added successfully','success')
          axios.get('todo/', {
            headers: {
                Authorization: 'Token '+ token,   
            },
            }).then(function({data,status}){
            const newdata= data[data.length-1]
            setTasks([...tasks,newdata])
            setText('')
            })
        })
        .catch((error) => {
          notif('Error','Task could not be added','danger')
        })
    }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value = {text}
        onChange = { (e) => setText(e.target.value)}
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

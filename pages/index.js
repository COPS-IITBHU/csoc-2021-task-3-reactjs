import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import authReq from '../middlewares/auth_required'
import notif from '../components/Notif';

export default function Home() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  
  authReq()

  useEffect(() => {
        if(token){
        notif('Info','Loading your profile','info')
        getTasks()
        }

        function getTasks() {
          axios.get('todo/',{
            headers: { Authorization: 'Token ' + token,}
            })
            .then(function({data, status}) {
                setTasks(data)
            })
            .catch(function(err) {
              notif('Error','Unable to load your tasks','danger')
                })
          }

  },[])

  return (
    <div>
      <center>
        <AddTask tasks= {tasks} setTasks= {setTasks}/>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          <TodoListItem tasks={tasks} setTasks= {setTasks}/>
        </ul>
      </center>
    </div>
  )
}

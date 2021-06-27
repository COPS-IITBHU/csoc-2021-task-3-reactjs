import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import Router from 'next/router'


export default function Home() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const router = useRouter()
  const [isLoggedIn,setLoggedIn] = useState(false)


  function getTasks() {
    axios({
      headers: {
          Authorization: 'Token ' + token,
      },
      url:  'todo/',
      method: 'get',
    }).then(function({data, status}) { 
      setTasks(data);
    })

  }

  function deleteTask(id){
    setTasks(prevTasks => {
      return prevTasks.filter((task) => {
        return task.id !== id;
      });
    });

  }



  useEffect(() => {
    
    if(token!="null"&&token!=undefined){
      getTasks()
      setLoggedIn(true)
    }

    const {pathname} = Router
        if(pathname == '/' && (token=="null" || token==undefined)){
            router.push('/login')
        }
  }, [])


   return isLoggedIn&&(
    <div>
      <center>
      <AddTask refreshTasks={getTasks}/>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {tasks.map((taskFromArray) =>{
            return <TodoListItem 
            key={taskFromArray.id} 
            id={taskFromArray.id}
            task={taskFromArray.title}
            refreshTasks={getTasks}
            delete={deleteTask}  
            />
          })}
        </ul>
      </center>
    </div>
  )
}

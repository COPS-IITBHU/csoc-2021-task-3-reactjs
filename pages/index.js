import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { NotAuthorized } from '../middlewares/auth_required'
import { green } from 'ansi-colors'

export default function Home() {
  const { token,config,API_BASE_URL  } = useAuth()
  const [tasks, setTasks] = useState([])
  NotAuthorized(token);
  function getTasks() {
      axios
      .get(API_BASE_URL + "todo/", config)
      .then(function (response) {
        const { data } = response;
        setTasks(data);
      });
    }
  useEffect(()=>{
      if(token) getTasks();
      return ;
    },[tasks]);
    
  const onDelete = (todo) => {
    setTasks(tasks.filter((e) => {
      return e !== todo;
    }))
  }
  return (
    <>
    <div>
      <center>
        <AddTask />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {tasks.length === 0 ? <h4>No tasks to display!</h4> :
            tasks.map((task) => {
              return (<TodoListItem todo={task} key={task.id} onDelete={onDelete}/>)
            })
          }
        </ul>
      </center>
    </div>
    </>
  )
}

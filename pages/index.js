import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useRef, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import Auth from '../middlewares/auth_required';

export default function Home() {
  const { token, setAvatarImage, setProfileName } = useAuth()
  const [tasks, setTasks] = useState([])
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.addEventListener('addedTask', () => {
      getTasks();
    });

    containerRef.current.addEventListener('deletedTask', (e) => {
      setTasks(prevTasks => {
        return prevTasks.filter(task => task.id !== e.detail.id);
      })
    });

    if (token) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setAvatarImage(
            'https://ui-avatars.com/api/?name=' +
              response.data.name +
              '&background=fff&size=33&color=007bff'
          )
          setProfileName(response.data.name)
          getTasks()
        })
        .catch((error) => {
          console.log(error.message);
          console.log('Some error occurred')
        })
      }
  },[])

  function getTasks() {
     axios({
       url: "todo/",
       method: "get",
       headers: {
         Authorization: `Token ${token}`,
       },
     })
       .then(({ data, status }) => {
         setTasks(data);
       })
       .catch((error) => {
         console.log("Something Went Wrong.");
       });
  }

  const taskMap = tasks.map(task => {
    return <TodoListItem key={task.id} id={task.id} title={task.title} />;
  })

  return (
    <Auth>
      <div ref={containerRef}>
        <center>
          <AddTask />
          <ul className='flex-col mt-9 max-w-sm mb-3 '>
            <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
              Available Tasks
            </span>
            {taskMap}
          </ul>
        </center>
      </div>
    </Auth>
  )
}

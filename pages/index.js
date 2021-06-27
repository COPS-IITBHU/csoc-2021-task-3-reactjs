import Nav from '../components/Nav'
import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import checkLogin from '../middlewares/auth_required'
import Script from 'next/script'
import '../node_modules/izitoast/dist/css/iziToast.min.css'


export default function Home() {
  const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/'
  // const [tasks, setTasks] = useState([])
  const [todos, settodos] = useState([])

  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */
    try {
      iziToast.destroy();
      console.log(document.cookie.substring(6),document.cookie);
      iziToast.success({ title: "Success", message: 'Login Authenticated.' })
      iziToast.info({title: "Welcome",message: "Loading all todos"});
    } catch (e) { }
    axios({
      headers: { Authorization: 'Token ' + document.cookie.substring(6) },
      url: API_BASE_URL + 'todo/',
      method: 'get',
    }).then((res) => settodos(res.data))
  }
  useEffect(() => {
    checkLogin()
    axios
      .get(API_BASE_URL + 'auth/profile/', {
        headers: {
          Authorization: 'Token ' + document.cookie.substring(6),
        },
      })
      .then((response) => {
        getTasks()
      })
      .catch((error) => {
        try { iziToast.error({ title: "Error", message: 'Cannot Load Your Data.' }) } catch { }
      })
  }, [])

  return (
    <div>
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js'></Script>
      <center>
        <AddTask todos={todos} settodos={settodos}/>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          <TodoListItem todos={todos} settodos={settodos} />
          {todos.length==0 && <h4>No Todos To show</h4>}
        </ul>
      </center>
    </div>
  )
}

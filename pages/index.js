import Nav from '../components/Nav'
import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthRequired } from '../middlewares/auth_required'

export default function Home() {
  const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/'

  useAuthRequired();
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('')

  const [todos, settodos] = useState([])


  function getTasks() {
    axios({
      headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      url: API_BASE_URL + 'todo/',
      method: 'get',
    }).then((res) => settodos(res.data))
    /***
     * @todo Fetch the tasks created by the user and display them in the dom.
     */
  }

  useEffect(() => {
    axios
      .get(API_BASE_URL + 'auth/profile/', {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('token'),
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
        console.log('Some error occurred')
      })
  }, [])

  /**
   * @todo Fetch Task Items form backend and render them using loop
   */

  return (
    <div>
      <Nav profileName={profileName} avatarImage={avatarImage} />
      <center>
        <AddTask todos={todos} settodos={settodos}/>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          <TodoListItem todos={todos} settodos={settodos}/>
        </ul>
      </center>
    </div>
  )
}

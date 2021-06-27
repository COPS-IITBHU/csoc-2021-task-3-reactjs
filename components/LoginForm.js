import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { store } from 'react-notifications-component';

export default function RegisterForm() {
  const { setToken,token } = useAuth()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')


  const login = (e) => {

    e.preventDefault()

    const dataForApiRequest = {
      username: username,
      password: password,
    }
    axios.post(
      'auth/login/',
      dataForApiRequest,
    )
      .then(function ({ data, status }) {
        setToken(data.token)
        router.push('/')
        store.addNotification({
          title: "Loading tasks...",
          message:" ",
          type: "success",
          insert: "bottom-center",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true
          }
        });

      })
      .catch(function (err) {
        // console.log(
        //   'Wrong username or password'
        // )
        store.addNotification({
          title: "Wrong username or password",
          message:" ",
          type: "danger",
          insert: "bottom-right",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true
          }
        });
      })

      
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
    <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
      <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
        <h1 className='mb-8 text-3xl text-center'>Login</h1>
        <input
          type='text'
          className='block border border-grey-light w-full p-3 rounded mb-4'
          name='inputUsername'
          id='inputUsername'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />

        <input
          type='password'
          className='block border border-grey-light w-full p-3 rounded mb-4'
          name='inputPassword'
          id='inputPassword'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />

        <button
          type='submit'
          className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
          onClick={login}
        >
          Login
        </button>
        <div className='register'>New user? <u className='signUp'><Link href='/register' >Sign up</Link></u></div>
      </div>
    </div>
  </div>
  )
}

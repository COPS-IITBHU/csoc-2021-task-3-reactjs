import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import notif from '../components/Notif';
import noAuthReq from '../middlewares/no_auth_required'

export default function LoginForm() {
  const { setToken } = useAuth()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  
  noAuthReq()
  
  const loginFieldsAreValid = (
    username,
    password
  ) => {
    if (username === '' || password === '') {
      notif('Error','Please fill all the fields correctly','danger')
      return false
    }
    return true
  }

  const login = (e) => {

     if (
       loginFieldsAreValid(username, password)
     ) {
       notif('Info','Please wait...','info')
 
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
         })
         .catch(function (err) {
           notif('Error','Invalid Username or password','danger')
         })
     }
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
        </div>
      </div>
    </div>
  )
}

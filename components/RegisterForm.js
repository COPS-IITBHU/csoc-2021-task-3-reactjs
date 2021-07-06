import React, { useState } from 'react'
import axios from '../utils/axios'
import { useEffect} from 'react'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import checkLogin from '../middlewares/no_auth_required'
import Script from 'next/script'
import '../node_modules/izitoast/dist/css/iziToast.min.css'

export default function Register() {
  const { setToken,getToken } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const registerFieldsAreValid = (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      username === '' ||
      password === ''
    ) {
      try{iziToast.destroy();iziToast.error({ title: "Error", message: 'All Fields Are Mandatory' }) }catch {}
      return false
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      try{iziToast.destroy();iziToast.error({ title: "Error", message: 'Enter a valid Email Address' }) }catch {}
      return false
    }
    return true
  }

  useEffect(() => {
    checkLogin(getToken())
    try{ iziToast.destroy(); iziToast.info({ title: "Info", message: 'Register Now' }) } catch{}
  }, [])

  const register = (e) => {
    e.preventDefault()

    if ( registerFieldsAreValid(firstName, lastName, email, username, password) ) {
      try { iziToast.show({ title: "Wait", message: 'Checking Your Credentials' }) } catch {}

      const dataForApiRequest = {
        name: firstName + ' ' + lastName,
        email: email,
        username: username,
        password: password,
      }

      axios.post(
        'auth/register/',
        dataForApiRequest,
      )
        .then(function ({ data, status }) {
          setToken(data.token)
          window.location.href = '/';
        })
        .catch(function (err) {
          try{iziToast.destroy();iziToast.error({ title: "Error", message: 'An account using same email or username is already created' }) }catch {}
        })
    }
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js'></Script>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Register</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputFirstName'
            id='inputFirstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputLastName'
            id='inputLastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />

          <input
            type='email'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputEmail'
            id='inputEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
          />

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
            onClick={register}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

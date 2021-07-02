import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { useAuth } from "../context/auth"
import { API_URL } from "../utils/constants"
import { useCookies } from "react-cookie"
import { Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RegisterForm() {
  const router = useRouter()
  const { setToken } = useAuth()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function validFieldValues(username, password) {
    if (username === '' || password == '')
      return false
    return true
  }

  function handleUsernameChange(event) {
    const newUsername = event.target.value
    setUsername(newUsername)
  }

  function handlePasswordChange(event) {
    const newPassword = event.target.value
    setPassword(newPassword)
  }

  const login = () => {
    toast.info("Logging in...", {
      position: "bottom-right",
    })
    
    if (validFieldValues(username, password)) {
      console.log("logging in...")

      axios({
        url: API_URL + 'auth/login/',
        method: 'post',
        data: {
          username: username,
          password: password
        }
      }).then(res => {
        setToken(res.data.token)
        setAvatarImage(
          'https://ui-avatars.com/api/?name=' +
            res.data.name +
            '&background=fff&size=33&color=007bff'
        )
        setProfileName(res.data.name)
        name = res.data.name
        router.push('/')
      }).catch(error => {
        console.log(error)
        toast.error("Login error!", {
          position: "bottom-right",
        })
      })
    }
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm flex-col items-center justify-center px-5'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <input
            type='text'
            onChange={handleUsernameChange}
            value={username}
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
          />

          <input
            type='password'
            onChange={handlePasswordChange}
            value={password}
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
          />

          <Button variant="outline-success"
            type='submit'
            size="lg"
            style={{ width: "100%"}}
            onClick={login}>
            Login
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

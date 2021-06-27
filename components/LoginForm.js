import React, { useRef } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'

export default function RegisterForm() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  const {setToken} = useAuth();

  const login = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username && password) {
      const data  = {
        username,
        password
      }

      axios({
        url : 'auth/login/',
        method : 'post',
        data
      })
      .then(({data,status}) => {
        setToken(data.token)
        router.reload();
      })
      .catch(error => {
        console.log("Enter Correct Credentials.");
      })
    }
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputUsername"
            id="inputUsername"
            placeholder="Username"
            ref={usernameRef}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputPassword"
            id="inputPassword"
            placeholder="Password"
            ref={passwordRef}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

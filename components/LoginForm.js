import axios from '../utils/axios';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useToast, immediateToast } from "izitoast-react";
import iziToast from 'izitoast';

export default function RegisterForm() {
  const router= useRouter();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const { token, setToken }=useAuth();
  const toastError=useToast('error',{
    message:"Wrong Username and Password! Please Try Again",
  }

  );

  const loginFieldsValid =(username,password) => {
    if(username==='' || password==='')
    {
      console.log('Please Enter Valid Details');
      return false;
    }
    return true;
  };

  const login = (e) => {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    e.preventDefault();
   
    
    if(loginFieldsValid(username,password)){
      console.log("Please Wait...")
      const dataForApiRequest={
        "username":username,
        "password":password,
      }

      axios.post('auth/login/',dataForApiRequest)
      .then(
        ({data}) => {
          console.log("Logging In");
          setToken(data.token);
          //console.log(data.token);
          router.push('/');
        }
      )
      .catch(
        () => {
          // immediateToast("error",{
          //   message:"Wrong",
          //   timeout:50000
          // });
          console.log("Some Error Ocurred");
        }
      )

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
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
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

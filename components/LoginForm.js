import { useState } from "react"
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import axios from '../utils/axios'


export default function RegisterForm() {
  
  const { token, setToken} = useAuth();
  const [formData, setformData] = useState({name : "", pass : ""});
  const router = useRouter();
  console.log(token);
  const login = (e) => {
    e.preventDefault();
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    const username = formData.name.trim();
    const password = formData.pass;
    if(username === "" || password === "")
    {
      console.log("Enter fields correctly");
      return ;
    }
    axios({
      url : "auth/login/",
      method: "post",
      data: { username, password }
    })
    .then(({ data, status }) => {
        // displaySuccessToast("Logged in successfully!");
        // localStorage.setItem("token", data.token);
        // window.location.href = "/";
        setToken(data.token);
        // console.log(token);
        // console.log(data.token);
        router.push("/");
        console.log("Logged In");
        
    })
    .catch((err) => {
        // displayErrorToast("Log in failed! Please check your credentials.");
        console.log(err);
    });
  }

  const nameChangeHandler = (event) => {
    setformData({
      ...formData,
      name : event.target.value
    })
  }

  const passChangeHandler = (event) => {
    setformData({
      ...formData,
      pass : event.target.value
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
            placeholder='Username'
            value={formData.name}
            onChange={nameChangeHandler}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            value={formData.pass}
            onChange={passChangeHandler}
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

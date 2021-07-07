import axios from '../utils/axios';
import { useAuth } from '../context/auth'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect,useState } from 'react'

toast.configure()
export default function RegisterForm() {
  const { login,API_BASE_URL,setpagetype } = useAuth()
  useEffect(()=>{setpagetype("LOGIN");return;},[])
  const [user_name, setuser_name] = useState("");
  const [user_pass, setuser_pass] = useState("");
  const loginnow = () => {
    if (user_name == "" || user_pass == "") {
        toast.error("Please fill the empty fields.",{position: toast.POSITION.BOTTOM_RIGHT})
        return;
    }
    setuser_name(user_name.trim());
    toast.info("Checking credentials...",{position: toast.POSITION.BOTTOM_RIGHT})
    axios
        .post(API_BASE_URL + "auth/login/",{
            username: user_name,
            password: user_pass
        })
        .then(({ data, status }) => {
            toast.success("Successfully logged in!",{position: toast.POSITION.BOTTOM_RIGHT})
            localStorage.setItem("token", data.token);
            login(data.token);
        })
        .catch((err) => {
            toast.error("Cannot Login! :( Check credentials.",{position: toast.POSITION.BOTTOM_RIGHT})
        });
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
            value={user_name}
            onChange={(e)=>{setuser_name(e.target.value)}}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            value={user_pass}
            onChange={(e)=>{setuser_pass(e.target.value)}}
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={loginnow}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
